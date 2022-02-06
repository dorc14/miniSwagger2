import { Component, OnInit } from '@angular/core';
import { Project } from 'src/project';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModelComponent } from '../add-model/add-model.component';
import { ResourcesService } from '../resources.service';
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { Resource } from 'src/resource';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  public project: Project | undefined;
  public projectId: string = this.route.snapshot.paramMap.get('id') || ''
  public resources: Resource[] = []
  public displayedColumns: string[] = ['name', 'type', 'description', 'url'];
  public filterData: Resource[] = []
  public term: string = ''
  public model: any = {}

  constructor(private route: ActivatedRoute,
    private projectService: ProjectsService,
    private resourceService: ResourcesService,
    private modelService: ModelService,
    private location: Location,
    public dialog: MatDialog) { }

  applyFilter(event: Event) {
    if ((event.target as HTMLInputElement)) {
      this.term = (event.target as HTMLInputElement).value;
      this.filterData = this.resources.filter(resource => resource.name.includes(this.term))
    } else {
      this.filterData = this.resources
    }
  }
  getProject(): void {
    const Id = this.projectId 
    this.projectService.getProject(Id).subscribe(result => {
      this.project = result
    })
  }

  deleteProject(Id: string) {
    this.projectService.deleteProject(Id)
    this.location.back();
  }

  updateProject(): void {
    this.projectService.updateProject()
    this.location.back();
  }

  ngOnInit(): void {
    this.getProject()
    this.getResourcesToProject()
    this.getModelToProject()
    this.filterData = this.resources
  }

  openModelDialog() {
    let modelDialogRef = this.dialog.open(AddModelComponent)
    modelDialogRef.componentInstance.projectId = this.projectId
  }

  openAddResourceDialog() {
    let dialogRef = this.dialog.open(AddResourceComponent)
    dialogRef.componentInstance.projectId = this.projectId
  }

  getResourcesToProject() {
    try {
      this.resourceService.getResourceByProjectId(this.projectId).subscribe(result => {
        this.resources = result
      })
    } catch (err) {
      console.log(err)
    }
  }

  getModelToProject() {
    const newModel = this.modelService.getModelByProjectId(this.projectId)
    this.model = { ...newModel }
    delete this.model.projectId
  }
  
}
