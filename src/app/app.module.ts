import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ApiInterceptorService } from './services/api-interceptor.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DrawerComponent } from './pages/drawer/drawer.component';
import { ViewerComponent } from './pages/viewer/viewer.component';
import { CanvasComponent } from './shared/canvas/canvas.component';
import { ShapeComponent } from './shared/shape/shape.component';

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
export class AppModule { }
