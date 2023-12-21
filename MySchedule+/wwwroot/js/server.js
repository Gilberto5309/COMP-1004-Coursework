const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/json/account.json', (req, res) => {
    const updatedData = req.body;

    // Write the updated data back to the JSON file
    fs.writeFileSync('/json/account.json', JSON.stringify(updatedData, null, 2), 'utf8');

    res.json({ success: true, message: 'Data saved successfully!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});