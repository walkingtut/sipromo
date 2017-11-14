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
import model from '../PaketModel';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class DaftarPaketSwakelola extends Component {

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

    render() {

        return (
            <Grid
            title="Daftar Paket Kegiatan Swakelola"
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
                width="140"
                align="left"
                summaryRenderer={this.summarizerecord} />
            <Column 
                text="<b>Tahun</b>" 
                dataIndex="tahun" 
                width="80"
                align="left"
                hidden />               
            <Column 
                text="<b>Nama Paket</b>" 
                dataIndex="namapaket" 
                width="200"
                align="left" />
            <Column 
                text="<b>Satker</>" 
                dataIndex="satker" 
                width="100"
                align="left"
                hidden />
            <Column 
                text="<b>Nama PPK</b>" 
                dataIndex="namappk" 
                width="150"
                align="left" />
            <Column 
                text="<b>Penanggung Jawab</b>" 
                dataIndex="penanggungjawab" 
                width="150"
                align="left" 
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
                align="center"
                hidden />
            <Column 
                text="<b>Tanggal Kontrak</b>" 
                dataIndex="tglkontrak" 
                width="100"
                align="center" 
                hidden />
            <Column 
                text="<b>Jenis Paket</b>" 
                dataIndex="jenispaket" 
                width="120"
                align="center" />
            <Column text="<b>Durasi Kegiatan</b>" align="center">
                <Column
                    text="<b>Durasi</b>"
                    dataIndex="durasikegiatan" 
                    width="80"
                    align="center" />
                <Column
                    text="<b>Satuan</b>"
                    dataIndex="satuandurasi" 
                    width="80"
                    align="center" />    
            </Column>
            <Column 
                text="<b>No. SPMK</b>" 
                dataIndex="nospmk" 
                width="150" 
                align="center"
                hidden />
            <Column 
                text="<b>Penyedia Jasa</b>" 
                dataIndex="penyediajasa" 
                width="150" 
                width="150" 
                align="center"
                hidden />
            <Column 
                text="<b>Tanggal Penyelesaian</b>" 
                dataIndex="tanggalpenyelesaian" 
                width="150"
                width="150" 
                align="center" />        
        </Grid>
        )
    }
    
    summarizerecord = (grid, context) => 'Total: ' +context.records.length + ' data';

}