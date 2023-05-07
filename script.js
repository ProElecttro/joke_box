const currentMessage = document.getElementById('current-message-section');
const savedMessageList = document.getElementById('saved-message-list');
const clearAllBtn = document.getElementById('clear-all-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

let jokeTimer;
let savedMessages = [];

// fetches a random joke from the API and displays it in the "Current Message" section
function displayJoke() {
  const audio = new Audio('sound.mp3');
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
      currentMessage.innerHTML = `${data.setup} <br> ${data.punchline}`;
      savedMessages.push(data);
      audio.play();
      displaySavedMessages();
    });
}

// displays the most recent saved joke in the "Current Message" section
function displayLastSavedJoke() {
  if (savedMessages.length > 0) {
    const lastSavedJoke = savedMessages[0];
    currentMessage.innerHTML = `${lastSavedJoke.setup} <br> ${lastSavedJoke.punchline}`;
  }
}

function displaySavedMessages() {
  savedMessageList.innerHTML = '';
  savedMessages.forEach((joke, index) => {
    const jokeItem = document.createElement('li');
    jokeItem.innerHTML = `<button class="delete-btn" data-index="${index}">Delete</button>  ${joke.setup} ${joke.punchline}`;
    jokeItem.setAttribute('data-index', index);
    savedMessageList.appendChild(jokeItem);
  });
  setupDeleteButtons();
}

function deleteSavedMessage(index) {
  savedMessages.splice(index, 1);
  displaySavedMessages();
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.parentNode.getAttribute('data-index'));
      deleteSavedMessage(index);
    });
  });
}


// clears all saved jokes and the "Saved Messages" section
function clearAllSavedMessages() {
  savedMessages = [];
  displaySavedMessages();
}


// starts the joke timer to fetch and display new jokes every 10 seconds
function startJokeTimer() {
  currentMessage.innerHTML = 'Fetching new jokes, wait for few seconds';
  jokeTimer = setInterval(() => {
    displayJoke();
  }, 13000);
}

// stops the joke timer and displays the most recent saved joke in the "Current Message" section
function stopJokeTimer() {
  clearInterval(jokeTimer);
  displayLastSavedJoke();
}

// sets up the event listeners for the buttons
function setupButtons() {
  clearAllBtn.addEventListener('click', clearAllSavedMessages);
  startBtn.addEventListener('click', startJokeTimer);
  stopBtn.addEventListener('click', stopJokeTimer);
}

// initializes the page by displaying the "Current Message" section and setting up the buttons and saved messages
function initiate() {
  currentMessage.innerHTML = 'Press "Accept Notifications" to begin';
  setupButtons();
  displaySavedMessages();
}

initiate();