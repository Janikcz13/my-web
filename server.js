const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fix for "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.post('/submit', (req, res) => {
    const textData = req.body.text + "\n---\n";

    fs.appendFile(__dirname + '/submissions.txt', textData, (err) => {
        if (err) {
            console.error('Error saving submission:', err);
            return res.status(500).json({ message: 'Error saving submission' });
        }
        res.json({ message: 'Submission saved!' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
