import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerStorageService } from '../player-storage.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.less'
})
export class IndexComponent {
  constructor(
    private playerStorageService: PlayerStorageService,
  ){

  }

  getPlayerId(){
    return this.playerStorageService.getPlayerId();
  }

  setPlayerId(newPlayerId:string){
    this.playerStorageService.setPlayerId(newPlayerId);
  }
}
