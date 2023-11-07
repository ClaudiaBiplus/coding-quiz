document.addEventListener('DOMContentLoaded', () => {
    const highscoresList = document.getElementById('highscores');
    const clearButton = document.getElementById('clear');
  
// Function to print highscores from localStorage
    function printHighscores() {
// Get scores from localStorage or set to empty array if none found
      const highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
// Sort the highscores by score in descending order
      highscores.sort((a, b) => b.score - a.score);
  
// Create list items for each high score and append to the highscores list
      highscores.forEach((score) => {
        const liTag = document.createElement('li');
        liTag.textContent = `${score.initials} - ${score.score}`;
        highscoresList.appendChild(liTag);
      });
    }
// Function to clear highscores from localStorage and the page
    function clearHighscores() {
      window.localStorage.removeItem('highscores');
      while (highscoresList.firstChild) {
        highscoresList.removeChild(highscoresList.firstChild);
      }
    }

// Attach event listener to the clear button
    clearButton.addEventListener('click', clearHighscores);
  
// Call printHighscores when the page loads
    printHighscores();
  });