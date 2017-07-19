import React from 'react';
import Score from './score';
import Player from './player';

const GameStats = {
    NOTSTARTED: 'Not started',
    FINISHED: 'Finished',
    INPROGRESS: 'Game inprogress'
}

export default class ButtonComp extends React.Component {
	constructor(props) {
		super(props)
		this.clickHandler = this.clickHandler.bind(this);
		
	}

	clickHandler(event) {
		event.preventDefault();
		console.log('Button Clicked');
		if(this.props.status === GameStats.NOTSTARTED){
            this.props.startGame();

        } else if (this.props.status === GameStats.INPROGRESS){
            this.props.nextTurn();

        } else {
            this.props.startGame();
        }
	}


	render() {
		//Render button text based on GameStat
		var buttonText = '';
		if(this.props.status === GameStats.NOTSTARTED){
			buttonText = 'Start Game';
		} else if (this.props.status === GameStats.FINISHED){
			buttonText = 'Play Again!';
		} else if (this.props.status === GameStats.INPROGRESS){
			buttonText = 'Next Turn';
		}

		return (
			<button className="button-main" onClick={this.clickHandler}>
				{buttonText}
			</button>

		);
	}
}