const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse incoming JSON requests from React
app.use(bodyParser.json());

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API route to run Python script
app.post('/run-python', (req, res) => {
    const { weight, height_ft, height_in, age, gender, activity_level, weight_loss_goal } = req.body;

    // Python command with inputs
    const pythonCommand = `python main.py ${weight} ${height_ft} ${height_in} ${age} ${gender} ${activity_level} ${weight_loss_goal}`;
    exec(pythonCommand, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (stderr) {
            return res.status(500).json({ error: stderr });
        }

        // Return Python output to React frontend
        res.json({ output: stdout });
    });
});

// Serve React build files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
