import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import styled, {ThemeProvider} from 'styled-components';
import {linkTo} from '@storybook/addon-links';

import Clock from './index';

const _Stories = storiesOf('Clock', module);
_Stories.addDecorator(withKnobs);
_Stories.add('basic', () => {
        const hour = text('hour', 10);
        const min = text('min', 10);
        const sec = text('sec', 10);
        const ampm = text('ampm', 'pm');

        const height = text('height', '10%');

        const width = text('width', '25%');
        const TestDiv = styled.div`
          width: ${width};
          height: ${height};
          border: solid 2px black;
        `;
        return (
            <TestDiv>

                <Clock hour={hour} min={min} sec={sec} ampm={ampm}/>
            </TestDiv>
        );
    }, {
        notes: {text: "A fix styled clock that will fit available space"}
    }
);
