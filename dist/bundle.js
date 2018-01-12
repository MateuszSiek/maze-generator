/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rendering_svgRenderer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rendering_canvasRenderer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_maze__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_defaults__ = __webpack_require__(4);






class MazeGenerator extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		const mazeWidth = Number(this.dataset.xCount) || __WEBPACK_IMPORTED_MODULE_3__utils_defaults__["b" /* D_X_COUNT */];
		const mazeHeight = Number(this.dataset.yCount) || __WEBPACK_IMPORTED_MODULE_3__utils_defaults__["d" /* D_Y_COUNT */];
		const startX = Number(this.dataset.xStart) || __WEBPACK_IMPORTED_MODULE_3__utils_defaults__["c" /* D_X_START */];
		const startY = Number(this.dataset.yStart) || __WEBPACK_IMPORTED_MODULE_3__utils_defaults__["e" /* D_Y_START */];
		const cellSize = Number(this.dataset.cellSize) || __WEBPACK_IMPORTED_MODULE_3__utils_defaults__["a" /* D_CELL_SIZE */];
		const animate = this.dataset.animate === 'true';
		const maze = Object(__WEBPACK_IMPORTED_MODULE_2__utils_maze__["a" /* generateMaze */])({
			width : mazeWidth,
			height: mazeHeight,
			startX, startY
		});
		const div = document.createElement('span');
		// div.style.display = 'inline-block';
		console.log(maze);
		if ( this.dataset.graphicType === 'raster' ) {
			Object(__WEBPACK_IMPORTED_MODULE_1__rendering_canvasRenderer__["a" /* renderMazeCanvas */])(maze, div, { cellSize, animate });
		}
		else {
			Object(__WEBPACK_IMPORTED_MODULE_0__rendering_svgRenderer__["a" /* renderMazeSvg */])(maze, div, { cellSize, animate });
		}
		this.appendChild(div);
	}
}
/* harmony export (immutable) */ __webpack_exports__["MazeGenerator"] = MazeGenerator;


customElements.define('maze-generator', MazeGenerator);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renderMazeSvg;
/* unused harmony export getMazeSquare */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_defaults__ = __webpack_require__(4);


const NS = 'http://www.w3.org/2000/svg';

const configDefaults = {
	cellSize: __WEBPACK_IMPORTED_MODULE_0__utils_defaults__["a" /* D_CELL_SIZE */],
	animate : false
}


function renderMazeSvg( maze, mazeContainer, { cellSize, animate } = configDefaults ) {
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
function getMazeSquare( walls, cellSize ) {
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renderMazeCanvas;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_defaults__ = __webpack_require__(4);


const configDefaults = {
	cellSize: __WEBPACK_IMPORTED_MODULE_0__utils_defaults__["a" /* D_CELL_SIZE */],
	animate : false
}

function renderMazeCanvas( maze, container, { cellSize, animate } = configDefaults ) {
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
	console.log(ctx);
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getEmptyMaze */
/* harmony export (immutable) */ __webpack_exports__["a"] = generateMaze;
function getEmptyMaze( width, height ) {
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

function generateMaze( { width, height, startX, startY } ) {
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const D_CELL_SIZE = 10;
/* harmony export (immutable) */ __webpack_exports__["a"] = D_CELL_SIZE;

const D_X_COUNT = 10;
/* harmony export (immutable) */ __webpack_exports__["b"] = D_X_COUNT;

const D_Y_COUNT = 10;
/* harmony export (immutable) */ __webpack_exports__["d"] = D_Y_COUNT;

const D_X_START = 0;
/* harmony export (immutable) */ __webpack_exports__["c"] = D_X_START;

const D_Y_START = 0;
/* harmony export (immutable) */ __webpack_exports__["e"] = D_Y_START;


/***/ })
/******/ ]);