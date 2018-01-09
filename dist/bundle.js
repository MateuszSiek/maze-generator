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



const getEmptyMaze = function (width, height) {
    const maze = [];
    for (let i = 0; i < width; i++) {
        const mazeRow = [];
        for (let j = 0; j < height; j++) {
            mazeRow.push({
                x: i, y: j,
                visitedCount: 0,
                walls: {
                    left: 1, right: 1, top: 1, bottom: 1
                }
            });
        }
        maze.push(mazeRow);
    }
    return maze;
};

const generateMaze = function ({width, height, startX, startY}) {
    const maze = getEmptyMaze(width, height);
    let visitedFieldsCount = 0;
    const visitedStack = [];
    const visitedStackOrdered = [];

    let currentPos;

    const visitField = (fieldToVisit, posRelToCurr = undefined) => {
        if (fieldToVisit.visitedCount === 0) {
            fieldToVisit.visitIndex = visitedFieldsCount;
            visitedStackOrdered.push(fieldToVisit);
            visitedFieldsCount++;
        }
        fieldToVisit.visitedCount++;
        if (posRelToCurr) {
            const currentField = visitedStack[visitedStack.length - 1];
            if (posRelToCurr === 1) {
                currentField.walls.left = 0;
                fieldToVisit.walls.right = 0;
            }
            if (posRelToCurr === 2) {
                currentField.walls.top = 0;
                fieldToVisit.walls.bottom = 0;
            }
            if (posRelToCurr === 3) {
                currentField.walls.right = 0;
                fieldToVisit.walls.left = 0;
            }
            if (posRelToCurr === 4) {
                currentField.walls.bottom = 0;
                fieldToVisit.walls.top = 0;
            }
        }

        visitedStack.push(fieldToVisit);
        currentPos = {x: fieldToVisit.x, y: fieldToVisit.y};
    };
    const getFieldsNeighbour = (field, neighbourDir) => { // neighbour: 1-left, 2-top, 3-right, 4-bottom
        let neighXPos = field.x;
        let neighYPos = field.y;
        if (neighbourDir === 1 || neighbourDir === 3) {
            neighXPos += (neighbourDir === 1 ? -1 : 1);
        }
        else {
            neighYPos += (neighbourDir === 2 ? 1 : -1);
        }
        if (maze[neighXPos] && maze[neighXPos][neighYPos]) {
            return maze[neighXPos][neighYPos];
        }
        return undefined;
    };
    const canVisitNeighbour = (neighbour) => {
        if (neighbour) {
            return neighbour.visitedCount === 0;
        }
        else {
            return false;
        }
    };
    const areNeighboursAvailable = (field) => {
        let available = false;
        for (let i = 1; i < 5; i++) {
            const neighbour = getFieldsNeighbour(field, i);
            if (neighbour && !available) {
                available = canVisitNeighbour(neighbour);
            }
        }
        return available;
    };

    const firstToVisitX = Math.max(Math.min(startX, width), 0);
    const firstToVisitY = Math.max(Math.min(startY, width), 0);

    visitField(maze[firstToVisitX][firstToVisitY]);
    const singleIteration = () => {
        const neighbourToVisit = Math.floor(Math.random() * 4) + 1;
        const currentField = visitedStack[visitedStack.length - 1];
        const neighbour = getFieldsNeighbour(currentField, neighbourToVisit);
        if (canVisitNeighbour(neighbour)) {
            visitField(neighbour, neighbourToVisit);
        }
        else {
            if (!areNeighboursAvailable(currentField) && visitedStack.length > 1) {
                visitedStack.pop();
            }
        }
    }

    while (visitedFieldsCount < width * height) {
        singleIteration();
    }

    return visitedStackOrdered;
};


class MazeGenerator extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        const mazeWidth = this.getAttribute('data-x-count') || 10;
        const mazeHeight = this.getAttribute('data-y-count') || 10;
        const startX = this.getAttribute('data-x-start') || 0;
        const startY = this.getAttribute('data-y-start') || 0;
        const cellSize = this.getAttribute('data-cell-size') || 10;
        const animate = this.getAttribute('data-animate') === 'true';
        const maze = generateMaze({
            width: mazeWidth,
            height: mazeHeight,
            startX, startY
        });
        const div = document.createElement('span');
        // div.style.display = 'inline-block';
        console.log(maze);
        // if (this.getAttribute('data-graphicType') === 'raster') {
            Object(__WEBPACK_IMPORTED_MODULE_1__rendering_canvasRenderer__["a" /* renderMazeCanvas */])(maze, div, {cellSize, animate});
        // }
        // else {
            Object(__WEBPACK_IMPORTED_MODULE_0__rendering_svgRenderer__["a" /* renderMazeSvg */])(maze, div, {cellSize, animate});
        // }
        this.appendChild(div);
    }
}

customElements.define('maze-generator', MazeGenerator);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NS = 'http://www.w3.org/2000/svg';

const configDefaults = {
    cellSize: 10,
    animate: false
}

const renderMazeSvg = function (maze, container, {cellSize, animate} = configDefaults) {
    if (!maze || !maze[0])
        return;
    const width = Math.max(...maze.map((a) => a.x)) + 1;
    const height = Math.max(...maze.map((a) => a.y)) + 1;
    console.log(width);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', width * cellSize);
    svg.setAttribute('height', height * cellSize);
    svg.style.stroke = 'black';
    const mainGroup = document.createElementNS(NS, 'g');
    mainGroup.setAttribute('transform', `translate(0,${cellSize * (height - 1)})`);
    svg.appendChild(mainGroup);

    container.appendChild(svg);


    const renderMazeSquare = (squareDesc, container) => {
        const walls = squareDesc.walls;
        const createLine = (x1, y1, x2, y2) => {
            const line = document.createElementNS(NS, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            return line;
        }
        if (walls.left) {
            container.appendChild(createLine(0, 0, 0, cellSize));
        }
        if (walls.right) {
            container.appendChild(createLine(cellSize, cellSize, cellSize, 0));
        }
        if (walls.bottom) {
            container.appendChild(createLine(0, cellSize, cellSize, cellSize));
        }
        if (walls.top) {
            container.appendChild(createLine(cellSize, 0, 0, 0));
        }
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('width', cellSize)
        rect.setAttribute('height', cellSize)
        rect.style.stroke = 'none';
        rect.style.fill = 'none';
        // rect.style.opacity = 0.2;
        container.appendChild(rect);
    }

    const viewElements = [];
    maze.forEach((cell, idx) => {
        const subGroup = document.createElementNS(NS, 'g');
        let classList = '';
        if (idx === 0) {
            classList += ' mg-first';
        }

        if (idx === maze.length - 1) {
            classList += ' mg-last';
        }

        classList += ' mg-cell';
        classList += ' mg-cell-x-' + cell.x;
        classList += ' mg-cell-y-' + cell.y;
        subGroup.setAttribute('class', classList);
        subGroup.setAttribute('transform', `translate(${cell.x * cellSize},${-cell.y * cellSize})`);
        renderMazeSquare(cell, subGroup);
        viewElements.push(subGroup);
    });

    let i = 0;
    const delayRender = () => {
        requestAnimationFrame(() => {
            i++;
            if (i < viewElements.length) {
                mainGroup.appendChild(viewElements[i]);
                delayRender();
            }
        })
    };
    if (animate) {
        delayRender();
    }
    else {
        viewElements.forEach((element) => {
            mainGroup.appendChild(element);
        });
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = renderMazeSvg;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const configDefaults = {
    cellSize: 10,
    animate: false
}
const renderMazeCanvas = function (maze, container, {cellSize, animate} = configDefaults) {
    if (!maze || !maze[0])
        return;
    const width = Math.max(...maze.map((a) => a.x)) + 1;
    const height = Math.max(...maze.map((a) => a.y)) + 1;

    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', width * cellSize);
    canvas.setAttribute('height', height * cellSize);
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width * cellSize, height * cellSize);
    ctx.beginPath();
    const renderMazeSquare = (squareDesc) => {
        const pos = {x: squareDesc.x * cellSize, y: (-squareDesc.y * cellSize + cellSize * (height - 1))};
        const walls = squareDesc.walls;
        if (squareDesc.visitedCount === 0)
            return;
        if (walls.left) {
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x, pos.y + cellSize);
        }
        if (walls.right) {
            ctx.moveTo(pos.x + cellSize, pos.y + cellSize);
            ctx.lineTo(pos.x + cellSize, pos.y);
        }
        if (walls.bottom) {
            ctx.moveTo(pos.x, pos.y + cellSize);
            ctx.lineTo(pos.x + cellSize, pos.y + cellSize);
        }
        if (walls.top) {
            ctx.moveTo(pos.x + cellSize, pos.y);
            ctx.lineTo(pos.x, pos.y);
        }
    }


    let i = 0;
    const delayRender = () => {
        requestAnimationFrame(() => {
            i++;
            if (i < maze.length) {
                for (let j = i; j >= 0; j--) {
                    renderMazeSquare(maze[j]);
                }
                ctx.stroke();
                delayRender();
            }
        })
    };

    if (animate) {
        delayRender();
    }
    else {
        maze.forEach((cell) => {
            renderMazeSquare(cell);
        });
        ctx.stroke();
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = renderMazeCanvas;



/***/ })
/******/ ]);