export default class Pixel {
    public x: number;
    public y: number;
    public color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public getKey(): string {
        return `x${this.x}y${this.y}`;
    }
}