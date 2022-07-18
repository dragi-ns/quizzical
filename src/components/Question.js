import sanitizeHtml from 'sanitize-html';

function Question({ title, answers }) {
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
              className="question--answer"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(answer) }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
