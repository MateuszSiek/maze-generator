import { renderMazeSvg } from './rendering/svgRenderer';
import { renderMazeCanvas } from './rendering/canvasRenderer';
import { generateMaze } from "./utils/maze";
import { D_CELL_SIZE, D_X_COUNT, D_X_START, D_Y_COUNT, D_Y_START } from "./utils/defaults";

document.addEventListener("DOMContentLoaded", function () {

	customElements.define('maze-generator', MazeGenerator);
});

export class MazeGenerator extends HTMLElement {
	constructor() {
		super();
		const mazeWidth = Number(this.dataset.xCount) || D_X_COUNT; // number of horizontal cells
		const mazeHeight = Number(this.dataset.yCount) || D_Y_COUNT; // number of vertical cells
		const startX = Number(this.dataset.xStart) || D_X_START; // position of first mace cell
		const startY = Number(this.dataset.yStart) || D_Y_START; // position of first mace cell
		const cellSize = Number(this.dataset.cellSize) || D_CELL_SIZE; // cell size in pixels
		const animate = this.dataset.animate === 'true';
		const maze = generateMaze({
			width : mazeWidth,
			height: mazeHeight,
			startX, startY
		});
		if ( this.dataset.graphicType === 'raster' ) {
			renderMazeCanvas(maze, this, { cellSize, animate });
		}
		else {
			renderMazeSvg(maze, this, { cellSize, animate });
		}
	}
}