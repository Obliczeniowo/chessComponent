import { ChessPawnComponent } from './chess-pawn/chess-pawn.component';
import { ChessEnum } from './chess-enum';
import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements AfterViewInit, OnDestroy {

  ChessEnum = ChessEnum;

  dragged: HTMLElement;

  @ViewChildren(ChessPawnComponent) chessPawns: QueryList<ChessPawnComponent>;

  @Input() chessPawnsMap: Map<string, ChessEnum> = new Map<string, ChessEnum>();
  private chessPawnsMapComponent: Map<string, ChessPawnComponent> = new Map<string, ChessPawnComponent>();

  rows: number[] = [8, 7, 6, 5, 4, 3, 2, 1];
  columns: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  private get hostHtml(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  dragstart = (event: any) => {
    this.dragged = event.target;
    event.target.style.opacity = .5;
  }

  dragend = (event: any) => {
    event.target.style.opacity = '';
  }

  drag = (event) => {
    console.log(event);
  };

  dragover = (event: any) => {
    event.preventDefault();
  }

  dragenter = (event: any) => {
    if (event.target.className === 'dropzone') {
      event.target.style.background = 'purple';
    }
  }

  dragleave = (event: any) => {
    if (event.target.className === 'dropzone') {
      event.target.style.background = '';
    }
  }

  drop = (event: any) => {
    event.preventDefault();
    const target: HTMLElement = event.target.classList.contains('pawn-field') ? event.target.parentElement : event.target;
    if (target) {
      const pawn: ChessPawnComponent | undefined = this.chessPawnsMapComponent.get(target.className);
      // get name of class that is an address of field
      const name = Array.from(this.dragged.classList).filter(className => className.length === 2)[0];
      const pawnFrom: ChessPawnComponent | undefined = this.chessPawnsMapComponent.get(name);
      if (pawnFrom) {
        this.chessPawnsMap.set(name, ChessEnum.nonePawn);
      }
      if (pawn && (this.dragged.innerText as ChessEnum) !== ChessEnum.nonePawn) {
        this.chessPawnsMap.set(target.className, this.dragged.innerText as ChessEnum);
      }
    }

  }

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    this.chessPawns.forEach((pawn) => {
      if (pawn.column && pawn.row) {
        this.chessPawnsMapComponent.set(pawn.column + pawn.row, pawn);
      }
    });

    this.hostHtml.addEventListener('drag', this.drag, false);

    this.hostHtml.addEventListener('dragstart', this.dragstart, false);
    this.hostHtml.addEventListener('dragend', this.dragend, false);
    this.hostHtml.addEventListener('dragover', this.dragover, false);
    this.hostHtml.addEventListener('dragenter', this.dragenter, false);
    this.hostHtml.addEventListener('dragleave', this.dragleave, false);
    this.hostHtml.addEventListener('drop', this.drop, false);
  }

  ngOnDestroy() {
    this.hostHtml.removeEventListener('drag', this.drag);
    this.hostHtml.removeEventListener('dragstart', this.dragstart);
    this.hostHtml.removeEventListener('dragend', this.dragend);
    this.hostHtml.removeEventListener('dragover', this.dragover);
    this.hostHtml.removeEventListener('dragenter', this.dragenter);
    this.hostHtml.removeEventListener('dragleave', this.dragleave);
    this.hostHtml.removeEventListener('drop', this.drop);
  }

  setChessPawn(column: string, row: number, pawn: ChessEnum) {
    this.chessPawnsMap.set(column + row, pawn);
  }

  moveChessPawn(startCoumn: string, startRow: number, endColumn: string, endRow: number) {
    const chessPawn: ChessEnum = this.getChessPawn(startCoumn + startRow);
    if (chessPawn === ChessEnum.nonePawn) {
      return;
    }
    this.setChessPawn(endColumn, endRow, chessPawn);
  }

  getChessPawn(address: string): ChessEnum {
    const pawn: ChessEnum = this.chessPawnsMap.get(address);
    return pawn ? pawn : ChessEnum.nonePawn;
  }
}
