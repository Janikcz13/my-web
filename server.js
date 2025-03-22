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

// Endpoint to handle form submissions
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

// ✅ New route to view submissions
app.get('/submissions', (req, res) => {
    fs.readFile(__dirname + '/submissions.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading submissions' });
        }
        res.send(`<pre>${data}</pre>`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
