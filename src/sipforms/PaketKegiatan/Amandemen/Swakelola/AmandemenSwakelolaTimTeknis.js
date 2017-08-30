import React, { Component } from 'react';
import { 
    Grid, 
    Column, 
    Toolbar, 
    RendererCell,
    SegmentedButton,
    Button,
    ToolTip,
    SearchField,
    GridCell,
    Container,
    Dialog,
    FormPanel,
    FieldSet,
    TextField
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import modelTimTeknis from './Model/AmandemenSwakelolaTimTeknisModel';
import model from '../../PaketModel';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class AmandemenSwakelolaTimTeknis extends Component {

    state = {
        showDialog: false,
        judul: "",
        kodepaket: "",
        nosktimteknis: "",
        namatimteknis: "",
        kategori: "",
        posisi: ""
    }

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketData.json'
        },
        filters: [{
            property: 'jenispaket',
            value: 'SWAKELOLA'
        }]
    });

    storeGrid = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTimTeknis,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
        } 
    });

    onSearch = (grid, info) => {
        this.setState({ showDialog: true });
        this.setState({kodepaket: info.record.data.kodepaket});
        this.setState({judul: info.record.data.kodepaket + ' - ' + info.record.data.namapaket});
    }

    render() {

        const {showDialog} = this.state;

        return (
            <Container>
                <Grid
                title="Daftar Paket Kegiatan Swakelola - Amandemen Data Tim Teknis"
                store={this.store}
                plugins={{
                    gridviewoptions: true,
                    gridsummaryrow: true
                }}
                signTpl={this.signTpl}
                shadow
                height="550"
            >
                <Column 
                    text="<b>Kode</b>" 
                    dataIndex="kodepaket" 
                    width="100"
                    summaryRenderer={this.summarizerecord} />
                <Column 
                    text="<b>Tahun</b>" 
                    dataIndex="tahun" 
                    width="80"
                    hidden />               
                <Column 
                    text="<b>Nama Paket</b>" 
                    dataIndex="namapaket" 
                    width="200"/>
                <Column 
                    text="<b>Satker</>" 
                    dataIndex="satker" 
                    width="100"
                    hidden />
                <Column 
                    text="<b>Nama PPK</b>" 
                    dataIndex="namappk" 
                    width="150" />
                <Column 
                    text="<b>Penanggung Jawab</b>" 
                    dataIndex="penanggungjawab" 
                    width="150" 
                    hidden />
                <Column 
                    text="<b>Nilai Paket</b>" 
                    dataIndex="nilaipaket" 
                    width="150" 
                    formatter='currency("Rp",0,false," ")' 
                    align="right" 
                    summary="sum" />
                <Column 
                    text="<b>No. Kontrak</b>" 
                    dataIndex="nokontrak" 
                    width="150"
                    hidden />
                <Column 
                    text="<b>Tanggal Kontrak</b>" 
                    dataIndex="tglkontrak" 
                    width="100" 
                    hidden />
                <Column 
                    text="<b>Jenis Paket</b>" 
                    dataIndex="jenispaket" 
                    width="120" />
                <Column 
                    text="<b>Durasi Kegiatan</b>" 
                    dataIndex="durasikegiatan" 
                    width="100" />
                <Column 
                    text="<b>No. SPMK</b>" 
                    width="150" 
                    dataIndex="nospmk" 
                    hidden />
                <Column 
                    text="<b>Penyedia Jasa</b>" 
                    dataIndex="penyediajasa" 
                    width="150" 
                    hidden />
                <Column 
                    text="<b>Tanggal Penyelesaian</b>" 
                    dataIndex="tanggalpenyelesaian" 
                    width="150" />       
                    <Column 
                    text="Actions" 
                    width="80" 
                >
                    <GridCell 
                        tools={{
                            search: {
                                handler: this.onSearch
                            }
                        }}
                    />
                </Column>                        
            </Grid>

            <Dialog 
                displayed={showDialog}
                title={this.state.judul}
                closable
                maximizable
                closeAction="hide"
                maskTapHandler={this.onCancel}
                bodyPadding="20"
                width="1200"
                height="600"
                defaultFocus="#ok"
                onHide={() => this.setState({ showDialog: false })}
            >
                <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="550"
                    > 
                    <Grid title="Tim Teknis Paket Kegiatan" store={this.storeGrid} shadow grouped flex="6" height="450">
                        <Column text="<b>Kode Paket</b>" dataIndex="kodepaket" width="100"/>
                        <Column text="<b>No. SK Tim Teknis</b>" dataIndex="nosktimteknis" width="150"/>
                        <Column text="<b>Nama</b>" dataIndex="namatimteknis" width="200" />
                        <Column text="<b>Kategori</b>" dataIndex="kategori" width="150" />
                        <Column text="<b>Posisi</b>" dataIndex="posisi" width="150" />
                    </Grid>

                    <FormPanel flex="4" height="450">
                        <FieldSet title="<h4>Input Tim Teknis Paket Kegiatan</h4>">
                            <TextField label="Kode Paket" value={this.state.kodepaket}/>
                            <TextField label="No. SK Tim Teknis"/>
                            <TextField label="Nama"/>
                            <TextField label="Kategori"/>
                            <TextField label="Posisi"/>
                        </FieldSet>
                        <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>
                    </FormPanel>
                </Container> 
                    <Button text="Cancel" handler={this.onCancel}/>
                    <Button itemId="ok" text="OK" handler={this.onOk}/>
            </Dialog>

        </Container>    
        )
    }
    
    summarizerecord = (grid, context) => 'Total: ' +context.records.length + ' data';

}