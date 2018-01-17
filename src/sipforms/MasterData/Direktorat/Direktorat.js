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
import model from '../Model/DirektoratModel';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
]);

export default class Direktorat extends Component {

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
                width={!Ext.os.is.Phone && 1150}
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
                    <Grid 
                        title="Master Data Direktorat" 
                        store={this.store} 
                        shadow 
                        grouped 
                        flex="6"
                        plugins={{
                            gridsummaryrow: true
                        }}
                    >
                        <Column 
                            text="<b>Kode</b>" 
                            width="100" 
                            dataIndex="kode"
                            summaryRenderer={this.summarizerecord}/>
                        <Column 
                            text="<b>Direktorat</b>" 
                            width="400" 
                            dataIndex="direktorat"/>
                        <Column 
                            text="<b>Nama Singkat</b>" 
                            width="150" 
                            dataIndex="alias"/>
                    </Grid>
                    <FormPanel flex="4" height="320">
                        <FieldSet title="<h3>Input/Edit Master Data Direktorat</h3>">
                            <TextField label="Kode"/>
                            <TextField label="Direktorat"/>
                            <TextField label="Nama Singkat"/>
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

    summarizerecord = (grid, context) => 'Total: ' +context.records.length + ' data';
}