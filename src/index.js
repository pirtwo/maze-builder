import P5 from "p5";
import Grid from "./grid";

const sk = (p5) => {
    let grid,
        currCell,
        chosenCell,
        openList = [];

    const startPoint = {
        row: 12,
        col: 12
    };

    p5.preload = () => {
        // load assets here
    }

    p5.setup = () => {
        p5.createCanvas(501, 501);
        grid = new Grid({
            x: 1,
            y: 1,
            rowNum: 25,
            colNum: 25,
            cellWidth: 20
        })

        let startCell = grid.cells[grid.getCellIndex(startPoint.row, startPoint.col)];
        startCell.isVisited = true;
        openList.push(startCell);
    }

    p5.draw = () => {
        p5.background(200);
        p5.frameRate(5);

        // draw grid
        grid.cells.forEach(cell => {
            p5.stroke("black");
            p5.noFill();

            // draw cell walls
            if (cell.walls.top)
                p5.line(
                    cell.getTopLeft().x,
                    cell.getTopLeft().y,
                    cell.getTopRight().x,
                    cell.getTopRight().y
                );

            if (cell.walls.bottom)
                p5.line(
                    cell.getBottomLeft().x,
                    cell.getBottomLeft().y,
                    cell.getBottomRight().x,
                    cell.getBottomRight().y
                );

            if (cell.walls.left)
                p5.line(
                    cell.getTopLeft().x,
                    cell.getTopLeft().y,
                    cell.getBottomLeft().x,
                    cell.getBottomLeft().y
                );

            if (cell.walls.right)
                p5.line(
                    cell.getTopRight().x,
                    cell.getTopRight().y,
                    cell.getBottomRight().x,
                    cell.getBottomRight().y
                );

            if (!cell.isVisited) {
                p5.fill("gray");
                p5.noStroke();
                p5.square(cell.x, cell.y, cell.width);
            }
        });

        // build maze with DFS
        if (openList.length > 0) {
            currCell = openList.pop();
            if (grid.getCellNeighbors(currCell).length > 0) {
                openList.push(currCell);
                chosenCell = p5.shuffle(grid.getCellNeighbors(currCell))[0];
                chosenCell.isVisited = true;
                removeWall(currCell, chosenCell);
                openList.push(chosenCell);
            }
        }

        // show current cell
        p5.fill("green")
        p5.square(currCell.x, currCell.y, currCell.width);
    }

    function removeWall(currCell, chosenCell) {
        if (currCell.row == chosenCell.row - 1 && currCell.col == chosenCell.col) {
            currCell.walls.bottom = 0;
            chosenCell.walls.top = 0;
        } else if (currCell.row == chosenCell.row + 1 && currCell.col == chosenCell.col) {
            currCell.walls.top = 0;
            chosenCell.walls.bottom = 0;
        }

        if (currCell.col == chosenCell.col - 1 && currCell.row == chosenCell.row) {
            currCell.walls.right = 0;
            chosenCell.walls.left = 0;
        } else if (currCell.col == chosenCell.col + 1 && currCell.row == chosenCell.row) {
            currCell.walls.left = 0;
            chosenCell.walls.right = 0;
        }
    }
}

new P5(sk);