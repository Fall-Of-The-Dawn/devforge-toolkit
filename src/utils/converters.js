// Convert JSON array to CSV string
export const convertToCSV = (data) => {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
};

// Convert JSON array to SQL Insert Statements
export const convertToSQL = (data, tableName = 'mock_table') => {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const columns = headers.join(', ');

  const sqlRows = data.map(row => {
    const values = headers.map(header => {
      const val = row[header];
      return typeof val === 'number' ? val : `'${String(val).replace(/'/g, "''")}'`;
    });
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values.join(', ')});`;
  });

  return sqlRows.join('\n');
};
