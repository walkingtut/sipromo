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
    RendererCell,
    ComboBoxField 
} from '@extjs/ext-react';
import model from './TimTeknisModel';
import posisi from './posisi';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
]);

export default class TimTeknis extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/TimTeknisData.json'
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
                    <Grid title="Master Data Tim Teknis" 
                        store={this.store} 
                        shadow 
                        grouped 
                        plugins={{
                            gridsummaryrow: true
                        }}
                        flex="6"
                    >
                        <Column 
                            text="<b>Nama</b>" 
                            dataIndex="nama" 
                            width="250"
                            summaryRenderer={this.summarizerecord}/>
                        <Column 
                            text="<b>SK Tim Teknis</b>" 
                            width="150" 
                            dataIndex="nosktimteknis"/>
                        <Column 
                            text="<b>Posisi Dalam Tim</b>" 
                            width="150"
                            dataIndex="posisi"/>
                    </Grid>
                    <FormPanel flex="4" height="400">
                        <FieldSet title="<h4>Input/Edit Master Data Tim Teknis</h4>">
                            <TextField label="Nama"/>
                            <TextField label="No. SK Tim Teknis"/>
                            <ComboBoxField
                                width={200}
                                label="Posisi Dalam Tim"
                                store={posisi}
                                displayField="posisi"
                                valueField="posisi"
                                queryMode="local"
                                labelAlign="placeholder"
                                clearable
                            />
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