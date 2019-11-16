import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chess-field',
  templateUrl: './chess-field.component.html',
  styleUrls: ['./chess-field.component.scss']
})
export class ChessFieldComponent implements OnInit {

  @Input() row: number;
  @Input() column: string;

  get columnIndex(): number {
    return this.column.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }

  get isBlack(): boolean {
    console.log('row', this.row, 'column', this.columnIndex);
    return ((this.row) + (this.columnIndex ) % 2) % 2 === 0;
  }

  get isWhite(): boolean {
    return !this.isBlack;
  }

  constructor() { }

  ngOnInit() {
  }

}
