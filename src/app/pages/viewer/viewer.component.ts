import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  error = '';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private drawerService: DrawerService
  ) {}

  ngOnInit() {
    setTimeout(() => this.drawerService.isViewMode(true));
    const diagramId = this.activatedRoute.snapshot.paramMap.get('id');
    if (diagramId) {
      this.apiService.getDiagram(diagramId).subscribe(
        diagram => this.shapes = diagram.shapes,
        error => this.error = error.message.includes('Unauthorized') ? 'This diagram is private!' : 'An error occurred.'
      );
    }
  }
}
