import classNames from 'classnames';
import Question from './Question';

function QuestionsScreen({
  questions,
  selectAnswer,
  showResults,
  setShowResults,
  restartGame,
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

  let correctAnswerCount = 0;
  if (showResults) {
    correctAnswerCount = questions.reduce((count, question) => {
      const correct = question.answers.find(
        (answer) => answer.selected && answer.correct
      );
      return count + (correct ? 1 : 0);
    }, 0);
  }

  return (
    <div
      className={classNames({
        qs: true,
        'qs--results': showResults,
      })}>
      <div className="questions">{questionElements}</div>
      {showResults && (
        <p className="qs--results_notification">
          You scored {correctAnswerCount}/{questions.length} correct answers!
        </p>
      )}
      <button
        onClick={!showResults ? setShowResults : restartGame}
        className="btn btn--primary qs--button">
        {!showResults ? 'Check answers' : 'Play again'}
      </button>
    </div>
  );
}

export default QuestionsScreen;
