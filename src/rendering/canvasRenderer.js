import { D_CELL_SIZE } from "../utils/defaults";

const configDefaults = {
	cellSize: D_CELL_SIZE,
	animate : false
}

export function renderMazeCanvas( maze, container, { cellSize, animate } = configDefaults ) {
	if ( !maze || !maze[ 0 ] )
		return;
	const width = Math.max(...maze.map(( a ) => a.x)) + 1;
	const height = Math.max(...maze.map(( a ) => a.y)) + 1;

	let canvas = document.createElement('canvas');
	canvas.setAttribute('width', width * cellSize);
	canvas.setAttribute('height', height * cellSize);
	container.appendChild(canvas);

	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, width * cellSize, height * cellSize);
	ctx.beginPath();
	let i = 0;
	const delayRender = () => {
		requestAnimationFrame(() => {
			i++;
			if ( i < maze.length ) {
				for ( let j = i; j >= 0; j-- ) {
					renderMazeSquare(ctx, maze[ j ], height, cellSize);
				}
				ctx.stroke();
				delayRender();
			}
		})
	};

	if ( animate ) {
		delayRender();
	}
	else {
		maze.forEach(( cell, idx ) => {
			renderMazeSquare(ctx, cell, height, cellSize);
		});
		ctx.stroke();
	}
};


function renderMazeSquare( ctx, squareDesc, height, cellSize ) {
	const pos = { x: squareDesc.x * cellSize, y: (-squareDesc.y * cellSize + cellSize * (height - 1)) };
	const walls = squareDesc.walls;
	if ( squareDesc.visitedCount === 0 )
		return;
	if ( walls.left ) {
		ctx.moveTo(pos.x, pos.y);
		ctx.lineTo(pos.x, pos.y + cellSize);
	}
	if ( walls.right ) {
		ctx.moveTo(pos.x + cellSize, pos.y + cellSize);
		ctx.lineTo(pos.x + cellSize, pos.y);
	}
	if ( walls.bottom ) {
		ctx.moveTo(pos.x, pos.y + cellSize);
		ctx.lineTo(pos.x + cellSize, pos.y + cellSize);
	}
	if ( walls.top ) {
		ctx.moveTo(pos.x + cellSize, pos.y);
		ctx.lineTo(pos.x, pos.y);
	}
}