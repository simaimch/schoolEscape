import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Position } from '../position';

@Component({
  selector: 'app-reachable-position',
  standalone: true,
  imports: [],
  templateUrl: './reachable-position.component.html',
  styleUrl: './reachable-position.component.less'
})
export class ReachablePositionComponent {
  @Input() public rpos!: Position;
  @Output() activatePosition = new EventEmitter<Position>();

  select(){
    this.activatePosition.emit(this.rpos);
  }
}
