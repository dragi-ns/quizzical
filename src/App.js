import { useState } from 'react';
import StartQuizScreen from './components/StartQuizScreen';
import QuestionsScreen from './components/QuestionsScreen';
import data from './data.json';
import { nanoid } from 'nanoid';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState(processData(data.results));

  function processData(data) {
    function formatAnswers(correctAnswer, incorrectAnswers) {
      return [
        {
          id: nanoid(),
          selected: false,
          correct: true,
          answer: correctAnswer,
        },
        ...incorrectAnswers.map((incorrectAnswer) => ({
          id: nanoid(),
          selected: false,
          correct: false,
          answer: incorrectAnswer,
        })),
        // this line shuffles array elements
        // so that the correct answer is not always on the same spot
      ].sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    return data.map((item) => {
      return {
        id: nanoid(),
        title: item.question,
        answers: formatAnswers(
          item['correct_answer'],
          item['incorrect_answers']
        ),
      };
    });
  }

  function toggleSelect(questionId, answerId) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        if (prevQuestion.id === questionId) {
          return {
            ...prevQuestion,
            answers: prevQuestion.answers.map((answer) => {
              return answer.id === answerId
                ? { ...answer, selected: !answer.selected }
                : { ...answer, selected: false };
            }),
          };
        }
        return prevQuestion;
      });
    });
  }

  return (
    <div className="app">
      {!startQuiz ? (
        <StartQuizScreen startQuiz={() => setStartQuiz(true)} />
      ) : (
        <QuestionsScreen questions={questions} selectAnswer={toggleSelect} />
      )}
    </div>
  );
}

export default App;
