import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.css']
})
export class ShowErrorComponent implements OnInit {
  durationInSeconds = 1000;
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
