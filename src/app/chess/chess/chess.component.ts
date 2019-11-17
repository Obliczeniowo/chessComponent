import { ChessPawnComponent } from './chess-pawn/chess-pawn.component';
import { ChessEnum } from './chess-enum';
import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  ChessEnum = ChessEnum;

  dragged: HTMLElement;

  @ViewChildren(ChessPawnComponent) chessPawns: QueryList<ChessPawnComponent>;

  rows: number[] = [8, 7, 6, 5, 4, 3, 2, 1];
  columns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    /* events fired on the draggable target */
    document.addEventListener('drag', (event) => {

    }, false);

    this.elementRef.nativeElement.addEventListener('dragstart', (event: any) => {
      // store a ref. on the dragged elem
      console.log('dragged', this.dragged)
      this.dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
    }, false);

    this.elementRef.nativeElement.addEventListener('dragend', (event: any) => {
      // reset the transparency
      event.target.style.opacity = '';
    }, false);

    /* events fired on the drop targets */
    this.elementRef.nativeElement.addEventListener('dragover', (event: any) => {
      // prevent default to allow drop
      event.preventDefault();
    }, false);

    this.elementRef.nativeElement.addEventListener('dragenter', (event: any) => {
      // highlight potential drop target when the draggable element enters it
      if (event.target.className === 'dropzone') {
        event.target.style.background = 'purple';
      }

    }, false);

    this.elementRef.nativeElement.addEventListener('dragleave', (event: any) => {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.className === 'dropzone') {
        event.target.style.background = '';
      }

    }, false);

    this.elementRef.nativeElement.addEventListener('drop', (event: any) => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      let target: HTMLElement = event.target.classList.contains('pawn-field') ? event.target.parentElement : event.target;
      if (target) {
        let pawn: ChessPawnComponent = this.chessPawns.find((item) => target.classList.contains(item.column + item.row));
        let pawnFrom: ChessPawnComponent = this.chessPawns.find((item) => this.dragged.classList.contains(item.column + item.row));
        if (pawnFrom) {
          pawnFrom.pawnType = ChessEnum.nonePawn;
        }
        if (pawn) {
          pawn.pawnType = this.dragged.innerText as ChessEnum;
        }
      }

    }, false);
  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', null);
  }

  dragEnd(event) {
    console.log('drag end', event);
  }

  drop(event) {
    console.log(event);
  }

  allowDrop(event) {
    console.log(event.target);
    // event.dataTransfer.setData('chessType', event.target.chessType);
  }

}
