import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';
import QuestionList from './QuestionList';
import getQuestions from '../triviaApi';

function QuestionsScreen({ formData, handleApiError, setLoading }) {
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!showResults) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      loadQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);

  async function loadQuestions() {
    setLoading(true);
    let data = null;
    try {
      data = await getQuestions(formData);
    } catch (error) {
      handleApiError(error);
      setLoading(false);
      return;
    }
    setQuestions(processData(data));
    setLoading(false);
  }

  function processData(data) {
    function formatAnswers(correctAnswer, incorrectAnswers) {
      return [
        {
          id: nanoid(),
          selected: false,
          correct: true,
          answer: correctAnswer,
        },
        ...incorrectAnswers.map((incorrectAnswer) => ({
          id: nanoid(),
          selected: false,
          correct: false,
          answer: incorrectAnswer,
        })),
        // this line shuffles array elements
        // so that the correct answer is not always on the same spot
      ].sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    return data.map((item) => {
      return {
        id: nanoid(),
        title: item.question,
        answers: formatAnswers(
          item['correct_answer'],
          item['incorrect_answers']
        ),
      };
    });
  }

  function toggleSelect(questionId, answerId) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        if (prevQuestion.id === questionId) {
          return {
            ...prevQuestion,
            answers: prevQuestion.answers.map((answer) => {
              return answer.id === answerId
                ? { ...answer, selected: !answer.selected }
                : { ...answer, selected: false };
            }),
          };
        }
        return prevQuestion;
      });
    });
  }

  let correctAnswerCount = 0;
  if (showResults) {
    correctAnswerCount = questions.reduce((count, question) => {
      const correct = question.answers.find(
        (answer) => answer.selected && answer.correct
      );
      return count + (correct ? 1 : 0);
    }, 0);
  }
  const shouldDisableCheckAnswers =
    !showResults &&
    !questions.every((question) =>
      question.answers.some((answer) => answer.selected)
    );

  return (
    <>
      {showResults && correctAnswerCount === questions.length && (
        <ReactConfetti />
      )}
      <QuestionList
        questions={questions}
        toggleSelect={toggleSelect}
        showResults={showResults}
      />
      <div className="control">
        {showResults && (
          <p>
            You scored {correctAnswerCount}/{questions.length} correct answers!
          </p>
        )}
        <button
          onClick={() => setShowResults((prevShowResults) => !prevShowResults)}
          className="btn btn--primary"
          disabled={shouldDisableCheckAnswers}>
          {!showResults ? 'Check answers' : 'Play again'}
        </button>
      </div>
    </>
  );
}

export default QuestionsScreen;
