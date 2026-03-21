import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

type SubmitState = 'idle' | 'sending' | 'sent';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'contact', class: 'reveal' },
})
export class Contact {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly scrollAnim = inject(ScrollAnimationService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly submitState = signal<SubmitState>('idle');

  readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
      nonNullable: true,
    }),
  });

  constructor() {
    afterNextRender(() => {
      this.scrollAnim.observe(this.el.nativeElement);
    });
  }

  protected showError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl.touched);
  }

  protected getError(field: string): string {
    const ctrl = this.form.get(field);
    if (!ctrl?.errors || !ctrl.touched) return '';
    if (ctrl.errors['required']) return 'Ce champ est requis.';
    if (ctrl.errors['minlength']) {
      return `Minimum ${ctrl.errors['minlength'].requiredLength} caractères.`;
    }
    if (ctrl.errors['email']) return 'Adresse e-mail invalide.';
    return '';
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    this.submitState.set('sending');
    // TODO: integrate with EmailJS / Formspree / backend API
    setTimeout(() => {
      this.submitState.set('sent');
      this.form.reset();
    }, 1400);
  }

  protected resetForm(): void {
    this.submitState.set('idle');
    this.form.reset();
  }
}
