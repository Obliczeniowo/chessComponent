import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessComponent } from './chess/chess.component';
import { ChessFieldComponent } from './chess/chess-field/chess-field.component';
import { ChessPawnComponent } from './chess/chess-pawn/chess-pawn.component';
import { ChessViewComponent } from './chess-view/chess-view.component';

@NgModule({
  declarations:
    [
      ChessComponent,
      ChessFieldComponent,
      ChessPawnComponent,
      ChessViewComponent
    ],
  imports: [
    CommonModule
  ]
})
export class ChessModule { }
