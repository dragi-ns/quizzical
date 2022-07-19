import classNames from 'classnames';
import Question from './Question';

function QuestionList({ questions, toggleSelect, showResults }) {
  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        {...question}
        toggleSelect={toggleSelect}
        showResults={showResults}
      />
    );
  });
  return (
    <div
      className={classNames({
        questions: true,
        'questions--results': showResults,
      })}>
      {questionElements}
    </div>
  );
}

export default QuestionList;
