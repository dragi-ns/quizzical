import { useState } from 'react';
import StartQuizScreen from './components/StartQuizScreen';
import QuestionsScreen from './components/QuestionsScreen';
import data from './data.json';

function App() {
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [questions, setQuestions] = useState(processData(data.results));

  function processData(data) {
    return data.map((item) => {
      return {
        title: item.question,
        answers: [item['correct_answer'], ...item['incorrect_answers']].sort(
          () => (Math.random() > 0.5 ? 1 : -1)
        ),
        selected: false,
      };
    });
  }

  return (
    <div className="app">
      {!startedQuiz ? (
        <StartQuizScreen startQuiz={() => setStartedQuiz(true)} />
      ) : (
        <QuestionsScreen questions={questions} />
      )}
    </div>
  );
}

export default App;
