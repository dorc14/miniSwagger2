import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/project';
import { Resource } from 'src/resource';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectsService } from '../projects.service';
import { ResourcesService } from '../resources.service';
import { AddModelComponent } from '../add-model/add-model.component';
import { AddResourceComponent } from '../add-resource/add-resource.component';
import { ModelService } from '../model.service';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ResourceDetailComponent } from '../resource-detail/resource-detail.component';
import { ShowErrorComponent } from '../show-error/show-error.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projectName: string = ''
  public baseUrl: string = ''
  public Description: string = ''
  public projects: Project[] = []
  public resources: Resource[] = []
  public filterData: Resource[] = []
  public term: string = ''
  public model: any = {}
  displayedColumns: string[] = ['name', 'type', 'description', 'url'];

  constructor(private projectService: ProjectsService, public dialog: MatDialog,
    private resourceService: ResourcesService, private modelService: ModelService,
    private snackBar: ShowErrorComponent
  ) { }

  ngOnInit() {
    this.getProjects()
    this.filterData = this.resources
  }

  openAddProjectDialog() {
    this.dialog.open(AddProjectComponent)
  }

  getProjects() {
    this.projectService.getProjects().subscribe(result => {
      this.projects = result
    })
  }

  getResourcesToProject(projectId: string) {
    try {
      this.resourceService.getResourceByProjectId(projectId).subscribe(result => {
        this.resources = result
      })
      this.filterData = this.resources
    } catch (err: any) {
      this.snackBar.openSnackBar(err.message);
    }
  }

  applyFilter(event: Event) {
    if ((event.target as HTMLInputElement)) {
      this.term = (event.target as HTMLInputElement).value;
      this.filterData = this.resources.filter(resource => resource.name.includes(this.term))
    } else {
      this.filterData = this.resources
    }
  }

  deleteProject(Id: string) {
    this.projectService.deleteProject(Id)
  }

  openModelDialog(projectId: string) {
    let modelDialogRef = this.dialog.open(AddModelComponent)
    modelDialogRef.componentInstance.projectId = projectId
  }

  openAddResourceDialog(projectId: string) {
    let dialogRef = this.dialog.open(AddResourceComponent)
    dialogRef.componentInstance.projectId = projectId
  }

  setModelToProject(projectId: string) {
    const newModel = this.modelService.getModelByProjectId(projectId)
    this.deleteModelProperty(newModel)
  }

  showProjectDetails(projectId: string) {
    this.setModelToProject(projectId)
    this.getResourcesToProject(projectId)
  }

  openEditProjectDialog(projectId: string) {
    let EditDialogRef = this.dialog.open(EditProjectComponent)
    EditDialogRef.componentInstance.projectId = projectId
  }

  openEditResourceDialog(resourceId: string) {
    let EditResourceDialogRef = this.dialog.open(ResourceDetailComponent)
    EditResourceDialogRef.componentInstance.resourceId = resourceId
  }

  deleteModelProperty(newModel: object) {
    this.model = { ...newModel }
    delete this.model.projectId
  }
}
