import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProjectComponent } from './add-project/add-project.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { AddModelComponent } from './add-model/add-model.component';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from './edit-project/edit-project.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShowErrorComponent } from './show-error/show-error.component';



@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    AddResourceComponent,
    ResourceDetailComponent,
    AddModelComponent,
    EditProjectComponent,
    ShowErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
