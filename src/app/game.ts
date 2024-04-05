import { Pawn } from "./pawn";
import { Tile } from "./tile";

export interface Game {
  name:string;
  pawns:{[key:string]:Pawn};
  playerIds:string[];
  playerTurn:string;
  remainingMoves: number;
  tiles: Tile[];
  selectedPawnIndex: string;
}
