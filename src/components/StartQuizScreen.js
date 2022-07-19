function StartQuizScreen({ startQuiz }) {
  return (
    <>
      <h1 className="logo">
        <span>Q</span>uizzical
      </h1>
      <p className="description">
        Answer fun questions and test your knowledge in this trivia quiz.
      </p>
      <button className="btn btn--big btn--primary" onClick={startQuiz}>
        Start quiz
      </button>
    </>
  );
}

export default StartQuizScreen;
