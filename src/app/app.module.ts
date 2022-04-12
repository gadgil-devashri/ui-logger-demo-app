import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShowcaseDataComponent } from './showcase-data/showcase-data.component';
import { DialogDataExampleDialog } from './showcase-data/showcase-data.component'

const routes: Routes = [{ path: 'login', component: UserAuthComponent }, 
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'showcase-data', component: ShowcaseDataComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    NavBarComponent,
    ShowcaseDataComponent,
    DialogDataExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
