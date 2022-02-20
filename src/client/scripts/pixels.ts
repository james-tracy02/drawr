import Coord from "./coord.js";
import Pixel from "./pixel.js";

export default class Pixels {
    private pixels: {
        [key: string]: Pixel
    };

    constructor() {
        this.pixels = {};
    }

    public drawLine(c0: Coord, c1: Coord, color: string) {
        const newPixels: Pixel[] = [];

        if (Math.abs(c1.y - c0.y) < Math.abs(c1.x - c0.x)) {
            if (c0.x > c1.x) {
                this.plotLine(c1.x, c1.y, c0.x, c0.y, (x, y) => {
                    newPixels.push(new Pixel(x, y, color));
                });
            } else {
                this.plotLine(c0.x, c0.y, c1.x, c1.y, (x, y) => {
                    newPixels.push(new Pixel(x, y, color));
                });
            }
        } else {
            if (c0.y > c1.y) {
                this.plotLine(c1.y, c1.x, c0.y, c0.x, (x, y) => {
                    newPixels.push(new Pixel(y, x, color));
                });
            } else {
                this.plotLine(c0.y, c0.x, c1.y, c1.x, (x, y) => {
                    newPixels.push(new Pixel(y, x, color));
                });
            }
        }

        newPixels.forEach(pixel => this.pixels[pixel.getKey()] = pixel);
        return newPixels;
    }

    private plotLine(x0: number, y0: number, x1: number, y1: number, plot: (x: number, y: number) => void) {
        const dx = x1 - x0;
        let dy = y1 - y0;
        let yi = 1
        if (dy < 0) {
            yi = -1;
            dy = -dy;
        }
        let D = (2 * dy) - dx;
        let y = y0;

        for(let x = x0; x <= x1; x++) {
            plot(x, y);
            if (D > 0) {
                y = y + yi;
                D = D + (2 *(dy - dx))
            } else {
                D = D + 2*dy
            }
        }
    }
}