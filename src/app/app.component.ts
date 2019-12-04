import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, switchMap } from 'rxjs/operators';
import { StoreService } from './services/store.service';
import { ApiService } from './services/api.service';
import { Diagram } from './models';
import {Router, ActivatedRoute, NavigationEnd, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  titleText = '';
  diagram: Diagram;
  viewMode: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      this.storeService.diagram$.subscribe(diagram => this.diagram = diagram);
      this.storeService.viewMode$.subscribe(viewMode => this.viewMode = viewMode);
      this.router.events.pipe(
          filter((event: RouterEvent) => event instanceof NavigationEnd),
          map(() => this.route.root.firstChild.snapshot.data)
      ).subscribe(data => this.titleText = data.title);
  }
  save(): void {
    if (!this.diagram.shapes.length) {
      return;
    }
    if (this.diagram._id) {
      this.apiService.editDiagram(this.diagram).subscribe(
        diagram => {
          this.storeService.setDiagram(diagram);
          this.notify('Your diagram has been successfully edited!');
        },
        error =>  this.notify(error.message)
      );
    } else {
      this.apiService.saveDiagram(this.diagram.shapes).subscribe(
        diagram => {
            this.storeService.setDiagram(diagram);
            this.notify('Your diagram has been successfully saved!');
        },
        error => this.notify(error.message)
      );
    }
  }
  publish(): void {
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
  notify(message: string): void {
      this.snackBar.open(message, null, { duration: 5000 });
  }
  btnActionText(diagram: Diagram): string {
      return diagram._id ? 'Edit' : 'Save';
  }
  btnPublishText(diagram: Diagram): string {
      return diagram.published ? 'Unpublished' : 'Published';
  }
}
