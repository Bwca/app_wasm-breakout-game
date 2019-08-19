/** class for handling visual output */

export default class Canvas {
    private element: HTMLCanvasElement;
    /** context for drawing */
    private ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.element = document.getElementById(canvasId) as HTMLCanvasElement;
        const context = this.element.getContext('2d');
        if (!context) {
            throw 'Error: Could not obtain canvas context!';
        }
        this.ctx = context;
    }

    public clearRect(x: number, y: number, width: number, height: number) {
        this.ctx.clearRect(x, y, width, height);
    }

    public drawCircle(
        x: number,
        y: number,
        radius: number,
        rgbFill: string
    ): void {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = rgbFill;
        this.ctx.fill();
        this.ctx.closePath();
    }

    public drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        rgbFill: string
    ) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = rgbFill;
        this.ctx.fill();
        this.ctx.closePath();
    }

    public clearCanvas(): void {
        this.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public get canvasWidth(): number {
        return this.element.width;
    }

    public get canvasHeight(): number {
        return this.element.height;
    }
}