import { useState } from 'react';
import classNames from 'classnames';
import Loading from './components/Loading';
import StartQuizScreen from './components/StartQuizScreen';
import QuestionsScreen from './components/QuestionsScreen';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [formData, setFormData] = useState({
    numOfQuestions: 5,
    category: '',
    difficulty: '',
    type: '',
  });
  const [apiError, setApiError] = useState({
    show: false,
    message: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setApiError({ show: false, message: '' });
    setQuizStarted(true);
  }

  function handleApiError(error) {
    setQuizStarted(false);
    setApiError({ show: true, message: error.message });
  }

  return (
    <>
      <div className="app">
        <header className="app--header">
          <h1 className="logo" onClick={() => setQuizStarted(false)}>
            <span>Q</span>uizzical
          </h1>
        </header>
        <main className="app--main">
          {isLoading && <Loading />}
          {!quizStarted ? (
            <StartQuizScreen
              formData={formData}
              apiError={apiError}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <QuestionsScreen
              formData={formData}
              handleApiError={handleApiError}
              setLoading={setLoading}
            />
          )}
        </main>
        <footer className="app--footer">
          <p>
            &copy; 2022{' '}
            <a
              href="https://github.com/dragi-ns/quizzical"
              target="_blank"
              rel="noopener noreferrer">
              dragi-ns
            </a>
          </p>
        </footer>
      </div>
      <div
        className={classNames({
          'app--background': true,
          'app--background_questions_screen': quizStarted,
        })}></div>
    </>
  );
}

export default App;
