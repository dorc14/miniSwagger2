import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }
  projectIdKey: string = 'projectId'
  models: any[] = JSON.parse(localStorage.getItem('Models') || '[]');

  addModel(projectId: string, fields: FormArray, types: FormArray) {
    const model = this.getModelByProjectId(projectId) || {}

    if (Object.keys(model).length == 0) {
      model[this.projectIdKey] = projectId
    }

    this.createDynamicJson(model, fields, types)

    if (localStorage.getItem('Models')) {
      this.models = [...this.models, model]
    } else { this.models.push(model) }

    localStorage.setItem('Models', JSON.stringify(this.models))
  }

  getModels() {
    return of(this.models)
  }

  getModelByProjectId(projectId: string) {
    return this.models.filter(model => model.projectId == projectId)[0]
  }

  createDynamicJson(model: Array<any>, fields: FormArray, types: FormArray) {
    fields.controls.map((field, index) => {
      model[field.value] = types.controls[index].value
    })
  }

  deleteModel(projectId: string): void {
    this.models.filter(model => model.projectId == projectId).pop()
  }
}