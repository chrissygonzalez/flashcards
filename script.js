let cards = [];
let currentIndex = 0;
let showingAnswer = false;
let currentFile;

function parseMarkdown(text) {
    const blocks = text.split('---').map(b => b.trim()).filter(b => b);
    return blocks.map(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l);
        let question = '';
        let answer = '';
        let inAnswer = false;
        for (let line of lines) {
            if (line.startsWith('Question:')) {
                question = line.substring(10).trim();
                inAnswer = false;
            } else if (line.startsWith('Answer:')) {
                answer = line.substring(8).trim();
                inAnswer = true;
            } else if (inAnswer) {
                answer += '\n' + line;
            }
        }
        answer = processMarkdown(answer);
        question = processMarkdown(question);
        return { question, answer };
    });
}

function processMarkdown(text) {
    // Replace **bold** with <strong>bold</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace `code` with <code>code</code>
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // console.log('After markdown processing:', text);
    // Handle lists
    const lines = text.split('\n');
    let inList = false;
    let listType = null;
    let result = '';
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ')) {
            if (!inList || listType !== 'ul') {
                if (inList) result += '</' + listType + '>';
                result += '<ul>';
                inList = true;
                listType = 'ul';
            }
            result += '<li>' + trimmed.substring(2) + '</li>';
        } else if (/^\d+\.\s/.test(trimmed)) {
            if (!inList || listType !== 'ol') {
                if (inList) result += '</' + listType + '>';
                result += '<ol>';
                inList = true;
                listType = 'ol';
            }
            const item = trimmed.replace(/^\d+\.\s/, '');
            result += '<li>' + item + '</li>';
        } else if (trimmed === '') {
            // Skip empty lines
        } else {
            if (inList) {
                result += '</' + listType + '>';
                inList = false;
                listType = null;
            }
            result += line + '<br>';
        }
    }
    if (inList) result += '</' + listType + '>';
    // console.log('Final result:', result);
    return result;
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadCards() {
    fetch(currentFile)
        .then(response => response.text())
        .then(text => {
            // console.log('Fetched markdown:', text.substring(0, 100));
            cards = parseMarkdown(text);
            // console.log('Parsed cards:', cards);
            shuffleCards(cards);
            currentIndex = 0;
            showingAnswer = false;
            displayCard();
            updateButtons();
        })
        .catch(error => {
            // console.error('Error loading flashcards:', error);
            document.getElementById('card-content').innerHTML = 'Error loading flashcards.';
        });
}

function updateCounter() {
    const total = cards.length;
    const current = cards.length > 0 ? currentIndex + 1 : 0;
    document.getElementById('counter').textContent = `${current}/${total}`;
}

function displayCard() {
    if (cards.length === 0) {
        document.getElementById('card-content').textContent = 'No flashcards available.';
        updateCounter();
        return;
    }

    const isAnswer = showingAnswer;
    const content = isAnswer ? cards[currentIndex].answer : cards[currentIndex].question;
    const contentDiv = document.getElementById('card-content');
    contentDiv.innerHTML = content;

    // if showing answer and there is no list (<ul> or <ol>), add no-list class
    const hasList = /<\/?(ul|ol)>/.test(content);
    contentDiv.className = isAnswer ? (hasList ? 'answer' : 'answer no-list') : 'question';

    updateCounter();
}

function updateButtons() {
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === cards.length - 1;
}

const select = document.querySelector('select');
currentFile = select.value;
select.addEventListener('change', (e) => {
    currentFile = e.target.value;
    loadCards();
})

document.getElementById('flashcard').addEventListener('click', () => {
    if (cards.length === 0) return;
    showingAnswer = !showingAnswer;
    displayCard();
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        showingAnswer = false;
        displayCard();
        updateButtons();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showingAnswer = false;
        displayCard();
        updateButtons();
    }
});

loadCards();