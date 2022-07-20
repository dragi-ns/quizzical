export const ResponseCode = Object.freeze({
  SUCCESS: 0,
  NO_RESULTS: 1,
  INVALID_PARAMETER: 2,
  TOKEN_NOT_FOUND: 3,
  TOKEN_EMPTY: 4,
});

async function getQuestions({
  numOfQuestions = 5,
  category = '',
  difficulty = '',
  type = '',
}) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
  );
  if (!response.ok) {
    throw new Error(
      'An error occurred while trying to get trivia questions. Please try again later.'
    );
  }

  const data = await response.json();
  if (data.response_code === ResponseCode.NO_RESULTS) {
    throw new Error(
      'There are currenlty no results with the given opitons. Please try again with different options.'
    );
  }

  if (data.response_code !== ResponseCode.SUCCESS) {
    throw new Error(
      'An error occurred while trying to get trivia questions. Please try again later.'
    );
  }

  return data.results;
}

export default getQuestions;
