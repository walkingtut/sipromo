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
import modelTenagaAhli from './Model/AmandemenSwakelolaTenagaAhliModel';
import model from '../../PaketModel';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class AmandemenSwakelolaTenagaAhli extends Component {

    state = {
        showDialog: false,
        judul: "",
        kodepaket: "",
        namatenagaahli: "",
        pendidikanterakhir: "",
        kualifikasi: "",
        durasipengalaman: "",
        sertifikatkeahlian: "",
        billingrate: "",
        durasikontrak: ""
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
        modelTenagaAhli,
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
                title="Daftar Paket Kegiatan Swakelola - Amandemen Data Tenaga Ahli"
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
                maximized
                closeAction="hide"
                maskTapHandler={this.onCancel}
                bodyPadding="20"
                width="1200"
                height="700"
                defaultFocus="#ok"
                onHide={() => this.setState({ showDialog: false })}
            >
                <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="650"
                    > 
                    <Grid title="Tenaga Ahli Paket Kegiatan" store={this.storeGrid} shadow grouped flex="7" height="500">
                        <Column text="Kode Paket" dataIndex="kodepaket" width="100"/>
                        <Column text="Nama Tenaga Ahli" width="200" dataIndex="namatenagaahli" />
                        <Column text="Pendidikan Terakhir" width="150" dataIndex="pendidikanterakhir"/>
                        <Column text="Kualifikasi" dataIndex="kualifikasi" width="150"/>
                        <Column text="Lama Pengalaman" width="150" dataIndex="durasipengalaman" />
                        <Column text="Sertifikat Keahlian" width="100" dataIndex="sertifikatkeahlian"/>
                        <Column text="Billing Rate" dataIndex="billingrate" width="150"/>
                        <Column text="Lama Kontrak" dataIndex="durasikontrak" width="150"/>
                    </Grid>

                    <FormPanel flex="3" height="620">
                        <FieldSet title="<h4>Input Tenaga Ahli Paket Kegiatan</h4>">
                            <TextField label="Kode Paket"/>
                            <TextField label="Nama Tenaga Ahli"/>
                            <TextField label="Pendidikan Terakhir"/>
                            <TextField label="Kualifikasi"/>
                            <TextField label="Durasi Pengalaman"/>
                            <TextField label="Sertifikat Keahlian"/>
                            <TextField label="Billing Rate"/>
                            <TextField label="Lama Kontrak"/>
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