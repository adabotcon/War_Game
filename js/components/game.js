import React from 'react';
import Score from './score';
import Player from './player';
import ButtonComp from './buttonComp';

const Cards = [
    '2hearts', '2clubs', '2spades', '2diamonds', 
    '3hearts', '3clubs', '3spades', '3diamonds', 
    '4hearts', '4clubs', '4spades', '4diamonds', 
    '5hearts', '5clubs', '5spades', '5diamonds', 
    '6hearts', '6clubs', '6spades', '6diamonds', 
    '7hearts', '7clubs', '7spades', '7diamonds', 
    '8hearts', '8clubs', '8spades', '8diamonds', 
    '9hearts', '9clubs', '9spades', '9diamonds', 
    '10hearts', '10clubs', '10spades', '10diamonds', 
    '11hearts', '11clubs', '11spades', '11diamonds', 
    '12hearts', '12clubs', '12spades', '12diamonds', 
    '13hearts', '13clubs', '13spades', '13diamonds', 
    '14hearts', '14clubs', '14spades', '14diamonds'
    ]

const GameStats = {
    NOTSTARTED: 'Not started',
    FINISHED: 'Finished',
    INPROGRESS: 'Game inprogress'
}

export default class Game extends React.Component {
     constructor(props) {
        super(props)

        this.startGame = this.startGame.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
    
        this.state = { player1Deck: null,
            player2Deck: null,
            player1CurrentCard: null,
            player2CurrentCard: null,
            NumberPlayers: 2,
            status: GameStats.NOTSTARTED,
            addPlayerText: 'Add Player'
        };
        
    }
    // addPlayer(){
    //     //Adds a player to the game (should only be possible before start)

    //     //check that the game hasn't started
    //     if(this.state.status === GameStats.FINISHED || this.state.status === GameStats.INPROGRESS){
    //         this.setState({
    //             addPlayerText: 'Unable to Add Player During Current Game'
    //         })
    //     } else {
    //         //add another player to state
    //         var playerNum = this.state.NumberPlayers + 1;
    //         this.setState({
    //             player${playerNum}Deck: null,
    //             player${playerNum}CurrentCard: null,
    //             NumberPlayers: playerNum
    //         })
    //     }
    // }
    startGame(){
        //deal cards based on number of players
        //Get copy of array
        var cardsArray = Cards.slice();

        //Randomize cards using Fisher-Yates shuffle
        var currentIndex = cardsArray.length;
        var tempValue, randomIndex;
         while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            tempValue = cardsArray[currentIndex];
            cardsArray[currentIndex] = cardsArray[randomIndex];
            cardsArray[randomIndex] = tempValue;
        }
        //give each player an equal part of the deck and start game
        this.setState({
            player1Deck: cardsArray.slice(0, 26),
            player2Deck: cardsArray.slice(26),
            status: GameStats.INPROGRESS
        }, function () {
            console.log(this.state.player1Deck);
            console.log(this.state.player2Deck);
            console.log(this.state.status);
        });
    }

    nextTurn(){
        //Start the next turn
        //Note: This would look better if war/not war turns were split into seperate functions. 
        //To do this code would need an extra state or a return state that would allow an upgrade to 
        //current function's state.
        var booty = [];

        var deck1 = this.state.player1Deck;
        var deck2 = this.state.player2Deck;
        var complete = false;
        var nextStatus = GameStats.INPROGRESS;
        var isWar = false;

        //cycle until the isn't a match
        while (!complete) {
            //shift to next card
            var card1 = deck1.shift();
            var card2 = deck2.shift();
            var winner;
            booty.push(card1, card2);

            //pars to get number
            var card1Val = parseInt(card1.split('_')[0], 10);
            var card2Val = parseInt(card2.split('_')[0], 10);

            //if it is war
            if(card1Val === card2Val){
                isWar = true;
                //Player out of cards
                if (deck1.length < 2) {
                    winner = '2';
                    nextStatus = GameStats.FINISHED;
                    complete = true;
                } else if(deck2.length < 2) {
                    winner = "1";
                    nextStatus = GameStats.FINISHED;
                    complete = true;
                //Player still has cards
                } else {
                    booty.push(deck1.shift(), deck2.shift());
                    card1 = deck1.shift();
                    card2 = deck2.shift();
                    booty.push(card1, card2);
                    card1Val = parseInt(card1.split('_')[0], 10);
                    card2Val = parseInt(card2.split('_')[0], 10);
                    if(card1Val !== card2Val) {
                        complete = true;
                        if(card1Val > card2Val) {
                            winner = '1';
                            deck1.push.apply(deck1, booty);
                        } else {
                            winner = '2';
                            deck2.push.apply(deck2, booty);
                        }
                    }
                }
            } else {
                complete = true;
                if(card1Val > card2Val) {
                    winner = '1';
                    deck1.push.apply(deck1, booty);
                } else{
                    winner = '2';
                    deck2.push.apply(deck2, booty);
                }
            }
        }
        if(!deck1.length || !deck2.length){
            nextStatus = GameStats.FINISHED;
        }

        this.setState({
            status: nextStatus,
            currentWinner: winner,
            currentWasWar: isWar,
            currentCardsWon: booty.length,
            player1CurrentCard: card1,
            player2CurrentCard: card2,
            player1Deck: deck1,
            player2Deck: deck2
        }, function () {
            console.log(this.state.player1Deck + this.state.player2Deck + this.state.status + this.state.status + this.state.currentWinner +
                this.state.currentWasWar + this.state.currentCardsWon + this.state.player1CurrentCard + this.state.player2CurrentCard);
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className='col-4 player text-center'>
                        {'Player 1'}
                     </div>
                </div>
                <div className="row">
                    <div className="col-4 player">
                        <Player
                            cardCount={this.state.player1Deck ? this.state.player1Deck.length : null}
                            currentCard={this.state.player1CurrentCard}
                        />
                    </div>
                 <div className="col-4 text-center">
                    <ButtonComp status={this.state.status} onClickHandler= {this.onClickHandler} startGame= {this.startGame} nextTurn= {this.nextTurn} />
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <Score status={this.state.status} currentWinner={this.state.currentWinner} currentCardsWon={this.state.currentCardsWon} currentWasWar={this.state.currentWasWar} />
                    </div>
                </div>
                </div>
                <div className="col-4 player">
                    <div className='col-4 col-offset-4 player text-center'>
                        {'Player 2'}
                    </div>
                    <Player
                        cardCount={this.state.player2Deck ? this.state.player2Deck.length : null}
                        currentCard={this.state.player2CurrentCard}
                    />
                </div>
            </div>

        );
    }
}