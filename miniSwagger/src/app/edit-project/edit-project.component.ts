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

  constructor(private projectService: ProjectsService,
    public dialogRef: MatDialogRef<EditProjectComponent>) { }

  public project: Project | undefined;
  public projectId: string = ''

  ngOnInit(): void {
    this.getProject()
  }

  updateProject(): void {
    this.projectService.updateProject()
  }

  getProject(): void {
    const Id = this.projectId
    this.projectService.getProject(Id).subscribe(result => {
      this.project = result
    })
  }

  onSubmit() {
    this.updateProject()
    this.dialogRef.close();
  }
}
