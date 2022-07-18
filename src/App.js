import { useState } from 'react';
import { nanoid } from 'nanoid';
import StartQuizScreen from './components/StartQuizScreen';
import QuestionsScreen from './components/QuestionsScreen';
import ReactLoading from 'react-loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);

  async function getNewQuestions() {
    setIsLoading(true);
    const response = await fetch('https://opentdb.com/api.php?amount=5');
    const data = await response.json();
    setQuestions(processData(data.results));
    setIsLoading(false);
  }

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

  function startGame() {
    getNewQuestions();
    setStartQuiz(true);
  }

  function restartGame() {
    setShowResults(false);
    getNewQuestions();
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#4D5B9E" />
        </div>
      )}

      {!startQuiz ? (
        <StartQuizScreen startQuiz={startGame} />
      ) : (
        <QuestionsScreen
          questions={questions}
          selectAnswer={toggleSelect}
          showResults={showResults}
          setShowResults={() => setShowResults(true)}
          restartGame={restartGame}
        />
      )}
    </>
  );
}

export default App;
