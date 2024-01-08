'use strict';

let newScore = 0;
let process = 0;
let storeResult = [];
let resultOfEachRound = '';
let result = '- - -';
const score = 10;

function editView(classOfElement, newContent) {
    document.querySelector(classOfElement).textContent = newContent;
}

function selectionOfComputer() {
    const choice = ['rock', 'paper', 'scissors'];
    return choice[Math.floor(Math.random() * choice.length)];
}

function processResult(process, status) {
    if (process <= 3) {
        if (status === 'win') {
            return '✅';
        }
        else if (status === 'lose') {
            return '❌';
        }
        else if (status === 'draw') {
            return '⭕';
        }
    }
}

function finalView() {
    editView('.status', '');
    editView('h2', 'Final result');
    editView('.content', '');
}

function finalResult(storeResult) {
    if (storeResult[0] === '⭕' && storeResult[1] === '⭕') {
        if (storeResult[2] === '✅') {
            return 1;
        }
        if (storeResult[2] === '❌') {
            return -1;
        }
        if (storeResult[2] === '⭕') {
            return 0;
        }
    }
    if (storeResult[0] === '✅') {
        if (storeResult[1] === '❌' && storeResult[2] === '✅') {
            return 1;
        }
        if (storeResult[1] === '❌' && storeResult[2] === '❌') {
            return -1;
        }
        if (storeResult[1] === '❌' && storeResult[2] === '⭕') {
            return 0;
        }
        if (storeResult[1] === '⭕' && storeResult[2] === '✅') {
            return 1;
        }
        if (storeResult[1] === '⭕' && storeResult[2] === '⭕') {
            return 1;
        }
        if (storeResult[1] === '⭕' && storeResult[2] === '❌') {
            return 0;
        }
    }
    if (storeResult[0] === '❌') {
        if (storeResult[1] === '✅' && storeResult[2] === '✅') {
            return 1;
        }
        if (storeResult[1] === '✅' && storeResult[2] === '❌') {
            return -1;
        }
        if (storeResult[1] === '✅' && storeResult[2] === '⭕') {
            return 0;
        }
        if (storeResult[1] === '⭕' && storeResult[2] === '✅') {
            return 0;
        }
        if (storeResult[1] === '⭕' && storeResult[2] === '❌') {
            return -1;
        }
        if (storeResult[1] === '⭕' && storeResult[2] === '⭕') {
            return -1;
        }
    }
    if (storeResult[0] === '⭕') {
        if (storeResult[1] === '✅' && storeResult[2] === '✅') {
            return 1;
        }
        if (storeResult[1] === '✅' && storeResult[2] === '❌') {
            return 0;
        }
        if (storeResult[1] === '✅' && storeResult[2] === '⭕') {
            return 1;
        }
        if (storeResult[1] === '❌' && storeResult[2] === '✅') {
            return 0;
        }
        if (storeResult[1] === '❌' && storeResult[2] === '❌') {
            return -1;
        }
        if (storeResult[1] === '❌' && storeResult[2] === '⭕') {
            return -1;
        }
    }
}

function resultView(result) {
    if (result === 'user') {
        document.querySelector('body').style.backgroundColor = '#a7c957';
    }
    if (result === 'computer') {
        document.querySelector('body').style.backgroundColor = '#a4161a';
    }
    if (result === 'default') {
        document.querySelector('body').style.backgroundColor = '#211f1f';
    }
}

function isClicked(selectionOfUser) {
    let status = null;
    const computerChoice = selectionOfComputer();
    if ((selectionOfUser == 'rock' && computerChoice == 'scissors') || (selectionOfUser == 'scissors' && computerChoice == 'paper') || (selectionOfUser == 'paper' && computerChoice == 'rock')) {
        status = 'win';
    }
    else if (selectionOfUser == computerChoice) {
        status = 'draw';
    }
    else {
        status = 'lose';
    }
    editView('.result', computerChoice.toLocaleUpperCase());
    if (status == 'win') {
        editView('.status', 'You win! 🎉');
        editView('.score', `Score: ${newScore += score}`);
    }
    else if (status == 'lose') {
        editView('.status', 'You lose! 😢');
    }
    else {
        editView('.status', 'Draw! 👍');
    }
    process++;
    storeResult.push(resultOfEachRound = processResult(process, status));
    if (process === 1) {
        editView('.process', result = result.replace(result[0], storeResult[0]).trim());
    }
    else  if (process === 2) {
        editView('.process', result = result.replace(result[2], storeResult[1]).trim());
    }
    else if (process === 3) {
        editView('.process', result = result.replace(result[4], storeResult[2]).trim());
    }
    status = null;
    if (process === 2) {
        if (storeResult[0] === '✅' && storeResult[1] === '✅') {
            console.log('User win');
            finalView();
            editView('.final-result', 'User win! 🎉');
            resultView('user');
        }
        if (storeResult[0] === '❌' && storeResult[1] === '❌') {
            console.log('Computer win');
            finalView();
            editView('.final-result', 'Computer win! 👌');
            resultView('computer');
        }
    }
    if (process === 3) {
        let total = finalResult(storeResult);
        if (total === 1) {
            console.log('User win');
            finalView();
            editView('.final-result', 'User win! 🎉');
            resultView('user');
        }
        else if (total === 0) {
            console.log('Draw');
            finalView();
            editView('.final-result', 'Draw match! 🤝');
            resultView('default');
        }
        else {
            console.log('Computer win');
            finalView();
            editView('.final-result', 'Computer win! 👌');
            resultView('computer');
        }
    }
}

document.querySelector('.again').addEventListener('click', () => {
    editView('.score', 'Score: 0');
    editView('.status', '');
    editView('.result', '???');
    editView('h2', 'Choose one');
    document.querySelector('.content').innerHTML = 
    `
    <button class="button rock" onclick="isClicked('rock')">
        <b><p>Rock</p></b>
    </button>
    <button class="button paper" onclick="isClicked('paper')">
        <b><p>Paper</p></b>
    </button>
    <button class="button scissors" onclick="isClicked('scissors')">
        <b><p>Scissors</p></b>
    </button>
    `;
    editView('.process', '- - -');
    editView('.final-result', '');
    resultView('default');
    newScore = 0;
    process = 0;
    storeResult = [];
    resultOfEachRound = '';
    result = '- - -';
});