import { D_CELL_SIZE } from "../utils/defaults";

const NS = 'http://www.w3.org/2000/svg';

const configDefaults = {
	cellSize: D_CELL_SIZE,
	animate : false
}


export function renderMazeSvg( maze, mazeContainer, { cellSize, animate } = configDefaults ) {
	if ( !maze || !maze[ 0 ] )
		return;
	const width = Math.max(...maze.map(( a ) => a.x)) + 1;
	const height = Math.max(...maze.map(( a ) => a.y)) + 1;
	const svg = document.createElementNS(NS, 'svg');

	svg.setAttribute('width', width * cellSize);
	svg.setAttribute('height', height * cellSize);
	svg.style.stroke = 'black';

	const mainGroup = document.createElementNS(NS, 'g');
	mainGroup.setAttribute('transform', `translate(0,${cellSize * (height - 1)})`);
	svg.appendChild(mainGroup);

	mazeContainer.appendChild(svg);


	const viewElements = [];
	maze.forEach(( cell, idx ) => {
		let classList = '';
		if ( idx === 0 ) {
			classList += ' mg-first';
		}

		if ( idx === maze.length - 1 ) {
			classList += ' mg-last';
		}

		classList += ' mg-cell';
		classList += ' mg-cell-x-' + cell.x;
		classList += ' mg-cell-y-' + cell.y;
		const mazeCell = getMazeSquare(cell.walls, cellSize);
		mazeCell.setAttribute('class', classList);
		mazeCell.setAttribute('transform', `translate(${cell.x * cellSize},${-cell.y * cellSize})`);
		viewElements.push(mazeCell);
	});

	let i = 0;
	const delayRender = () => {
		requestAnimationFrame(() => {
			if ( i < viewElements.length ) {
				mainGroup.appendChild(viewElements[ i ]);
				delayRender();
			}
			i++;
		})
	};
	if ( animate ) {
		delayRender();
	}
	else {
		viewElements.forEach(( element ) => {
			mainGroup.appendChild(element);
		});
	}
};

/*
 * @private
 */
export function getMazeSquare( walls, cellSize ) {
	const container = document.createElementNS(NS, 'g');
	const createLine = ( x1, y1, x2, y2 ) => {
		const line = document.createElementNS(NS, 'line');
		line.setAttribute('x1', x1);
		line.setAttribute('y1', y1);
		line.setAttribute('x2', x2);
		line.setAttribute('y2', y2);
		return line;
	}
	if ( walls.left ) {
		container.appendChild(createLine(0, 0, 0, cellSize));
	}
	if ( walls.right ) {
		container.appendChild(createLine(cellSize, cellSize, cellSize, 0));
	}
	if ( walls.bottom ) {
		container.appendChild(createLine(0, cellSize, cellSize, cellSize));
	}
	if ( walls.top ) {
		container.appendChild(createLine(cellSize, 0, 0, 0));
	}
	const rect = document.createElementNS(NS, 'rect');
	rect.setAttribute('width', cellSize)
	rect.setAttribute('height', cellSize)
	rect.style.stroke = 'none';
	rect.style.fill = 'none';
	container.appendChild(rect);
	return container;
}