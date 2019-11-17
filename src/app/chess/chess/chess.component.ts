import { ChessPawnComponent } from './chess-pawn/chess-pawn.component';
import { ChessEnum } from './chess-enum';
import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit, AfterViewInit, OnDestroy {

  ChessEnum = ChessEnum;

  dragged: HTMLElement;

  @ViewChildren(ChessPawnComponent) chessPawns: QueryList<ChessPawnComponent>;

  rows: number[] = [8, 7, 6, 5, 4, 3, 2, 1];
  columns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  private dragstart = (event: any) => {
    // store a ref. on the dragged elem
    this.dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
  }

  private dragend = (event: any) => {
    // reset the transparency
    event.target.style.opacity = '';
  }

  private drag = (event) => { };

  private dragover = (event: any) => {
    event.preventDefault();
  }

  private dragenter = (event: any) => {
    if (event.target.className === 'dropzone') {
      event.target.style.background = 'purple';
    }
  }

  private dragleave = (event: any) => {
    if (event.target.className === 'dropzone') {
      event.target.style.background = '';
    }
  }

  private drop = (event: any) => {
    event.preventDefault();
    const target: HTMLElement = event.target.classList.contains('pawn-field') ? event.target.parentElement : event.target;
    if (target) {
      const pawn: ChessPawnComponent = this.chessPawns.find((item) => target.classList.contains(item.column + item.row));
      const pawnFrom: ChessPawnComponent = this.chessPawns.find((item) => this.dragged.classList.contains(item.column + item.row));
      if (pawnFrom) {
        pawnFrom.pawnType = ChessEnum.nonePawn;
      }
      if (pawn) {
        pawn.pawnType = this.dragged.innerText as ChessEnum;
      }
    }

  }

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.addEventListener('drag', this.drag, false);

    this.elementRef.nativeElement.addEventListener('dragstart', this.dragstart, false);

    this.elementRef.nativeElement.addEventListener('dragend', this.dragend, false);

    this.elementRef.nativeElement.addEventListener('dragover', this.dragover, false);

    this.elementRef.nativeElement.addEventListener('dragenter', this.dragenter, false);

    this.elementRef.nativeElement.addEventListener('dragleave', this.dragleave, false);

    this.elementRef.nativeElement.addEventListener('drop', this.drop, false);
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener('dragstart', this.dragstart);
    this.elementRef.nativeElement.removeEventListener('dragend', this.dragend);
    this.elementRef.nativeElement.removeEventListener('dragover', this.dragover);
    this.elementRef.nativeElement.removeEventListener('dragenter', this.dragenter);
    this.elementRef.nativeElement.removeEventListener('dragleave', this.dragleave);
    this.elementRef.nativeElement.removeEventListener('drop', this.drop);
  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', null);
  }

}
