import Pos from "./pos.js";
import Input from "./input.js";
import Coord from "./coord.js";
import Pixels from "./pixels.js";
import Pixel from "./pixel.js";

export default class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private zoom: number;
    private input: Input;
    private pixels: Pixels;

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.input = new Input();
        this.pixels = new Pixels();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.canvas.addEventListener('contextmenu', (event: Event) => {
            event.preventDefault()
        });

        ["mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove"]
        .forEach((mouseAction: string) => {
            this.canvas.addEventListener(mouseAction, (mouseEvent: MouseEvent) => this.mouseEventHandler(mouseEvent));
        });
    }

    private mouseEventHandler(mouseEvent: MouseEvent): void {
        this.input.setMouseButtons(mouseEvent.buttons);

        const newPos = new Pos(mouseEvent.x, mouseEvent.y);
        const prevPos = this.input.setMousePos(newPos);

        if (this.input.isMouseDown(Input.mouseButtonLeft)) {
            return this.drawLine(prevPos, newPos);
        }
    }

    private drawLine(p0: Pos, p1: Pos) {
        const c0 = this.posToCoord(p0);
        const c1 = this.posToCoord(p1);

        const newPixels = this.pixels.drawLine(c0, c1, "black");
        this.drawPixels(newPixels);
    }

    private posToCoord(p: Pos): Coord {
        const x = p.x;
        const y = p.y;
        return new Coord(x, y);
    }

    private drawPixels(pixels: Pixel[]) {
        pixels.forEach((pixel: Pixel) => {
            this.ctx.fillStyle = pixel.color;
            this.ctx.fillRect(pixel.x, pixel.y, 1, 1);
        });
    }
}
