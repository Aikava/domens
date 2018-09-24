(function(w) {
    console.log("window = ", w);
    var matrixWidthInput = document.getElementById('matrix-width');
    var matrixHeightInput = document.getElementById('matrix-height');
    var matrixOutput = document.getElementById('matrix');

    function buildMatrix() {
        var width = matrixWidthInput.value;
        var height = matrixHeightInput.value;
        var matrix = _getArray(width, height);
        _printMatrix(matrix);
    }

    function _getArray(width, height) {
        return [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [1, 0, 1, 0]]
    }

    function _printMatrix(array) {
        var matrixString = array.reduce(function(akk, line) {
            akk.push(line.join('&nbsp;'));
            return akk;
        }, []).join('<br/>');
        matrixOutput.innerHTML = matrixString;
    }

    w.buildMatrix = buildMatrix;
})(window);
