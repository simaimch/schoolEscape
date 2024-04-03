import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pawn } from '../pawn';

@Component({
  selector: 'app-pawn',
  standalone: true,
  imports: [],
  templateUrl: './pawn.component.html',
  styleUrl: './pawn.component.less'
})
export class PawnComponent {
  @Input() public pawn!: Pawn;
  @Input() public pawnId!: string;
  @Output() updateSelectedPawn = new EventEmitter<string>();

  select(){
    this.updateSelectedPawn.emit(this.pawnId);
  }
}
