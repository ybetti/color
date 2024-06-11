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
        drawColorMap(data);
    };
    reader.readAsText(file);
});

function parseCSV(text) {
    const rows = text.split('\n');
    return rows.map(row => row.split(',').map(Number));
}

function drawColorMap(data) {
    const canvas = document.getElementById('colorMapCanvas');
    const ctx = canvas.getContext('2d');
    const rows = data.length;
    const cols = data[0].length;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const value = data[i][j];
            const color = getColor(value);
            ctx.fillStyle = color;
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }
}

function getColor(value) {
    // 値に基づいて色を決定
    const min = 0; // 最小値（適宜調整）
    const max = 100; // 最大値（適宜調整）
    const ratio = (value - min) / (max - min);
    const red = Math.floor(255 * ratio);
    const blue = 255 - red;
    return `rgb(${red}, 0, ${blue})`;
}
