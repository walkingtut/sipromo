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
import model from './DirektoratModel';

export default class LengkapiKontraktual extends Component {

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
                    width="1200"
                >            

                    <FormPanel height="300" width="900">
                        <FieldSet title="<h4>Input/Edit Master Data Direktorat</h4>">
                            <TextField label="Kode"/>
                            <TextField label="Direktorat"/>
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