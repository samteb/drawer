import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diagram } from './models';
import { ApiService } from './services/api.service';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ DrawerService ]
})

export class AppComponent {
  diagram: Diagram = {
    published: false,
    shapes: []
  };
  isViewMode: boolean;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private drawerService: DrawerService
  ) {
    drawerService.shape$.subscribe(shape => this.diagram.shapes.push(shape));
    drawerService.viewerMode$.subscribe(isViewMode => this.isViewMode = isViewMode);
  }
  notify(message: string) {
    this.snackBar.open(message, null, { duration: 5000 });
  }
  save() {
    if (!this.diagram.shapes.length) {
      return;
    }
    if (this.diagram._id) {
      this.apiService.editDiagram(this.diagram).subscribe(
        diagram => {
          this.diagram.shapes = diagram.shapes;
          this.notify('Your diagram has been successfully edited!');
        },
        error =>  this.notify(error.message)
      );
    } else {
      this.apiService.saveDiagram(this.diagram.shapes).subscribe(
        diagram => {
          this.diagram._id = diagram._id;
          this.notify('Your diagram has been successfully saved!');
        },
        error => this.notify(error.message)
      );
    }
  }
  publish() {
    if (!this.diagram.shapes.length || !this.diagram._id) {
      return;
    }
    this.apiService.publishDiagram(this.diagram._id).subscribe(
      diagram => {
        this.diagram.published = diagram.published;
        const result = diagram.published ? 'published' : 'unpublished';
        this.notify(`Your diagram has been successfully ${result}!`);
      },
      error => this.notify(error.message)
    );
  }
}
