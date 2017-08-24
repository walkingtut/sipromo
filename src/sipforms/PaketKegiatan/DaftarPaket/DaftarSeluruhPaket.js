import React, { Component } from 'react';
import { 
    Grid, 
    Column, 
    Toolbar,
    RendererCell,
    SegmentedButton,
    Button,
    ToolTip
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import model from '../PaketModel';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class SeluruhPaket extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketData.json'
        },
        groupField: 'jenispaket'
    });

    state = {
        grouped: true
    }

    onToggleGrouping = on => this.setState({ grouped: on })

    render() {

        return (
            <Grid
            title="Daftar Seluruh Paket Kegiatan"
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
                <div style={{ marginRight: '20px' }}>Grouping:</div>
                <SegmentedButton label="Grouping">
                    <Button ui="toolbar-default" text="ON" handler={this.onToggleGrouping.bind(this, true)}/>
                    <Button ui="toolbar-default" pressed text="OFF" handler={this.onToggleGrouping.bind(this, false)}/>
                </SegmentedButton>                
                <ToolTip showOnTap title="Pengaturan Kolom" trackMouse width="200">
                    Untuk mengatur kolom pada tabel Paket Kegiatan, tekan tombol mouse kiri pada header tabel selama beberapa saat
                </ToolTip>
            </Toolbar>
            <Column 
                text="<b>Kode</b>" 
                dataIndex="kodepaket" 
                width="140"
                align="center"
                summaryRenderer={this.summarizerecord} />
            <Column 
                text="<b>Tahun</b>" 
                dataIndex="tahun" 
                width="80"
                align="center"
                hidden />               
            <Column 
                text="<b>Nama Paket</b>" 
                dataIndex="namapaket" 
                width="200"
                align="left"/>
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
                align="left"
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
                width="150" 
                dataIndex="nospmk"
                align="center" 
                hidden />
            <Column 
                text="<b>Penyedia Jasa</b>" 
                dataIndex="penyediajasa" 
                width="150" 
                align="center"
                hidden />
            <Column 
                text="<b>Tgl. Penyelesaian</b>" 
                dataIndex="tanggalpenyelesaian" 
                width="150"
                align="center" />           
        </Grid>
        )
    }
    
    summarizerecord = (grid, context) => 'Total: ' +context.records.length + ' data';

}