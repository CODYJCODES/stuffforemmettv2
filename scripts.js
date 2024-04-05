// scripts.js

const suggestionForm = document.getElementById('suggestionForm');
const suggestionList = document.getElementById('suggestionList');
const toggleButton = document.getElementById('toggleButton');
const suggestionsDiv = document.getElementById('suggestions');
let suggestions = [];
let showingSuggestions = false;

// Function to render suggestions
function renderSuggestions() {
  suggestionList.innerHTML = suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
}

// Event listener for form submission
suggestionForm.addEventListener('submit', event => {
  event.preventDefault();
  const suggestionInput = document.getElementById('suggestion');
  const suggestion = suggestionInput.value.trim();
  if (suggestion !== '') {
    suggestions.push(suggestion);
    suggestionInput.value = '';
    if (showingSuggestions) {
      renderSuggestions();
    }
  } else {
    alert('Please enter a suggestion');
  }
});

// Event listener for toggle button
toggleButton.addEventListener('click', () => {
  showingSuggestions = !showingSuggestions;
  if (showingSuggestions) {
    renderSuggestions();
    suggestionsDiv.style.display = 'block';
    toggleButton.textContent = 'Hide Previous Suggestions';
  } else {
    suggestionsDiv.style.display = 'none';
    toggleButton.textContent = 'Show Previous Suggestions';
  }
});
