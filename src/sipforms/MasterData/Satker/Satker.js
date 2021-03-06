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
import model from '../Model/SatkerModel';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
]);

export default class Satker extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/SatkerData.json'
        } 
    });    

    render() {

        //console.log({mystore: this.store});

        return (

            <Container 
                padding={10} 
                width={!Ext.os.is.Phone && 1000}
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
                    <Grid title="Master Data Satker" 
                        store={this.store} 
                        shadow 
                        grouped
                        plugins={{
                            gridsummaryrow: true
                        }} 
                        flex="5.5"
                    >
                        <Column 
                            text="<b>Kode</b>" 
                            dataIndex="kodesatker" 
                            width="150"
                            summaryRenderer={this.summarizerecord}/>
                        <Column 
                            text="<b>Satuan Kerja</b>" 
                            width="350" 
                            dataIndex="namasatker"/>
                    </Grid>
                    <FormPanel flex="4.5" height="300">
                        <FieldSet title="<h3>Input/Edit Master Data Satker</h3>">
                            <TextField label="Kode"/>
                            <TextField label="Satuan Kerja"/>
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