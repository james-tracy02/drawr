import Pos from "./pos.js";

export default class Input {
    public static mouseButtonLeft = 0;
    public static mouseButtonRight = 1;

    private mouseButtons: number;
    private mousePos: Pos;
    private prevMousePos: Pos;

    constructor() {
        this.mouseButtons = 0;
        this.mousePos = new Pos(0, 0);
        this.prevMousePos = this.mousePos;
    }

    public setMouseButtons(buttons: number): void {
        this.mouseButtons = buttons;
    }

    public setMousePos(pos: Pos): Pos {
        this.prevMousePos = this.mousePos;
        this.mousePos = pos;
        return this.prevMousePos;
    }

    public getMousePos(): Pos {
        return this.mousePos;
    }

    public isMouseDown(mouseButton: number): boolean {
        return (1 >> mouseButton & this.mouseButtons) as unknown as boolean;
    }
}