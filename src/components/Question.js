import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html';

function Question({ id, title, answers, toggleSelect, showResults }) {
  const answerElements = answers.map((answer) => {
    return (
      <button
        key={answer.id}
        className={classNames({
          btn: true,
          'btn--small': true,
          'question--answer': true,
          'question--answer_selected': !showResults && answer.selected,
          'question--answer_correct': showResults && answer.correct,
          'question--answer_incorrect':
            showResults && answer.selected && !answer.correct,
        })}
        {...(!showResults && { onClick: () => toggleSelect(id, answer.id) })}>
        {sanitizeHtml(answer.answer)}
      </button>
    );
  });

  return (
    <div className="question">
      <p className="question--title">{sanitizeHtml(title)}</p>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}

export default Question;
