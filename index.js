const express = require("express");
const app = express();
app.use(express.json());

let questionnaires = [];

// create a questionnaire
app.post("/questionnaire", (req, res) => {
  const questionnaireId = Object.keys(questionnaires).length + 1;
  const data = req.body;
  questionnaires[questionnaireId] = {
    questions: data.questions || [],
    adminAns: data.adminAns || [],
    userAns: [],
  };
  res.status(201).json({
    message: "Questionnaire created successfully",
    id: questionnaireId,
  });
});

// User Submit answers to questions
app.post("/questionnaire/:questionnaireId/answers", (req, res) => {
  const questionnaireId = parseInt(req.params.questionnaireId);
  const data = req.body;
  questionnaires[questionnaireId].userAns.push(data.ans);
  res.status(200).json({ message: "Answers submitted successfully" });
});

// Retrieve questions for a questionnaire with pagination
app.get("/questionnaire/:questionnaireId/questions", (req, res) => {
  const questionnaireId = parseInt(req.params.questionnaireId);
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const questionnaire = questionnaires[questionnaireId];
  if (questionnaire) {
    const questions = questionnaire.questions;
    // console.log(questions);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    res.json(questions.slice(start, end));
  } else {
    res.status(404).json({ message: "Questionnaire not found" });
  }
});

// Retrieve users answers for a questionnaire
app.get("/questionnaire/:questionnaireId/answers", (req, res) => {
  const questionnaireId = parseInt(req.params.questionnaireId);
  if (questionnaires[questionnaireId]) {
    const answers = questionnaires[questionnaireId].userAns;
    res.status(200).json({ answers });
  } else {
    res.status(404).json({ message: "Questionnaire not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
