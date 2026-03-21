import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import {
  SKILL_CATEGORIES,
  type SkillCategory,
} from '../../core/data/skills.data';

interface CategoryWithOffset {
  readonly category: SkillCategory;
  readonly offset: number;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'skills', class: 'reveal' },
})
export class Skills {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly scrollAnim = inject(ScrollAnimationService);

  /** Pre-computed global card index offset per category for stagger animation. */
  readonly categoriesWithOffset: readonly CategoryWithOffset[] =
    SKILL_CATEGORIES.reduce<CategoryWithOffset[]>((acc, category, i) => {
      const offset =
        i === 0 ? 0 : acc[i - 1].offset + acc[i - 1].category.skills.length;
      return [...acc, { category, offset }];
    }, []);

  constructor() {
    afterNextRender(() => {
      this.scrollAnim.observe(this.el.nativeElement);
    });
  }
}
