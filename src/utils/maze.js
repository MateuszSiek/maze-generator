export function getEmptyMaze( width, height ) {
	const maze = [];
	for ( let i = 0; i < width; i++ ) {
		const mazeRow = [];
		for ( let j = 0; j < height; j++ ) {
			mazeRow.push({
				x           : i, y: j,
				visitedCount: 0,
				walls       : {
					left: 1, right: 1, top: 1, bottom: 1
				}
			});
		}
		maze.push(mazeRow);
	}
	return maze;
};

export function generateMaze( { width, height, startX, startY } ) {
	const maze = getEmptyMaze(width, height);
	let visitedFieldsCount = 0;
	const visitedStack = [];
	const visitedStackOrdered = [];

	let currentPos;

	const visitField = ( fieldToVisit, posRelToCurr = undefined ) => {
		if ( fieldToVisit.visitedCount === 0 ) {
			visitedStackOrdered.push(fieldToVisit);
			visitedFieldsCount++;
		}
		fieldToVisit.visitedCount++;
		if ( posRelToCurr ) {
			const currentField = visitedStack[ visitedStack.length - 1 ];
			if ( posRelToCurr === 1 ) {
				currentField.walls.left = 0;
				fieldToVisit.walls.right = 0;
			}
			if ( posRelToCurr === 2 ) {
				currentField.walls.top = 0;
				fieldToVisit.walls.bottom = 0;
			}
			if ( posRelToCurr === 3 ) {
				currentField.walls.right = 0;
				fieldToVisit.walls.left = 0;
			}
			if ( posRelToCurr === 4 ) {
				currentField.walls.bottom = 0;
				fieldToVisit.walls.top = 0;
			}
		}

		visitedStack.push(fieldToVisit);
		currentPos = { x: fieldToVisit.x, y: fieldToVisit.y };
	};
	const getFieldsNeighbour = ( field, neighbourDir ) => { // neighbour: 1-left, 2-top, 3-right, 4-bottom
		let neighXPos = field.x;
		let neighYPos = field.y;
		if ( neighbourDir === 1 || neighbourDir === 3 ) {
			neighXPos += (neighbourDir === 1 ? -1 : 1);
		}
		else {
			neighYPos += (neighbourDir === 2 ? 1 : -1);
		}
		if ( maze[ neighXPos ] && maze[ neighXPos ][ neighYPos ] ) {
			return maze[ neighXPos ][ neighYPos ];
		}
		return undefined;
	};
	const canVisitNeighbour = ( neighbour ) => {
		if ( neighbour ) {
			return neighbour.visitedCount === 0;
		}
		else {
			return false;
		}
	};
	const areNeighboursAvailable = ( field ) => {
		let available = false;
		for ( let i = 1; i < 5; i++ ) {
			const neighbour = getFieldsNeighbour(field, i);
			if ( neighbour && !available ) {
				available = canVisitNeighbour(neighbour);
			}
		}
		return available;
	};

	const firstToVisitX = Math.max(Math.min(startX || 0, width - 1), 0);
	const firstToVisitY = Math.max(Math.min(startY || 0, width - 1), 0);
	visitField(maze[ firstToVisitX ][ firstToVisitY ]);
	const singleIteration = () => {
		const neighbourToVisit = Math.floor(Math.random() * 4) + 1;
		const currentField = visitedStack[ visitedStack.length - 1 ];
		const neighbour = getFieldsNeighbour(currentField, neighbourToVisit);
		if ( canVisitNeighbour(neighbour) ) {
			visitField(neighbour, neighbourToVisit);
		}
		else {
			if ( !areNeighboursAvailable(currentField) && visitedStack.length > 1 ) {
				visitedStack.pop();
			}
		}
	}

	while ( visitedFieldsCount < width * height ) {
		singleIteration();
	}

	return visitedStackOrdered;
};
