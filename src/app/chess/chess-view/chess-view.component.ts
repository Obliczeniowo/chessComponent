import { ChessStylesEnum } from './../chess/chess-enum';
import { ChessComponent } from './../chess/chess.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChessEnum } from '../chess/chess-enum';

@Component({
  selector: 'app-chess-view',
  templateUrl: './chess-view.component.html',
  styleUrls: ['./chess-view.component.scss']
})
export class ChessViewComponent implements OnInit {

  ChessStylesEnum = ChessStylesEnum;

  chessStyleEnum: ChessStylesEnum = ChessStylesEnum.darkBlue;

  chessPawns: Map<string, ChessEnum> = new Map<string, ChessEnum>();

  @ViewChild(ChessComponent, { static: false }) chessComponent: ChessComponent;

  constructor() {
    this.chessPawns.set('a1', ChessEnum.whiteRook);
    this.chessPawns.set('h1', ChessEnum.whiteRook);

    this.chessPawns.set('a8', ChessEnum.blackRook);
    this.chessPawns.set('h8', ChessEnum.blackRook);

    this.chessPawns.set('b1', ChessEnum.whiteKnight);
    this.chessPawns.set('g1', ChessEnum.whiteKnight);

    this.chessPawns.set('b8', ChessEnum.blackKnight);
    this.chessPawns.set('g8', ChessEnum.blackKnight);

    this.chessPawns.set('c1', ChessEnum.whiteBishop);
    this.chessPawns.set('f1', ChessEnum.whiteBishop);

    this.chessPawns.set('c8', ChessEnum.blackBishop);
    this.chessPawns.set('f8', ChessEnum.blackBishop);

    this.chessPawns.set('d1', ChessEnum.whiteQueen);
    this.chessPawns.set('e1', ChessEnum.whiteKing);

    this.chessPawns.set('d8', ChessEnum.blackQueen);
    this.chessPawns.set('e8', ChessEnum.blackKing);

    for (const i of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
      this.chessPawns.set(i + 2, ChessEnum.whitePawn);
      this.chessPawns.set(i + 7, ChessEnum.blackPawn);
    }
  }

  ngOnInit() {
  }
}
