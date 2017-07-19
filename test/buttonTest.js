import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

const should = chai.should();

import ButtonComp from '../js/components/buttonComp';

describe('Button component', function() {
	it('Render changes state when clicked', function() {
		const status = 'Not started';
		const text = 'Start Game';
		const renderer = TestUtils.createRenderer();
        renderer.render(<ButtonComp status = {status} />);
        const result = renderer.getRenderOutput();

        const buttonText = result.props.children;
        buttonText.should.equal(text);
		

	})
})