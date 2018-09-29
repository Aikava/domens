(function(w) {
    console.log("window = ", w);
    var matrixWidthInput = document.getElementById('matrix-width');
    var matrixHeightInput = document.getElementById('matrix-height');
    var matrixOutput = document.getElementById('matrix');
    var domensOutput = document.getElementById('domens');

    function buildMatrix() {
        var width = matrixWidthInput.value;
        var height = matrixHeightInput.value;
        matrixWidthInput.value = '';
        matrixHeightInput.value = '';
        var matrix = _getArray(width, height);
        _printMatrix(matrix);
    }

    function _getArray(width, height) {
      var matrix = [];
      for(var i = 0; i < width; i++) {
        var line = [];
        for(var j = 0; j < height; j++) {
          line.push(Math.round(Math.random() - .33));
        }
        matrix.push(line);
      }
        return matrix;
    }

    function _printMatrix(array) {
        var matrixString = array.reduce(function(akk, line) {
            akk.push(line.join('&nbsp;'));
            return akk;
        }, []).join('<br/>');
        matrixOutput.innerHTML = matrixString;
    }

    function findDomens() {
      var domens = _getDomens();
      _printDomens(domens);
    }

    function _printDomens(domens) {
      domensOutput.innerHTML = domens.map(function (point){
        return ['{x:', point.x, ', y: ', point.y, '}'].join('');
      }).join('');
    }

    function _getDomens() {
      var matrix = _getMatrix();
      var domens = {};

      for(var i in matrix) {
        for(var j in matrix[i]) {
          var value = matrix[i][j];
          var key = j + '-' + i;
          if(value === 1) {
            domens[key] = true;
          }
        }
      }

      var resultDomens = {};
      for(var key in domens) {
        delete domens[key];
      }
      return domens;
    }

    function _hasBackNeighbours(key, domens) {
      var keys = key.split('-').map(Number);
      var neighbours = [];
      var point = { x: keys[0], y: keys[1]};
      var leftKey = point.x + '-' + keys[1] - 1;
      if(Boolean(domens[leftKey])) {
        neighbours.push(leftKey);
        delete domens[leftKey];
      }

      if(Boolean(domens[upKey])) {
        neighbours.push(upKey);
        delete domens[upKey];
      }
      return neighbours;
    }

    function _getMatrix() {
      var matrixString = matrixOutput.innerHTML;
      var lines = matrixString.split('<br>');
      var matrix = lines.map(function (line){
        return line.split('&nbsp;').map(Number);
      });
      return matrix;
    }

    w.buildMatrix = buildMatrix;
    w.findDomens = findDomens;
})(window);
