import { instantiateBuffer } from "assemblyscript/lib/loader";

import ImportedWasmModule from './models/imported-wasm-module.model';
import WASM_MODULE_URL from './constants/wasm-url.constant';
import Canvas from './models/canvas.model';

let wasmModuleInstance: ImportedWasmModule;
const canvasId = 'canvas';

const canvas = new Canvas(canvasId);

const imports: any = {
    console: {
        logMessage(msg: number): void {
            const message = wasmModuleInstance.__getString(msg);
            console.log(message);
        }
    },
    canvas: {
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

fetch(WASM_MODULE_URL)
    .then(response => response.arrayBuffer())
    .then(bytes => instantiateBuffer(bytes as Uint8Array, imports))
    .then(bytes => {
        wasmModuleInstance = <unknown>bytes as ImportedWasmModule;
        wasmModuleInstance.sayHello();
    });
