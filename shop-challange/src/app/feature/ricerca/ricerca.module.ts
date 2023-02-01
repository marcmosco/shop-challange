import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RicercaComponent } from './ricerca.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: RicercaComponent }];

@NgModule({
  declarations: [RicercaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class RicercaModule {}
