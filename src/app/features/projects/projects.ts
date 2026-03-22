import {
  afterEveryRender,
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FREELANCE_PROJECTS,
  PERSONAL_PROJECTS,
  type Project,
} from '../../core/data/projects.data';
import { CarouselService } from '../../core/services/carousel.service';

type Tab = 'personal' | 'freelance';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'projects', class: 'reveal' },
  animations: [
    trigger('tabContent', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate(
          '350ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
    trigger('cardReveal', [
      state('hidden', style({ opacity: 0, transform: 'translateY(28px)' })),
      state('visible', style({ opacity: 1, transform: 'none' })),
      transition(
        'hidden => visible',
        animate('520ms cubic-bezier(0.16, 1, 0.3, 1)'),
      ),
    ]),
  ],
})
export class Projects {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollAnim = inject(ScrollAnimationService);
  private readonly carousel = inject(CarouselService);
  private observer: IntersectionObserver | null = null;

  readonly activeTab = signal<Tab>('personal');
  readonly visibleCardIds = signal<ReadonlySet<number>>(new Set());

  readonly filteredProjects = computed<readonly Project[]>(() =>
    this.activeTab() === 'personal' ? PERSONAL_PROJECTS : FREELANCE_PROJECTS,
  );

  constructor() {
    afterNextRender(() => {
      this.scrollAnim.observe(this.host.nativeElement);
    });

    afterEveryRender(() => {
      if (!this.observer) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const id = Number(
                  (entry.target as HTMLElement).dataset['id'],
                );
                if (!Number.isNaN(id)) {
                  this.visibleCardIds.update((s) => new Set([...s, id]));
                  this.observer!.unobserve(entry.target);
                }
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
        );
        this.destroyRef.onDestroy(() => this.observer?.disconnect());
      }

      const unobserved = Array.from(
        this.host.nativeElement.querySelectorAll('[data-id]:not([data-observed])'),
      ) as HTMLElement[];
      unobserved.forEach((el: HTMLElement) => {
        el.dataset['observed'] = 'true';
        this.observer!.observe(el);
      });
    });
  }

  protected setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }

  protected cardState(id: number): 'hidden' | 'visible' {
    return this.visibleCardIds().has(id) ? 'visible' : 'hidden';
  }

  protected openCarousel(project: Project): void {
    this.carousel.open(project);
  }
}
