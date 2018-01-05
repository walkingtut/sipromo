import React, { Component } from 'react';
import { Grid, 
    Toolbar, 
    Container, 
    Button 
} from '@extjs/ext-react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer';
import LengkapiKontraktual from './LengkapiKontraktual';

const store = createStore(reducer);

export default class LengkapiKontratualRedux extends Component {

    render() {
        return (
            <Provider store={store}>
                <Container layout="fit" padding="10">
                    <LengkapiKontraktual/>
                </Container>
            </Provider>
        )
    }

}