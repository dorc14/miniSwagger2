import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Resource } from 'src/resource';
import { ResourcesService } from '../resources.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ShowErrorComponent } from '../show-error/show-error.component';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {
  public resource: Resource | undefined;
  public resourceId: string = ''

  constructor(private route: ActivatedRoute,
    private resourceService: ResourcesService,
    public dialogRef: MatDialogRef<ResourceDetailComponent>,
    private snackBar: ShowErrorComponent) { }

  getResource(): void {
    try {
      console.log(this.resourceId)
      this.resourceService.getResource(this.resourceId).subscribe(result => {
        this.resource = result
      })
    }
    catch (err: any) {
      this.snackBar.openSnackBar(err.message);
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
