(function (w) {
    var matrixWidthInput = document.getElementById('matrix-width');
    var matrixHeightInput = document.getElementById('matrix-height');
    var matrixOutput = document.getElementById('matrix');
    var domensOutput = document.getElementById('domens');

    function buildMatrix() {
        var width = matrixWidthInput.value;
        var height = matrixHeightInput.value;
        var matrix = _getArray(width, height);
        _printMatrix(matrix);

        var matrixElems = document.getElementsByClassName('matrix__elem');

        for (var i in matrixElems) {
            var elem = matrixElems[i];
            elem.onclick = switchValue;
        }
    }

    function _getArray(width, height) {
        var matrix = [];
        for (var i = 0; i < width; i++) {
            var line = [];
            for (var j = 0; j < height; j++) {
                line.push(Math.round(Math.random() - .35));
            }
            matrix.push(line);
        }
        return matrix;
    }

    function _printMatrix(array) {
        var matrixString = array.reduce(function (akk, line) {
            akk.push('<div class="matrix__line">', line.map(function (val) {
                return ['<div class="matrix__elem">', val, '</div>'].join('');
            }).join(''), '</div>');

            return akk;
        }, []).join('');
        matrixOutput.innerHTML = matrixString;
    }

    function findDomens() {
        var matrix = _getMatrix();
        var domens = _getDomens(matrix);
        _printDomens(domens);
    }

    function _printDomens(domens) {
        var resultString = '';
        var resultString = domens.map(function (domen) {
            return '{' + domen.map(function (point) {
                return '(' + point.x + ', ' + point.y + ')';
            })
                .join(',') + '}';
        })
            .join('<br/>');
        domensOutput.innerHTML = resultString;
    }

    function deepIncludes(item, arr) {
        return !!arr.find(function (elem) {
            return elem.x === item.x && elem.y === item.y;
        });
    }

    function _getMatrix() {
        var matrix = [];
        var lines = document.getElementsByClassName('matrix__line');
        for(var i  = 0; i < lines.length; i++) {
            var elems = lines[i].getElementsByClassName('matrix__elem');
            for(var j = 0; j < elems.length; j++) {
                var value = Number(elems[j].innerHTML);
                if(!matrix[i]) {
                    matrix[i] = [];
                }
                matrix[i].push(value);
            }
        }
        return matrix;
    }

    function _getDomens(matrix) {
        var points = getPoints(matrix);
        var checked = [];
        var domens = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            if (deepIncludes(point, checked)) {
                continue;
            }

            var domen = [point];
            var neighbours = getNeighbours(point, points);

            checked.push(point);
            for (var j = 0; j < neighbours.length; j++) {
                var neigh = neighbours[j];
                if (deepIncludes(neigh, checked)) {
                    continue;
                }
                var curNeighbours = getNeighbours(neigh, points);
                neighbours = neighbours.concat(curNeighbours);
                checked.push(neigh);
                domen.push(neigh);
            }
            domens.push(domen);
        }

        return domens;
    }

    function getPoints(matrix) {
        var points = [];
        matrix.forEach(function (elem, i) {
            elem.forEach(function (value, j) {
                if (!value) {
                    return
                }
                points.push({
                    x: j,
                    y: i
                });
            });
        });

        return points;
    }

    function getNeighbours(point, points) {
        var neighbours = [
            getPoint(point.x, point.y - 1),
            getPoint(point.x - 1, point.y),
            getPoint(point.x, point.y + 1),
            getPoint(point.x + 1, point.y)
        ];

        return neighbours.reduce(function (result, point) {
            if (deepIncludes(point, points)) {
                result.push(point);
            }
            return result;
        }, []);
    }

    function getPoint(x, y) {
        return { x: x, y: y };
    }

    function switchValue(e) {
        var value = Number(this.innerHTML);
        this.innerHTML = Number(!value);
    }

    w.buildMatrix = buildMatrix;
    w.findDomens = findDomens;
})(window);
