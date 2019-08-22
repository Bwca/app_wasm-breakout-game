import { instantiateBuffer } from "assemblyscript/lib/loader";

import { ImportedWasmModule, BreakoutGame } from './models/imported-wasm-module.model';
import WASM_MODULE_URL from './constants/wasm-url.constant';
import Canvas from './models/canvas.model';
import BreakOutGameStatuses from './wasm-shared/enums/game-statuses.enum';

let wasmModuleInstance: ImportedWasmModule;
let wasmBreakout: BreakoutGame;
const canvasId = 'canvas';

const canvas = new Canvas(canvasId);

const imports: any = {
    console: {
        logMessage(msg: number): void {
            const message = wasmModuleInstance.__getString(msg);
            console.log(message);
        }
    },
    game: {
        canContinueCheck(status: BreakOutGameStatuses): void {
            if (status !== BreakOutGameStatuses.GameOver) {
                requestAnimationFrame(() => wasmBreakout.gameLoop());
            }
        }
    },
    canvas: {
        clearRect(x: number, y: number, width: number, height: number): void {
            canvas.clearRect(x, y, width, height);
        },
        drawCircle(
            x: number,
            y: number,
            radius: number,
            red: number,
            green: number,
            blue: number
        ): void {
            const rgb = `rgb(${red}, ${green}, ${blue})`
            canvas.drawCircle(x, y, radius, rgb);
        },

        drawRect(
            x: number,
            y: number,
            width: number,
            height: number,
            red: number,
            green: number,
            blue: number
        ): void {
            const rgb = `rgb(${red}, ${green}, ${blue})`;
            canvas.drawRect(x, y, width, height, rgb);
        }
    }
};

function startGame(): void {
    console.log('start game');
}

function pauseGame(): void {
    console.log('pause game')
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded');

    document.getElementById('start-game')!.addEventListener('click', startGame);
    document.getElementById('pause-game')!.addEventListener('click', pauseGame);

});

fetch(WASM_MODULE_URL)
    .then(response => response.arrayBuffer())
    .then(bytes => instantiateBuffer(bytes as Uint8Array, imports))
    .then(bytes => {
        wasmModuleInstance = <unknown>bytes as ImportedWasmModule;
        wasmBreakout = new wasmModuleInstance.BreakoutGame(canvas.canvasWidth, canvas.canvasHeight);
        requestAnimationFrame(() => wasmBreakout.gameLoop());

    });

