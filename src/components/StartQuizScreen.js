function StartQuizScreen({ startQuiz }) {
  return (
    <section className="sqs">
      <h1 className="sqs--title">Quizzical</h1>
      <p className="sqs--description">
        Answer fun questions and test your knowledge in this trivia quiz.
      </p>
      <button className="sqs--button" onClick={startQuiz}>
        Start quiz
      </button>
    </section>
  );
}

export default StartQuizScreen;
