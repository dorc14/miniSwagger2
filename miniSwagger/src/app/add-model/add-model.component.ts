import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})

export class AddModelComponent implements OnInit {
  public fields: FormArray = new FormArray([])
  public types: FormArray = new FormArray([])
  public selectValue: string = ''
  public model: object = {}
  public projectId: string = ''

  constructor(public dialogRef: MatDialogRef<AddModelComponent>,
    private modelService: ModelService) { }

  ngOnInit(): void {
    this.fields.push(new FormControl("", [Validators.required]))
    this.types.push(new FormControl("", [Validators.required]))
  }

  addModelInformation(index: number) {
    this.fields.push(new FormControl("", [Validators.required]))
    this.types.push(new FormControl("", [Validators.required]))
    this.setTypeValue(index)
  }

  removeModelInformation(index: number) {
    this.fields.removeAt(index)
    this.types.removeAt(index)
  }

  setTypeValue(index: number) {
    this.types.controls[index].setValue(this.selectValue)
  }

  setLastType() {
    this.types.controls[this.types.controls.length - 1].setValue(this.selectValue)
  }

  createModel() {
    this.setLastType()
    this.modelService.addModel(this.projectId, this.fields, this.types)
  }

  onSubmit() {
    this.createModel()
    this.model = this.modelService.getModelByProjectId(this.projectId)
    this.dialogRef.close();
  }
}