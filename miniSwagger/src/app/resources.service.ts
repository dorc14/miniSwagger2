import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Resource } from 'src/resource';

@Injectable({
  providedIn: 'root'
})

export class ResourcesService {
  resources: Resource[] = JSON.parse(localStorage.getItem('Resources') || '[]');

  constructor() { }

  addResource(projectId: string, name: string, type: string, description: string, url: string): void {
    // Generate Id
    const Id: string = Math.random().toString(36).substr(2, 9)
    const resource = {
      projectId,
      Id,
      name,
      type,
      description,
      url
    }
    if (localStorage.getItem('Resources')) {
      this.resources = [...this.resources, resource]
    } else { this.resources.push(resource) }

    localStorage.setItem('Resources', JSON.stringify(this.resources))
  }

  getResources() {
    return of(this.resources)
  }

  deleteResource(Id: string): void {
    localStorage.setItem('Resources', JSON.stringify(this.resources.filter(resource => resource.Id !== Id)))
  }

  getResource(Id: string) {
    return of(this.resources.filter(resource => resource.Id === Id).pop())
  }

  updateResource(): void {
    localStorage.setItem('Resources', JSON.stringify(this.resources))
  }

  getResourceByProjectId(projectId: string) {
    return of(this.resources.filter(resource => resource.projectId === projectId))
  }
}