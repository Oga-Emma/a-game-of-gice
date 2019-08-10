/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var diceDOM = document.querySelector('.dice');


var init = function(){
    gamePlaying = true;
    scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//reset player 1 values
document.getElementById('score-0').textContent = 0;
document.getElementById('current-0').textContent = 0;

//reset player 2 values
document.getElementById('score-1').textContent = 0;
document.getElementById('current-1').textContent = 0;

//reset dice image
diceDOM.style.display = 'none';

}

var generateRandom = function(){
    return Math.floor((Math.random() * 6) + 1);
}

var updatePlayerScores = function(){
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
}

var togglePlayer = function (){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    diceDOM.style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    roundScore = 0;

}

//row button clicked
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(!gamePlaying){
        return;
    }


    //generate random
    var dice = generateRandom();

    //show result
    diceDOM.src = `dice-${dice}.png`;

    if(diceDOM.style.display  === 'none'){
        diceDOM.style.display = 'block';
    }

    if(dice !== 1){
        //add to total score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        togglePlayer();
    }

    // document.querySelector('#score-' + activePlayer).innerHTML = dice;
})

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(!gamePlaying){
        return;
    }


    scores[activePlayer] += roundScore;
    updatePlayerScores();

    if(scores[activePlayer] >= 100){
        gamePlaying = false;
        document.querySelector('#name-' + activePlayer).textContent = `WINNER`;
        diceDOM.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    }else{
        togglePlayer();
    }
})

document.querySelector('.btn-new').addEventListener('click', function(){
    init();
})

init();