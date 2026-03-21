import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private observer: IntersectionObserver | null = null;

  private getObserver(): IntersectionObserver {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              this.observer!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
      );
    }
    return this.observer;
  }

  observe(element: Element): void {
    this.getObserver().observe(element);
  }
}
