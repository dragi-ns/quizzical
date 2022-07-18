import Question from './Question';

function QuestionsScreen({ questions, selectAnswer }) {
  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        title={question.title}
        answers={question.answers}
        selectAnswer={selectAnswer}
      />
    );
  });

  return (
    <div className="qs">
      <div className="questions">{questionElements}</div>
      <button className="qs--button">Check answers</button>
    </div>
  );
}

export default QuestionsScreen;
