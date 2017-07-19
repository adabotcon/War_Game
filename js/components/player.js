import React from 'react';
import Score from './score';

// require('js/images/');

export default class Player extends React.Component {
	constructor(props) {
		super(props)
		// this.cardImgPath = this.cardImgPath.bind(this);
		
	}

	cardImgPath(card){
		//create card path
		var imgFilename = 'back-card.svg';
		if(card){
			imgFilename = card + '.svg';
		}
		return('./images/' + imgFilename);
	}

	render() {
		//render card image
		var cardCount = this.props.cardCount;
		var currentCard = this.props.currentCard;
		var count = '';
		if(cardCount) {
			var c = cardCount ===1 ? 'card' : 'cards';
			count = <p>{cardCount} {c} remaining</p>;
		}
		return (
			<div>
				<p>
					<img src={this.cardImgPath(currentCard)} />
				</p>
				{count}
			</div>

		);
	}
}