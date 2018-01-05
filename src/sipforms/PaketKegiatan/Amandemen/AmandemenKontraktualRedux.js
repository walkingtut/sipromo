import React, { Component } from 'react';
import { Grid, 
    Toolbar, 
    Container, 
    Button 
} from '@extjs/ext-react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../reducer';
import AmandemenKontraktual from './AmandemenKontraktual';

const store = createStore(reducer);

export default class AmandemenKontraktualRedux extends Component {

    render() {
        return (
            <Provider store={store}>
                <Container layout="fit" padding="10">
                    <AmandemenKontraktual/>
                </Container>
            </Provider>
        )
    }

}