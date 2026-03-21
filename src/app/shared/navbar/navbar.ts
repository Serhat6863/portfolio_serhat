import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.navbar--scrolled]': 'scrolled()',
  },
})
export class Navbar {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly scrolled = signal(false);
  readonly activeSection = signal('hero');
  readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      // Navbar background on scroll
      const onScroll = () => {
        this.scrolled.set(this.doc.documentElement.scrollTop > 60);
      };
      this.doc.addEventListener('scroll', onScroll, { passive: true });

      // Active section tracking
      const sectionIds = ['hero', 'about', 'skills', 'projects'];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
            }
          });
        },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' },
      );

      sectionIds.forEach((id) => {
        const el = this.doc.getElementById(id);
        if (el) observer.observe(el);
      });

      this.destroyRef.onDestroy(() => {
        this.doc.removeEventListener('scroll', onScroll);
        observer.disconnect();
      });
    });
  }

  protected scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.menuOpen.set(false);
    this.doc
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
