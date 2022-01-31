import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectName: string = ''
  baseUrl: string = ''
  description: string = ''

  constructor(private projectService: ProjectsService,
    public dialogRef: MatDialogRef<AddProjectComponent>,
  ) { }

  onSubmit() {
    this.addProject()
    this.dialogRef.close();
  }

  addProject() {
    this.projectService.addProject(this.projectName, this.baseUrl, this.description)
  }

  ngOnInit(): void {
  }
}
