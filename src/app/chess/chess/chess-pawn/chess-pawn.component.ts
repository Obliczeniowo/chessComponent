import { ChessEnum } from './../chess-enum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chess-pawn',
  templateUrl: './chess-pawn.component.html',
  styleUrls: ['./chess-pawn.component.scss']
})
export class ChessPawnComponent implements OnInit {

  @Input() row: number;
  @Input() column: string;

  @Input() pawnType: ChessEnum;

  constructor() { }

  ngOnInit() {
  }

}
