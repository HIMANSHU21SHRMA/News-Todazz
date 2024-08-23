apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}`
const country = countrySelect.value;
const language = languageSelect.value;

const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&apiKey=${apiKey}`;
