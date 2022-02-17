import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  projectIdKey: string = 'projectId'
  models: any[] = JSON.parse(localStorage.getItem('Models') || '[]');

  addModel(projectId: string, fields: FormArray, types: FormArray): void {
    const model: Array<any> = []
    this.getModelByProjectId(projectId).subscribe(res => {
      res.projectId = projectId
      res = model
    })

    this.createDynamicJson(model, fields, types)

    if (localStorage.getItem('Models')) {
      this.models = [...this.models, model]
    } else { this.models.push(model) }

    localStorage.setItem('Models', JSON.stringify(this.models))
  }

  getModels(): Observable<any> {
    return of(this.models)
  }

  getModelByProjectId(projectId: string): Observable<any> {
    return of(this.models.filter(model => model.projectId == projectId)[0])
  }

  createDynamicJson(model: Array<any>, fields: FormArray, types: FormArray): void {
    fields.controls.map((field, index) => {
      model[field.value] = types.controls[index].value
    })
  }

  deleteModel(projectId: string): void {
    this.models.filter(model => model.projectId == projectId).pop()
  }
}