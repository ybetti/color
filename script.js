document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = function() {
        const data = reader.result;
        const lines = data.split('\n');
        
        // Assuming first row contains headers
        const headers = lines[0].split(',');
        const colorMap = document.getElementById('colorMap');
        colorMap.innerHTML = '';

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        for (let i = 1; i < lines.length; i++) {
            const rowData = lines[i].split(',');
            const row = document.createElement('tr');
            rowData.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                row.appendChild(td);
            });
            table.appendChild(row);
        }

        colorMap.appendChild(table);
    };
});
