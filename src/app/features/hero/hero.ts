import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
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

  private readonly titles = [
    'Flutter & Android & iOS Developer',
    'Développeur Mobile',
    'Développeur Full Stack',
  ];

  private readonly currentIndex = signal(0);
  private readonly isDeleting = signal(false);

  readonly displayedText = signal('');
  readonly currentTitle = computed(() => this.titles[this.currentIndex()]);
  readonly scrolled = signal(false);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(() => {
      this.tick();

      const onScroll = () => {
        if (this.doc.documentElement.scrollTop > 50) {
          this.scrolled.set(true);
          this.doc.removeEventListener('scroll', onScroll);
        }
      };
      this.doc.addEventListener('scroll', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => {
        if (this.timeoutId !== null) clearTimeout(this.timeoutId);
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

  private tick(): void {
    const fullText = this.titles[this.currentIndex()];
    const current = this.displayedText();
    const deleting = this.isDeleting();

    if (!deleting && current === fullText) {
      this.timeoutId = setTimeout(() => {
        this.isDeleting.set(true);
        this.tick();
      }, 2200);
      return;
    }

    if (deleting && current === '') {
      this.isDeleting.set(false);
      this.currentIndex.update((i) => (i + 1) % this.titles.length);
      this.timeoutId = setTimeout(() => this.tick(), 400);
      return;
    }

    this.displayedText.update((t) =>
      deleting ? t.slice(0, -1) : fullText.slice(0, t.length + 1),
    );

    this.timeoutId = setTimeout(() => this.tick(), deleting ? 45 : 75);
  }
}
