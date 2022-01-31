import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Resource } from 'src/resource';
import { ResourcesService } from '../resources.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {
  resource: Resource | undefined;
  resourceId: string = ''

  constructor(private route: ActivatedRoute,
    private resourceService: ResourcesService,
    public dialogRef: MatDialogRef<ResourceDetailComponent>) { }

  getResource(): void {
    try {
      console.log(this.resourceId)
      this.resourceService.getResource(this.resourceId).subscribe(result => {
        this.resource = result
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  deleteProject(Id: string) {
    this.resourceService.deleteResource(Id)
    this.dialogRef.close()
  }

  updateProject(): void {
    this.resourceService.updateResource()
    this.dialogRef.close()
  }
  ngOnInit(): void {
    this.getResource()
  }
}
