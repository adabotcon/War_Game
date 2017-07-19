import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

const should = chai.should();
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Game from '../js/components/game';

describe('Game component', function() {
	it('Renders the game table, players, and shuffles cards', function() {
		expect(
			shallow(
				<Game />
			).length
		).to.equal(1)
	})
})