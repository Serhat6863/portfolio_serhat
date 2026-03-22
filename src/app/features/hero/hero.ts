import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'hero' },
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query(
          '.animate-item',
          [
            style({ opacity: 0, transform: 'translateY(32px)' }),
            stagger(110, [
              animate(
                '650ms cubic-bezier(0.16, 1, 0.3, 1)',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class Hero {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly scrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        if (this.doc.documentElement.scrollTop > 50) {
          this.scrolled.set(true);
          this.doc.removeEventListener('scroll', onScroll);
        }
      };
      this.doc.addEventListener('scroll', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => {
        this.doc.removeEventListener('scroll', onScroll);
      });
    });
  }

  protected scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.doc
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
