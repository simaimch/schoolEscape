import { Component, Input } from '@angular/core';
import { Wall } from '../wall';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.less'
})
export class WallComponent {
  @Input() public pawn!: Wall;
}
