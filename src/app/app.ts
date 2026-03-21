import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { Hero } from './features/hero/hero';
import { Skills } from './features/skills/skills';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';
import { ProjectCarousel } from './features/projects/project-carousel/project-carousel';
import { CarouselService } from './core/services/carousel.service';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Skills, Projects, Contact, ProjectCarousel],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-skills />
      <app-projects />
      <app-contact />
    </main>

    @if (carousel.selectedProject()) {
      <app-project-carousel
        [project]="carousel.selectedProject()!"
        (closed)="carousel.close()"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly carousel = inject(CarouselService);
}
