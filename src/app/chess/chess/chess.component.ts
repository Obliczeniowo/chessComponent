import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  rows: number[] = [8, 7, 6, 5, 4, 3, 2, 1];
  columns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  constructor() { }

  ngOnInit() {
  }

}
