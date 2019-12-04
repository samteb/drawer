import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawerComponent } from './containers/drawer/drawer.component';
import { ViewerComponent } from './containers/viewer/viewer.component';
import { ViewerResolve } from './containers/viewer/viewer.resolve';

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
    },
    resolve: {
      diagram: ViewerResolve
    }
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
