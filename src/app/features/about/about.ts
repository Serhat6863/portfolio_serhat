import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'about', class: 'reveal' },
})
export class About {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly doc = inject(DOCUMENT);
  private readonly scrollAnim = inject(ScrollAnimationService);

  constructor() {
    afterNextRender(() => {
      this.scrollAnim.observe(this.el.nativeElement);
    });
  }

  protected scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.doc
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
