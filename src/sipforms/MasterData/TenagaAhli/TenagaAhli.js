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
import model from './TenagaAhliModel';
//import pendidikan from './pendidikan';
import pendidikan from '../../../../resources/data/PendidikanData.json';
//import jurusan from './jurusan';
import jurusan from '../../../../resources/data/JurusanData.json';


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
            url: 'resources/data/TenagaAhliData.json'
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
                    <Grid title="Master Data Tenaga Ahli" 
                        store={this.store} 
                        shadow 
                        grouped 
                        plugins={{
                            gridsummaryrow: true
                        }}
                        flex="7"
                    >
                        <Column 
                            text="<b>Nama</b>" 
                            dataIndex="nama" 
                            width="200"
                            summaryRenderer={this.summarizerecord}/>
                        <Column 
                            text="<b>Pendidikan Terakhir</b>" 
                            width="150" 
                            dataIndex="pendidikanTerakhir" />
                        <Column 
                            text="<b>Jurusan</b>" 
                            width="160" 
                            dataIndex="jurusan" />    
                        <Column 
                            text="<b>Keahlian</b>" 
                            width="150" 
                            dataIndex="Keahlian"/>
                        <Column 
                            text="<b>Lama Pengalaman (Tahun)</b>" 
                            width="190" 
                            dataIndex="lamaPengalaman"/>
                    </Grid>
                    <FormPanel flex="3" height="500">
                        <FieldSet title="<h3>Input/Edit Master Data Tenaga Ahli</h3>">
                            <TextField label="Nama"/>
                            <ComboBoxField
                                width={200}
                                label="Pendidikan Terakhir"
                                store={pendidikan}
                                displayField="name"
                                valueField="abbrev"
                                queryMode="local"
                                labelAlign="placeholder"
                                clearable
                            />
                            <ComboBoxField
                                width={200}
                                label="Jurusan"
                                store={jurusan}
                                displayField="jurusan"
                                valueField="akronim"
                                queryMode="local"
                                labelAlign="placeholder"
                                clearable
                            />
                            <TextField label="Keahlian"/>
                            <TextField label="Lama Pengalaman (Tahun)"/>
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