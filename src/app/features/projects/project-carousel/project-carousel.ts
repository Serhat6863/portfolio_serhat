import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { type Project } from '../../../core/data/projects.data';

@Component({
  selector: 'app-project-carousel',
  templateUrl: './project-carousel.html',
  styleUrl: './project-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCarousel {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly project = input.required<Project>();
  readonly closed = output<void>();

  readonly currentIndex = signal(0);
  readonly total = computed(() => this.project().images.length);

  private readonly keydownHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowLeft') this.prev();
    else if (e.key === 'ArrowRight') this.next();
  };

  constructor() {
    this.document.body.style.overflow = 'hidden';
    this.document.addEventListener('keydown', this.keydownHandler);
    this.destroyRef.onDestroy(() => {
      this.document.body.style.overflow = '';
      this.document.removeEventListener('keydown', this.keydownHandler);
    });
  }

  protected prev(): void {
    this.currentIndex.update((i) => (i - 1 + this.total()) % this.total());
  }

  protected next(): void {
    this.currentIndex.update((i) => (i + 1) % this.total());
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
  }

  protected close(): void {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
