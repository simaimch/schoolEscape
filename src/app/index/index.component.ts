import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerStorageService } from '../player-storage.service';
import { ServerStorageService } from '../server-storage.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.less'
})
export class IndexComponent implements OnInit{

  creatorName:string = 'Unknown';

  constructor(
    private playerStorageService: PlayerStorageService,
    private serverStorageService:ServerStorageService
  ){

  }

  ngOnInit(){
    //this.retrieveCreatorName();
  }

  /*retrieveCreatorName(){
    this.serverStorageService.getData<{name:string}>().subscribe((response) => {
      this.creatorName = response.name;
    });
  }*/

  getPlayerId(){
    return this.playerStorageService.getPlayerId();
  }

  setPlayerId(newPlayerId:string){
    this.playerStorageService.setPlayerId(newPlayerId);
  }
}
