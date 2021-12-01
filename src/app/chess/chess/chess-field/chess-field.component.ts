import { ChessEnum } from './../chess-enum';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.scss']
})
export class ChessFieldComponent implements OnInit {
  ChessEnum = ChessEnum;

  @Input() row: number;
  @Input() column: string;

  @HostBinding('class.chess-field') chessField = true;
  @HostBinding('class.white-field') get whiteField() {
    return this.row !== undefined && this.column !== undefined && this.isWhite
  };
  @HostBinding('class.black-field') get blackField() {
    return this.row !== undefined && this.column !== undefined && this.isBlack
  }

  get columnIndex(): number {
    return this.column.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }

  get isBlack(): boolean {
    return ((this.row) + (this.columnIndex) % 2) % 2 === 0;
  }

  get isWhite(): boolean {
    return !this.isBlack;
  }

  constructor() { }

  ngOnInit() {
  }

}
