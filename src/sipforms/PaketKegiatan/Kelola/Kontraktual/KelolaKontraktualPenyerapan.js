import React, { Component } from 'react';
import { 
    Grid, 
    Column, 
    Toolbar, 
    RendererCell,
    SegmentedButton,
    Button,
    ToolTip,
    SearchField
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import modelPenyerapan from './Model/KelolaKontraktualPenyerapanModel';
import model from '../../PaketModel';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class KelolaKontraktualPenyerapan extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketData.json'
        },
    });

    render() {

        return (
            <Grid
            title="Daftar Paket Kegiatan Kontraktual"
            store={this.store}
            plugins={{
                gridviewoptions: true,
                gridsummaryrow: true
            }}
            signTpl={this.signTpl}
            shadow
            height="550"
        >
            <Toolbar docked="top">     
                <div style={{ marginRight: '20px' }}>Cari:</div>
                <SearchField 
                    ui="faded"
                    placeholder="Search"
                />              
                <ToolTip showOnTap title="Pengaturan Kolom" trackMouse width="200">
                    Untuk mengatur kolom pada tabel Paket Kegiatan, tekan tombol mouse kiri pada header tabel selama beberapa saat
                </ToolTip>
            </Toolbar>
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
        </Grid>
        )
    }
    
    summarizerecord = (grid, context) => 'Total: ' +context.records.length + ' data';

}