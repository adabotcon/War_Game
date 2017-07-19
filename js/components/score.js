import React from 'react';

export default class Score extends React.Component {
    constructor(props) {
        super(props)   
        
    }

    render() {
        //render score
        var winner = this.props.currentWinner;
        var status = this.props.status;
        var booty = this.props.currentCardsWon;
        var war = this.props.currentWasWar;
        var text = '';

        if(status === 'Not started' || winner === null){
            text = '';
        } else if (status === 'Finished'){
            text = 'Player' + winner + ' has snatched victory!';
        } else {
            if (war) {
                text += 'WAR! ';
            }
            text += 'Player ' + winner + ' won ' + booty + ' cards.';
        }
        console.log(text);
        return (
            <div>
                {text}
            </div>

        );
    }
}