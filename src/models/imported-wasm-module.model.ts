import { ASUtil } from "assemblyscript/lib/loader";
import BreakOutGameStatuses from '../wasm-shared/enums/game-statuses.enum';

export interface BreakoutGame {
    newGameStatus: BreakOutGameStatuses;
    gameLoop(): void;
}

/** interface containing all functions of the imported wasm module */
export interface ImportedWasmModule extends ASUtil {
    BreakoutGame(width: number, height: number): void;
}
