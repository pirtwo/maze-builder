export default class Cell {
    constructor({
        row,
        col,
        x,
        y,
        width,
        isVisited = false
    }) {
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;
        this.width = width;
        this.walls = {
            left: 1,
            right: 1,
            top: 1,
            bottom: 1
        };
        this.isVisited = isVisited;
    }

    getIndex(rowSize) {
        return this.col + this.row * rowSize;
    }

    getTopLeft() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getTopRight() {
        return {
            x: this.x + this.width,
            y: this.y
        };
    }

    getBottomLeft() {
        return {
            x: this.x,
            y: this.y + this.width
        };
    }

    getBottomRight() {
        return {
            x: this.x + this.width,
            y: this.y + this.width
        };
    }
}