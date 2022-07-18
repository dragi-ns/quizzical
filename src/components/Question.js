import sanitizeHtml from 'sanitize-html';

function Question({ id, title, answers, selectAnswer }) {
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
              className={
                'question--answer' + (answer.selected ? ' selected' : '')
              }
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(answer.answer) }}
              onClick={() => selectAnswer(id, answer.id)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
