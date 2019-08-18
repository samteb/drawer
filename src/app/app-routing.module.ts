import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawerComponent } from './pages/drawer/drawer.component';
import { ViewerComponent } from './pages/viewer/viewer.component';

const routes: Routes = [
  {
    path: '',
    component: DrawerComponent,
    data: {
      title: 'Diagram drawer'
    }
  },
  {
    path: 'diagram/:id',
    component: ViewerComponent,
    data: {
      title: 'Diagram viewer'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
