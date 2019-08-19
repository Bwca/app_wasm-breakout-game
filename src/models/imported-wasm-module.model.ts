import { ASUtil } from "assemblyscript/lib/loader";
/** interface containing all functions of the imported wasm module */
export default interface ImportedWasmModule extends ASUtil {
    add(a: number, b: number): number;
    sayHello(): void;
    Circle(): void;
}
