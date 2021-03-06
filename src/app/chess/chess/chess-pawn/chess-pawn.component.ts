import { ChessEnum } from './../chess-enum';
import { Component, OnInit, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chess-pawn',
  templateUrl: './chess-pawn.component.html',
  styleUrls: ['./chess-pawn.component.scss']
})
export class ChessPawnComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() row: number;
  @Input() column: string;

  @Input() pawnType: ChessEnum;

  private dragstart = (event) => { event.dataTransfer.setData('text/plain', null); };

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.setAttribute('draggable', 'true');
    this.elementRef.nativeElement.addEventListener('dragstart', this.dragstart);
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener('dragstart', this.dragstart);
  }

}
