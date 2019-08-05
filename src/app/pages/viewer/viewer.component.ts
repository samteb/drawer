import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Shape } from '../../models';
import { ApiService } from '../../services/api.service';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})

export class ViewerComponent implements OnInit {
  shapes: Shape[] = [];

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private drawerService: DrawerService
  ) {}

  ngOnInit() {
    this.drawerService.isViewMode(true);
    const diagramId = this.activatedRoute.snapshot.paramMap.get('id');
    if (diagramId) {
      this.apiService.getDiagram(diagramId).subscribe(
        diagram => this.shapes = diagram.shapes,
        error => this.notify(error.message)
      );
    }
  }

  notify(message: string) {
    this.snackBar.open(message, null, { duration: 5000 });
  }
}
