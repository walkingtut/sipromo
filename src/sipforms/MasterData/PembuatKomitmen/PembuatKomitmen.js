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
import model from '../Model/PembuatKomitmenModel';
import satker from '../../../../resources/data/SatkerData.json';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
]);

export default class PembuatKomitmen extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PembuatKomitmenData.json'
        } 
    });    

    render() {

        //console.log({mystore: this.store});

        return (

            <Container 
                padding={10} 
                width={!Ext.os.is.Phone && 1240}
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
                    <Grid title="Master Data PPK" 
                        store={this.store} 
                        shadow 
                        grouped
                        plugins={{
                            gridsummaryrow: true
                        }} 
                        flex="6"
                    >
                        <Column 
                            text="<b>Kode</b>" 
                            dataIndex="kodeppk" 
                            width="120"
                            summaryRenderer={this.summarizerecord}/>
                        <Column 
                            text="<b>Nama</b>" 
                            width="250" 
                            dataIndex="nama"/>
                        <Column 
                            text="<b>Satker</b>" 
                            width="320" 
                            dataIndex="satker"/>
                    </Grid>
                    <FormPanel flex="4" height="350">
                        <FieldSet title="<h3>Input/Edit Master Data PPK</h3>">
                            <TextField label="Kode"/>
                            <TextField label="Nama"/>
                            <ComboBoxField
                                width={300}
                                label="Satker"
                                store={satker}
                                displayField="namasatker"
                                valueField="kodesatker"
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