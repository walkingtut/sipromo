import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../actions';
import { 
    Grid, 
    Column, 
    Toolbar,
    RendererCell,
    SegmentedButton,
    Button,
    SearchField,
    TitleBar,
    ToolTip
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import model from '../PaketModel';
import DaftarPaketRedux from './DaftarPaketRedux';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
    'Ext.MessageBox'
]);

class DaftarSeluruhPaket extends Component {

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

    componentDidUpdate(prevProps, prevState) {
        let { filter } = this.props;

        if (filter !== prevProps.filter) {
            filter = filter.toLowerCase();
            this.store.clearFilter();
            this.store.filterBy(record => {
                return  record.get('namapaket').toLowerCase().indexOf(filter) !== -1 
            });
        }
    }

    onToggleGrouping = on => this.setState({ grouped: on })

    render() {

        const { grouped } = this.state;
        const { dispatch } = this.props;

        return (
            <Grid
                store={this.store}
                plugins={{
                    gridviewoptions: true,
                    gridsummaryrow: true
                }}
                grouped={grouped}
                signTpl={this.signTpl}
                shadow
                height="550"
            >
                <TitleBar title="Daftar Seluruh Paket Kegiatan" docked="top" ui="titlebar-search">
                    <SearchField 
                        ui="alt"
                        align="right"
                        placeholder="Cari Paket Kegiatan..."
                        width="300"
                        onChange={(me, value) => dispatch(filterChange(value))}
                    />
                </TitleBar>
                <Toolbar docked="top">     
                    <div style={{ marginRight: '20px' }}>Grouping:</div>
                    <SegmentedButton label="Grouping">
                        <Button ui="toolbar-default" pressed text="ON" handler={this.onToggleGrouping.bind(this, true)}/>
                        <Button ui="toolbar-default" text="OFF" handler={this.onToggleGrouping.bind(this, false)}/>
                    </SegmentedButton>      
                    <Button text="Petunjuk" ui="action raised"> 
                        <ToolTip showOnTap autoHide={false} title="Petunjuk" closable width="400">
                            Klik On untuk melakukan grouping berdasarkan jenis paket (Kontraktual atau Swakelola) dan OFF untuk menonaktifkannya. 
                            Untuk mengatur kolom pada tabel Paket Kegiatan, tekan tombol mouse kiri pada header tabel selama beberapa saat.
                            Kolom-kolom dapat diatur dengan menekan tombol dengan simbol mata untuk menampilkan atau menyembunyikan
                            suatu kolom tertentu. Untuk menutup dialog pengaturan kolom dapat dilakukan dengan memilih tombol done.
                        </ToolTip>
                    </Button>          
                </Toolbar>
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
                    align="center"
                    hidden />    
                <Column 
                    text="<b>Direktorat</b>" 
                    dataIndex="dir" 
                    width="150"
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
                    text="<b>Prioritas</b>" 
                    dataIndex="rating"
                    summaryCell="numbercell"
                    groupHeaderTpl='{value:repeat("★")} ({value:plural("Star")})'
                        cell={{
                            xtype: 'widgetcell',
                            widget: {
                                xtype: 'rating',
                                tip: 'Set to {tracking:plural("Star")}'
                            }
                        }}
                />     
            </Grid>
        )
    }
    
    summarizerecord = (grid, context) => 'Total: ' +context.records.length + ' data';

}

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(DaftarSeluruhPaket);