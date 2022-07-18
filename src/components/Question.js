import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html';

function Question({ id, title, answers, selectAnswer, showResults }) {
  return (
    <div className="question">
      <p
        className="question--title"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(title),
        }}
      ></p>
      <div className="question--answers">
        {answers.map((answer) => {
          return (
            <button
              key={answer.id}
              className={classNames({
                'question--answer': true,
                selected: answer.selected,
                wrong: showResults && answer.selected && !answer.correct,
                correct: showResults && answer.correct,
              })}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(answer.answer) }}
              {...(!showResults && {
                onClick: () => selectAnswer(id, answer.id),
              })}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
