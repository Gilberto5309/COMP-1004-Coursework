// server.js
const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to read data from the JSON file
app.get('./account.json', async (req, res) => {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to write data to the JSON file
app.post('./account.json', async (req, res) => {
    try {
        const newData = req.body;
        await fs.writeFile('./account.json', JSON.stringify(newData, null, 2), 'utf-8');
        res.send('Data written successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});