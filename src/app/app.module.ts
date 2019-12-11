import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { ApiInterceptorService } from './services/api-interceptor.service';

import { ViewerResolve } from './containers/viewer/viewer.resolve';

import { DrawerComponent } from './containers/drawer/drawer.component';
import { ViewerComponent } from './containers/viewer/viewer.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ShapeComponent } from './components/shape/shape.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    ViewerComponent,
    CanvasComponent,
    ShapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSnackBarModule
  ],
  providers: [
    ApiService,
    ViewerResolve,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
