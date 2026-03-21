import { Injectable, signal } from '@angular/core';
import { type Project } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  readonly selectedProject = signal<Project | null>(null);

  open(project: Project): void {
    if (project.images.length === 0) return;
    this.selectedProject.set(project);
  }

  close(): void {
    this.selectedProject.set(null);
  }
}
