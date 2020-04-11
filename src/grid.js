import Cell from "./cell";

export default class Grid {
    constructor({
        x = 0,
        y = 0,
        rowNum,
        colNum,
        cellWidth
    }) {
        this.x = x;
        this.y = y;
        this.rowNum = rowNum
        this.colNum = colNum;
        this.cellWidth = cellWidth;
        this.cells = this.buildGrid();
    }

    buildGrid() {
        let cells = [];

        for (let i = 0; i < this.rowNum; i++) {
            for (let j = 0; j < this.colNum; j++) {
                cells.push(new Cell({
                    row: i,
                    col: j,
                    x: this.x + j * this.cellWidth,
                    y: this.y + i * this.cellWidth,
                    width: this.cellWidth
                }));
            }
        }

        return cells;
    }

    getCellNeighbors(cell) {
        let negihbor, negihbors = [];

        negihbor = this.cells[this.getCellIndex(cell.row - 1, cell.col)];
        if (negihbor && !negihbor.isVisited) negihbors.push(negihbor);

        negihbor = this.cells[this.getCellIndex(cell.row + 1, cell.col)];
        if (negihbor && !negihbor.isVisited) negihbors.push(negihbor);

        negihbor = this.cells[this.getCellIndex(cell.row, cell.col - 1)];
        if (negihbor && !negihbor.isVisited) negihbors.push(negihbor);

        negihbor = this.cells[this.getCellIndex(cell.row, cell.col + 1)];
        if (negihbor && !negihbor.isVisited) negihbors.push(negihbor);

        return negihbors;
    }

    getCellIndex(row, col) {
        if (row < 0 || row >= this.rowNum || col < 0 || col >= this.colNum) return -1
        return col + row * this.colNum;
    }
}