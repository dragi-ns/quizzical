import classNames from 'classnames';
import Question from './Question';

function QuestionsScreen({
  questions,
  selectAnswer,
  showResults,
  setShowResults,
  startGame,
}) {
  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        title={question.title}
        answers={question.answers}
        selectAnswer={selectAnswer}
        showResults={showResults}
      />
    );
  });

  const correctAnswersCount = questions.reduce((count, question) => {
    const correct = question.answers.find(
      (answer) => answer.correct && answer.selected
    );
    return count + (correct ? 1 : 0);
  }, 0);

  return (
    <div className="qs">
      <div
        className={classNames({
          questions: true,
          'questions--results': showResults,
        })}
      >
        {questionElements}
      </div>
      {!showResults ? (
        <button onClick={setShowResults} className="qs--button">
          Check answers
        </button>
      ) : (
        <div className="qs--results">
          <p>
            You scored {correctAnswersCount}/{questions.length} correct answers
          </p>
          <button onClick={startGame} className="qs--button">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionsScreen;
