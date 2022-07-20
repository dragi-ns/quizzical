import { useState } from 'react';
import classNames from 'classnames';
import Loading from './components/Loading';
import StartQuizScreen from './components/StartQuizScreen';
import QuestionsScreen from './components/QuestionsScreen';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

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
            <StartQuizScreen startQuiz={() => setQuizStarted(true)} />
          ) : (
            <QuestionsScreen setLoading={setLoading} />
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
