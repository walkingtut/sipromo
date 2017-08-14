import React, { Component } from 'react';
import { 
    FormPanel, 
    FieldSet, 
    TextField, 
    Toolbar, 
    Container, 
    Panel, 
    Button, 
    Grid, 
    Column, 
    RendererCell 
} from '@extjs/ext-react';
import model from './PembuatKomitmenModel';

export default class PembuatKomitmen extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/DirektoratData.json'
        } 
    });    

    render() {

        //console.log({mystore: this.store});

        return (

            <Container 
                padding={10} 
                width={!Ext.os.is.Phone && 1200}
                layout={{
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                }}
            >
                <Container 
                    autoSize 
                    defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                    layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                    flex={1}
                    height="520"
                >            
                    <Grid title="Master Data PPK" store={this.store} shadow grouped width="70%">
                        <Column text="<b>Company</b>" dataIndex="name" width="150"/>
                        <Column text="<b>Price</b>" width="85" dataIndex="price" formatter='usMoney'/>
                        <Column text="<b>Change</b>" width="100" dataIndex="priceChange"/>
                        <Column text="<b>% Change</b>" dataIndex="priceChangePct"/>
                        <Column text="<b>Last Updated</b>" width="125" dataIndex="lastChange" formatter='date("m/d/Y")'/>
                    </Grid>
                    <FormPanel width="30%" height="300">
                        <FieldSet title="<h4>Input/Edit Master Data PPK</h4>">
                            <TextField label="First Name"/>
                            <TextField label="Last Name"/>
                            <TextField label="Account Number"/>
                        </FieldSet>
                        <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>
                    </FormPanel>
                </Container>    
            </Container>
        )
    }
}