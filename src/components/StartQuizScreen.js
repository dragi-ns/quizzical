import questionCategories from '../data/questionCategories.json';

function StartQuizScreen({ formData, apiError, handleChange, handleSubmit }) {
  const categoryOptions = questionCategories.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    <>
      <h1 className="logo">
        <span>Q</span>uizzical
      </h1>
      <p className="description">
        Answer fun questions and test your knowledge in this trivia quiz.
      </p>
      {apiError.show && <p className="api-error">{apiError.message}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Number of questions</label>
          <div className="counter-container">
            <button
              type="button"
              className="btn btn--small"
              {...(formData.numOfQuestions <= 5 && { disabled: true })}
              onClick={() =>
                handleChange({
                  target: {
                    name: 'numOfQuestions',
                    value: formData.numOfQuestions - 1,
                  },
                })
              }>
              -
            </button>
            <span className="counter-value">{formData.numOfQuestions}</span>
            <button
              type="button"
              className="btn btn--small"
              {...(formData.numOfQuestions >= 15 && { disabled: true })}
              onClick={() =>
                handleChange({
                  target: {
                    name: 'numOfQuestions',
                    value: formData.numOfQuestions + 1,
                  },
                })
              }>
              +
            </button>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}>
            <option value="">Any Category</option>
            {categoryOptions}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={formData.difficulty}
            onChange={handleChange}>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}>
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <button className="btn btn--big btn--primary">Start quiz</button>
      </form>
    </>
  );
}

export default StartQuizScreen;
