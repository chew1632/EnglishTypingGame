// all of our quotes
const quotes = [
    'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    'The way to get started is to quit talking and begin doing.',
    'If life were predictable it would cease to be life, and be without flavor.',
    'Always remember that you are absolutely unique. Just like everyone else.',
    'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    'Life is what happens when you\'re busy making other plans.',
    'If you set your goals ridiculously high and it\'s a failure, you will fail above everyone else\'s success.',
    'Hi, I\'m Christopher. Little project of mine'
];
// store the list of words and the index of the word the player is currently typing.
let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// Button start clicked
document.getElementById('start').addEventListener('click', () => {
    // Hide button, show textField
    $('.inputField').show();
    $('.startBtn').hide();
    // Randomly getting a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // insert word 
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    // UI updated
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function (word) { return `<span>${word} </span>` });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Clear the inputField
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler

    // Start the timer
    startTime = new Date().getTime();
});

// Listener when user typing
typedValueElement.addEventListener('input', () => {
    // Current word
    const currentWord = words[wordIndex];
    // Current value
    const typedValue = typedValueElement.value;

    // Typed END
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // Show success
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of the word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error - red color
        typedValueElement.className = 'error';
    }
});