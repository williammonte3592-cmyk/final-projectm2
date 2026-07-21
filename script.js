async function fetchWordDetails() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) {
    alert("Please enter a word");
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.title === "No Definitions Found") {
      resultDiv.innerHTML = "No definition found. Try another word.";
      return;
    }

    const definition = data[0].meanings[0].definitions[0].definition;
    
    const synonyms =data[0].meanings[0].synonyms.join(", ") || "No synonyms available.";

    resultDiv.innerHTML = `<strong>Definition:</strong> ${definition}<br>
                    <strong>Synonyms:</strong> ${synonyms}`;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data. Please try again later.";
  }
}
