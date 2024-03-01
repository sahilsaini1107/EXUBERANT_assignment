const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

let questionnaires = {};
let questionIdCounter = 1;

// Create a questionnaire
app.post('/questionnaire', (req, res) => {
    const data = req.body;
    // const questionnaireId = Object.keys(questionnaires).length + 1;
    questionnaires.push(data);
    res.status(201).json({ message: 'Questionnaire created successfully', id: questionnaireId });
});

// Retrieve questions for a questionnaire with pagination
app.get('/questionnaire/:questionnaireId/questions', (req, res) => {
    const questionnaireId = parseInt(req.params.questionnaireId);
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const questionnaire = questionnaires[questionnaireId];
    if (questionnaire) {
        const questions = questionnaire.questions;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        res.json(questions.slice(start, end));
    } else {
        res.status(404).json({ message: 'Questionnaire not found' });
    }
});

// Submit answers to questions
app.post('/questionnaire/:questionnaireId/answers', (req, res) => {
    const questionnaireId = parseInt(req.params.questionnaireId);
    const data = req.body;
    const answers = data.answers;
    res.status(200).json({ message: 'Answers submitted successfully' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
