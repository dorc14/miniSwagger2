import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Project } from 'src/project';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  projects: Project[] = JSON.parse(localStorage.getItem('Projects') || '[]');

  constructor() { }

  addProject(name: string, baseUrl: string, description: string): void {

    // Generate Id
    const Id: string = Math.random().toString(36).substr(2, 9)
    const project = {
      Id,
      name,
      baseUrl,
      description
    }
    if (localStorage.getItem('Projects')) {
      this.projects = [...this.projects, project]
    } else { this.projects.push(project) }

    localStorage.setItem('Projects', JSON.stringify(this.projects))
  }

  getProjects() {
    return of(this.projects)
  }

  deleteProject(Id: string): void {
    localStorage.setItem('Projects', JSON.stringify(this.projects.filter(proj => proj.Id !== Id)))
  }

  getProject(Id: string) {
    return of(this.projects.filter(project => project.Id === Id).pop())
  }

  updateProject(): void {
    localStorage.setItem('Projects', JSON.stringify(this.projects))
  }
}