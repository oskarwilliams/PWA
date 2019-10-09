const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());

const questions = [
    'What\'s your name?',
    'How old are you? (Please enter a number, we don\'t do any validation)',
    'Stuff & Things',
    'Test',
];

app.get('/questions', (req, res) => {
    res.send(questions);
});

app.post('/answers', (req, res) => {
    console.log(req.body);
    res.send();
});

app.listen(port, () => (
    console.log(`Listening on port ${port}`)
));
