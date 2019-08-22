import { ASUtil } from "assemblyscript/lib/loader";

export interface BreakoutGame {
    gameLoop(): void;
}

/** interface containing all functions of the imported wasm module */
export interface ImportedWasmModule extends ASUtil {
    createGame(width: number, height:number): BreakoutGame;
}
