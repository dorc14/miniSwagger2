import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})

export class AddResourceComponent implements OnInit {
  projectId: string = ''
  resourceName: string = ''
  type: string = ''
  description: string = ''
  url: string = ''

  constructor(private resourceService: ResourcesService,
    public dialogRef: MatDialogRef<AddResourceComponent>) { }

  onSubmit() {
    this.addResource()
    this.dialogRef.close();
  }

  addResource() {
    this.resourceService.addResource(this.projectId, this.resourceName, this.type, this.description, this.url)
  }

  ngOnInit(): void {
  }
}
