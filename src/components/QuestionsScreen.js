import Question from './Question';

function QuestionsScreen({ questions }) {
  return (
    <div className="qs">
      <div className="questions">
        {questions.map((question) => (
          <Question title={question.title} answers={question.answers} />
        ))}
      </div>
      <button className="qs--button">Check answers</button>
    </div>
  );
}

export default QuestionsScreen;
