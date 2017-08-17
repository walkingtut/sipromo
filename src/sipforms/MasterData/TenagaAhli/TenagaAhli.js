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
import model from './TenagaAhliModel';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
]);

export default class TenagaAhli extends Component {

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
                width={!Ext.os.is.Phone && 1300}
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
                    <Grid title="Master Data Tenaga Ahli" store={this.store} shadow grouped flex="7">
                        <Column 
                            text="<b>Nama</b>" 
                            dataIndex="nama" 
                            width="200"
                            summaryRenderer={this.summarizerecord}/>
                        <Column 
                            text="<b>Pendidikan Terakhir</b>" 
                            width="160" 
                            dataIndex="pendidikanTerakhir" />
                        <Column 
                            text="<b>Kualifikasi</b>" 
                            width="100" 
                            dataIndex="kualifikasi"/>
                        <Column 
                            text="<b>Lama Pengalaman</b>" 
                            width="150" 
                            dataIndex="lamaPengalaman"/>
                        <Column 
                            text="<b>Sertifikasi Keahlian</b>" 
                            width="120" 
                            dataIndex="sertifikatKeahlian" />
                        <Column 
                            text="<b>Billing Rate</b>" 
                            width="120" 
                            dataIndex="billingRate" />
                    </Grid>
                    <FormPanel flex="3" height="500">
                        <FieldSet title="<h4>Input/Edit Master Data Tenaga Ahli</h4>">
                            <TextField label="Nama"/>
                            <TextField label="Pendidikan Terakhir"/>
                            <TextField label="Kualifikasi"/>
                            <TextField label="Lama Pengalaman"/>
                            <TextField label="Sertifikasi Keahlian"/>
                            <TextField label="Billing Rate"/>
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