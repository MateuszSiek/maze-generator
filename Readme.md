# Maze generator
Simple custom html component which generate maze image either as a vector graphics with svg or raster graphic with canvas.

## Usage
Copy `maze-generator.min.js` file from `dist` directory and include it in your `index.html` file.
```html
<script src="maze-generator.min.js"></script>
```
and then include custom component in your html template.
```html
<maze-generator></maze-generator>
```

### Different use cases:

* Default maze 
```html
<maze-generator></maze-generator>
```

* Custom number of cells
```html
<maze-generator data-x-count="20" data-y-count="30"></maze-generator>
```

* Custom cell size in px
```html
<maze-generator data-cell-size="40"></maze-generator>
```

* Animate rendering
```html
<maze-generator data-animate="true"></maze-generator>
```

* Render maze as raster graphics with canvas, speeds up rendering of large mazes.
```html
<maze-generator data-graphic-type="raster"></maze-generator>
```



## Development setup
Before developement remember to install all dependencies
```
npm install
```
Project source code can be find in `src` directory.

Available npm scripts: 
* `build`       - build project and saves output to `dist/maze-generator.js`
* `build:w`     - same as `build` but in watch mode so on each file change build will re-run
* `build:prod`  - build production version and saves it to `dist/maze-generator.min.js`
* `test`        - run tests


## Meta
[Mateusz Siek](http://msiek.com/) - [contact@msiek.com](mailto:contact@msiek.com)

https://github.com/MateuszSiek/maze-generator

Distributed under the MIT license

Copyright (c) 2017 Mateusz Siek
