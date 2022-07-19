export const ResponseCode = Object.freeze({
  SUCCESS: 0,
  NO_RESULTS: 1,
  INVALID_PARAMETER: 2,
  TOKEN_NOT_FOUND: 3,
  TOKEN_EMPTY: 4,
});

async function getQuestions({
  amount = 5,
  categoryId = '',
  difficulty = '',
  type = '',
}) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`
  );
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const data = await response.json();
  if (data.response_code !== ResponseCode.SUCCESS) {
    throw new Error('OpenTDB API response was not OK');
  }

  return data.results;
}

export default getQuestions;
