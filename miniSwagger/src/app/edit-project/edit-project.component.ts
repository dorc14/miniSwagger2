import { Component, OnInit } from '@angular/core';
import { Project } from 'src/project';
import { ProjectsService } from '../projects.service';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  public project: Project | undefined;
  public projectId: string = ''

  constructor(private projectService: ProjectsService,
    public dialogRef: MatDialogRef<EditProjectComponent>) { }
    
  ngOnInit(): void {
    this.getProject()
  }

  getProject(): void {
    const Id: string = this.projectId
    this.projectService.getProject(Id).subscribe(result => {
      this.project = result
    })
  }

  onSubmit() {
    this.projectService.updateProject()
    this.dialogRef.close();
  }
}
