import {
    createCanvas,
    Canvas,
    CanvasRenderingContext2D,
    registerFont,
} from "canvas";
registerFont(__dirname + "/../Raleway.ttf", { family: "Raleway" });

export class PieChart {
    private _CANVAS: Canvas;
    private _CTX: CanvasRenderingContext2D;
    private _LABELS: { text: string; size: number }[];
    private _SLICE_DEG: number;
    private _CENTER: number;
    private _BW: boolean;
    private _WIDTH: number;
    private _DEGREE = 0;

    constructor(options: {
        labels: { text: string; size: number }[];
        blackOrWhiteInvert: boolean;
        size: number;
    }) {
        this._LABELS = options.labels;
        this._SLICE_DEG = 360 / options.labels.reduce((i, c) => i + c.size, 0);
        this._BW = options.blackOrWhiteInvert;
        this._CANVAS = createCanvas(options.size, options.size);
        this._CTX = this._CANVAS.getContext("2d");
        this._WIDTH = this._CANVAS.width;
        this._CENTER = this._WIDTH / 2;
    }

    private invertColor(hex: string): string {
        if (hex.indexOf("#") === 0) hex = hex.slice(1);
        if (hex.length === 3)
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        const red = parseInt(hex.slice(0, 2), 16);
        const green = parseInt(hex.slice(2, 4), 16);
        const blue = parseInt(hex.slice(4, 6), 16);
        if (this._BW)
            return red * 0.299 + green * 0.587 + blue * 0.114 > 186
                ? "#000000"
                : "#FFFFFF";
        const newRed = ([0, 0] + (255 - red).toString(16)).slice(-2);
        const newGreen = ([0, 0] + (255 - green).toString(16)).slice(-2);
        const newBlue = ([0, 0] + (255 - blue).toString(16)).slice(-2);
        return "#" + newRed + newGreen + newBlue;
    }

    private randomColor(): string {
        const hex = Math.floor(Math.random() * 0xffffff);
        return "#" + ("000000" + hex.toString(16)).substr(-6);
    }

    private drawSlice(size: number, color: string): void {
        this._CTX.beginPath();
        this._CTX.fillStyle = color;
        this._CTX.moveTo(this._CENTER, this._CENTER);
        this._CTX.arc(
            this._CENTER,
            this._CENTER,
            this._CENTER,
            (this._DEGREE * Math.PI) / 180,
            ((this._DEGREE + this._SLICE_DEG * size) * Math.PI) / 180,
        );
        this._CTX.lineTo(this._CENTER, this._CENTER);
        this._CTX.fill();
    }

    private drawText(size: number, label: string, color: string): void {
        const oldLength = label.length;
        const font = `bold ${Math.floor(this._WIDTH / 30)}px Raleway`;
        this._CTX.font = font;
        let fontWidth = this._CTX.measureText(label).width;
        while (fontWidth > this._WIDTH / 3) {
            label = label.slice(0, label.length - 1);
            fontWidth = this._CTX.measureText(label).width;
        }
        if (label.length != oldLength)
            label = label.slice(0, label.length - 3) + "...";
        this._CTX.save();
        this._CTX.translate(this._CENTER, this._CENTER);
        this._CTX.rotate(
            ((this._DEGREE + (this._SLICE_DEG * size) / 2) * Math.PI) / 180,
        );
        this._CTX.textAlign = "left";
        this._CTX.fillStyle = this.invertColor(color);
        this._CTX.fillText(label, this._WIDTH / 8, 10);
        this._CTX.restore();
    }

    private drawCircle(): void {
        this._CTX.beginPath();
        this._CTX.arc(this._CENTER, this._CENTER, 30, 0, 2 * Math.PI);
        this._CTX.fillStyle = "#000000";
        this._CTX.fill();
    }

    public draw(): Buffer {
        for (let i = 0; i < this._LABELS.length; i++) {
            const color = this.randomColor();
            this.drawSlice(this._LABELS[i].size, color);
            this.drawText(this._LABELS[i].size, this._LABELS[i].text, color);
            this._DEGREE += this._SLICE_DEG * this._LABELS[i].size;
        }
        this.drawCircle();
        return this._CANVAS.toBuffer();
    }
}
