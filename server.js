const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/data', (req, res) => {
  const data = req.body;
  fs.readFile('data.json', (err, fileData) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file' });
    }
    const json = JSON.parse(fileData);
    json.push(data);
    fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing file' });
      }
      res.status(200).json({ message: 'Data saved successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


