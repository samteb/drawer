import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})

export class ViewerComponent implements OnInit {
  error = '';

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {
    this.storeService.setViewMode(true);
  }

  ngOnInit(): void {
    this.route.data.pipe(pluck('diagram')).subscribe(data => {
      if (data.error) {
        this.error = data.error.error;
      }
      this.storeService.setDiagram(data.diagram);
    });
  }
}
