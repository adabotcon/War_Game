import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

const should = chai.should();

import Player from '../js/components/player';

describe('Player component', function() {
	it('Renders image of card', function() {
		const card = '10clubs';

		const renderer = TestUtils.createRenderer();
		renderer.render(<Player card={card}/>);
		const result = renderer.getRenderOutput();

		const img = result.props.children[0];
		img.type.should.equal('p');
	})
})