const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('../frontend/build'));
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

app.get('/ping', (req, res) => res.send('pong'));

app.get('/', (req, res) => {
    res.sendFile('../frontend/build/index.html');
});

app.listen(port, () => (
    console.log(`Listening on port ${port}`)
));
