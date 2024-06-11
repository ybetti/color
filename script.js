document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('CSVファイルを選択してください。');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const data = parseCSV(text);
        const minMax = findMinMax(data);
        document.getElementById('minValue').textContent = `最小値: ${minMax.min}`;
        document.getElementById('maxValue').textContent = `最大値: ${minMax.max}`;
        drawColorMap(data, minMax.min, minMax.max);
    };
    reader.readAsText(file);
});

function parseCSV(text) {
    const rows = text.split('\n');
    return rows.map(row => row.split(',').map(cell => cell.trim() === '' ? null : Number(cell.trim())));
}

function findMinMax(data) {
    let min = Infinity;
    let max = -Infinity;
    data.forEach(row => {
        row.forEach(cell => {
            if (cell !== null) {
                if (cell < min) min = cell;
                if (cell > max) max = cell;
            }
        });
    });
    return { min, max };
}

function drawColorMap(data, min, max) {
    const canvas = document.getElementById('colorMapCanvas');
    const ctx = canvas.getContext('2d');
    const rows = data.length;
    const cols = data[0].length;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const value = data[i][j];
            if (value === null) {
                ctx.fillStyle = 'white';
            } else {
                ctx.fillStyle = getColor(value, min, max);
            }
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }
}

function getColor(value, min, max) {
    const ratio = (value - min) / (max - min);
    const red = Math.floor(255 * ratio);
    const blue = 255 - red;
    return `rgb(${red}, 0, ${blue})`;
}
