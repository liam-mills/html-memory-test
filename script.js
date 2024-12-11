const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const timerContainer = document.querySelector('#timer-container');
const timer = document.querySelector('#timer');
const instructions = document.querySelector('#instructions');
const form = document.querySelector('#form');
const results = document.querySelector('#results');
const score = document.querySelector('#score');
const htmlList = ['doctype','a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1to h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','menu','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','search','section','select','small','source','span','strike','strong','style','sub','summary','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr'];
let guesses = [];
let timerIsRunning = false;

const evaluateScore = () => {
    let scoreTally = 0;
    form.style.display = 'none';

    // Remove duplicate entries.
    filteredGuesses = [...new Set(guesses)];
    filteredGuesses.forEach(guess => {
        if (htmlList.includes(guess)) {
            scoreTally++;
        }
    });
    results.style.display = 'block';
    score.innerHTML = scoreTally;
}

const startTimer = () => {
    // Hide instructions.
    instructions.style.display = 'none';
    timerContainer.style.display = 'block';

    let currentTime = 5;
    // Update timer every minute.
    setInterval(function() {
        currentTime--;
        timer.innerHTML = currentTime;

        // Evaluate final score.
        if (currentTime <= 0) {
            evaluateScore();
        }
    }, 60000);
}

const processValue = () => {
    let value = input.value.trim().toLowerCase();
    value = value.replace('<', '').replace('>', '');
    guesses.push(value);
    input.value = '';
    console.log(guesses);

    // Start timer if not already done.
    if (!timerIsRunning) {
        startTimer();
        timerIsRunning = true;
    }
}

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        processValue();
    }
})

submit.addEventListener('click', function() {
    processValue();
});