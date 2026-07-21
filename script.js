async function fetchWordDetails() {
    const word = document.getElementById('wordInput').ariaValueMax.trim();
    if (!word) {
        alert("enter a word");
        return;

    }
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Loading...";
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || data.title === "No Word Found") {
            resultDiv.innerHTML = "No result found. Try another word.";
            return;

        }
        const definition = data[0].meanings[0].definitions[0].definition;
        const example = data[0].meanings[0].definitions[0].example || "No example available.";
        const synonyms = data[0].meanings[0].definitions[0].synonyms.join(", ") || "No synonyms available.";

        resultDiv.innerHTML = `<strong>Definition:</strong> ${definition}<br>
                              <strong>Example:</strong> ${example}<br> 
                              <strong>Synonyms:</strong> ${synonyms}`;
    } 
    catch (error) {
        resultDiv.innerHTML = "error fetching data. try again later.";
    }
}