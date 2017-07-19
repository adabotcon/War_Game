import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

const should = chai.should();

import Score from '../js/components/score';

describe('Score component', function() {
	it('Renders score text', function() {
		const winner = '1';
		const status = 'Finished';
		const booty = 'blah';
		const war = false;
		const text = 'Player1 has snatched victory!';

		const renderer = TestUtils.createRenderer();
        renderer.render(<Score currentWinner = {winner} status = {status} />);
        const result = renderer.getRenderOutput();

        const scoreText = result.props.children;
        scoreText.should.equal(text);

	})
})