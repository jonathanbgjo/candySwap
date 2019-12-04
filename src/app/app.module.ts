import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { RegisterComponent } from './pages/register/register.component';
import { GridComponent } from './pages/grid/grid.component';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppService} from './app.service';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './pages/user/user.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { DialoglooseComponent } from './pages/dialogloose/dialogloose.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { MapComponent } from './pages/map/map.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    RegisterComponent,
    GridComponent,
    UserComponent,
    DialogComponent,
    DialoglooseComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogComponent,
    DialoglooseComponent,
  ],
  providers: [AppService,
    {provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
