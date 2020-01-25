import { ChessPawnComponent } from './chess-pawn/chess-pawn.component';
import { ChessEnum } from './chess-enum';
import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Component({
    selector: 'app-chess',
    templateUrl: './chess.component.html',
    styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit, AfterViewInit, OnDestroy {

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

    private dragstart = (event: any) => {
        this.dragged = event.target;
        event.target.style.opacity = .5;
    }

    private dragend = (event: any) => {
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
            const pawn: ChessPawnComponent = this.chessPawnsMapComponent.get(target.className);
            const pawnFrom: ChessPawnComponent = this.chessPawnsMapComponent.get(this.dragged.className);
            if (pawnFrom) {
                this.chessPawnsMap.set(this.dragged.className, ChessEnum.nonePawn);
            }
            if (pawn && (this.dragged.innerText as ChessEnum) !== ChessEnum.nonePawn) {
                this.chessPawnsMap.set(target.className, this.dragged.innerText as ChessEnum);
            }
        }

    }

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.chessPawns.forEach((pawn) => {
            if (pawn.column && pawn.row) {
                this.chessPawnsMapComponent.set(pawn.column + pawn.row, pawn);
            }
        });

        document.addEventListener('drag', this.drag, false);

        this.hostHtml.addEventListener('dragstart', this.dragstart, false);
        this.hostHtml.addEventListener('dragend', this.dragend, false);
        this.hostHtml.addEventListener('dragover', this.dragover, false);
        this.hostHtml.addEventListener('dragenter', this.dragenter, false);
        this.hostHtml.addEventListener('dragleave', this.dragleave, false);
        this.hostHtml.addEventListener('drop', this.drop, false);
    }

    ngOnDestroy() {
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
