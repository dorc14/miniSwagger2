import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})

export class AddModelComponent implements OnInit {
  fields: FormArray = new FormArray([])
  types: FormArray = new FormArray([])
  selectValue: string = ''
  model: any = {}
  projectId: string = ''

  constructor(public dialogRef: MatDialogRef<AddModelComponent>,
    private modelService: ModelService) { }

  ngOnInit(): void {
    this.fields.push(new FormControl(""))
    this.types.push(new FormControl(""))
  }

  addInfo(index: number) {
    this.fields.push(new FormControl(""))
    this.types.push(new FormControl(""))
    this.setValue(index)
  }

  removeInfo(index: number) {
    this.fields.removeAt(index)
    this.types.removeAt(index)
  }

  setValue(index: number) {
    this.types.controls[index].setValue(this.selectValue)
  }

  setLastItem() {
    this.types.controls[this.types.controls.length - 1].setValue(this.selectValue)
  }

  addModel() {
    this.setLastItem()
    this.modelService.addModel(this.projectId, this.fields, this.types)
  }

  onSubmit() {
    this.addModel()
    this.model = this.modelService.getModelByProjectId(this.projectId)
    this.dialogRef.close();
  }
}