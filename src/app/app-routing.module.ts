import { ChessViewComponent } from './chess/chess-view/chess-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'chess-view', component: ChessViewComponent
  },
  {
    path: '',
    redirectTo: '/chess-view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
