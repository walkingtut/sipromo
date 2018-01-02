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
    TextField,
    TextAreaField,
    TabPanel,
    TitleBar,
    Panel,
    DatePickerField,
    ComboBoxField
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import modelLingkup from '../Model/DetailLingkupModel';
import model from '../PaketModel';
import jenisEvent from '../../../../resources/data/JenisEventData.json';
import jenisPembayaran from '../../../../resources/data/JenisPembayaranData.json';
import modelJadwal from '../Model/DetailJadwalModel';
import modelPenyerapan from '../Model/DetailPenyerapanModel';

import colors from '../../colors';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
    'Ext.Toast'
]);

export default class KelolaKontraktual extends Component {

    state = {
        showJadwalDialog: false,
        showPenyerapanDialog: false,
        judul: "Pilihlah paket kegiatan terlebih dahulu untuk menginput data pada tab ini",
        kodepaket: "",
        lingkup: ""
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
            value: 'KONTRAKTUAL'
        }]
    });

    storeJadwal = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelJadwal,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketJadwalData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storePenyerapan = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelPenyerapan,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketPenyerapanData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    onPilih = (grid, info) => {
        this.setState({ kodepaket: info.record.data.kodepaket });
        this.setState({ judul: info.record.data.kodepaket + ' - ' + info.record.data.namapaket });
        Ext.toast({message: 'PAKET KEGIATAN: ' + String(this.state.judul), timeout: 1500});
        this.storeJadwal.filter('kodepaket', this.state.kodepaket);
        this.storePenyerapan.filter('kodepaket', this.state.kodepaket);
    }

    onJadwal = (grid, info) => {
        this.setState({ showJadwalDialog: true });
    }

    onPenyerapan = (grid, info) => {
        this.setState({ showPenyerapanDialog: true });
    }    

    render() {

        return (
            <TabPanel 
                flex={1}
                width="1200"
                height="560"
                shadow 
                defaults={{
                    cls: "card",
                    layout: "center",
                    tab: {
                        flex: 0,
                        minWidth: 100
                    }
                }}
                tabBar={{
                    layout: {
                        pack: 'left'
                    }
                }}
            >
                {/* Tab Daftar paket kegiatan */}
                <Container title="Daftar Paket">
                    <Grid
                        store={this.store}
                        plugins={{
                            gridviewoptions: true
                        }}
                        signTpl={this.signTpl}
                        height="560"
                        width="1200"
                     >
                        <TitleBar docked="top" ui="titlebar-search">
                            <SearchField 
                                ui="alt"
                                align="left"
                                placeholder="Cari Paket Kegiatan..."
                                width="300"
                            />
                        </TitleBar>
                        <Column 
                            text="<b>Kode</b>" 
                            dataIndex="kodepaket" 
                            width="100"
                            align="left" />
                        <Column 
                            text="<b>Tahun</b>" 
                            dataIndex="tahun" 
                            width="80"
                            align="left"
                            hidden />               
                        <Column 
                            text="<b>Nama Paket</b>" 
                            dataIndex="namapaket" 
                            width="330" 
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
                            align="left"
                            width="150" />
                        <Column 
                            text="<b>Penanggung Jawab</b>" 
                            dataIndex="penanggungjawab" 
                            align="left"
                            width="150" 
                            hidden />
                        <Column 
                            text="<b>Nilai Paket</b>" 
                            dataIndex="nilaipaket" 
                            formatter='currency("Rp",0,false," ")' 
                            width="130" 
                            align="right"  />
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
                                width="70"
                                align="center" />
                            <Column
                                text="<b>Satuan</b>"
                                dataIndex="satuandurasi" 
                                width="70"
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
                            align="center" 
                            hidden />
                        <Column 
                            text="<b>Tanggal Penyelesaian</b>" 
                            dataIndex="tanggalpenyelesaian" 
                            width="150"
                            align="center" />
                        <Column 
                            text="<b>Pilih</b>" 
                            width="80" 
                        >
                            <GridCell align="center"
                                tools={{
                                    search: {
                                        handler: this.onPilih
                                    }
                                }}
                            />
                        </Column>                                   
                    </Grid>
                </Container>

                {/* Tab Jadwal paket kegiatan */}
                <Container title="Jadwal Kegiatan"
                    padding={10} 
                    layout={{
                        type: 'vbox',
                        pack: 'center',
                        align: 'stretch'
                    }} 
                    width="1200"
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1.5}
                    >
                        <Panel shadow margin="0 0 0 0">
                            <div style={colors.card.red}><b>{this.state.judul}</b></div>
                        </Panel>

                    </Container>                
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={8.5}
                    > 
                        <Grid store={this.storeJadwal} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Jadwal Kegiatan"/>
                                <Button text="+Tambah" handler={this.onJadwal}/>
                            </TitleBar>
                            <Column text="<b>Uraian Kegiatan</b>" dataIndex="jadwalkegiatan" width="350" />
                            <Column text="<b>Tanggal Mulai</b>" dataIndex="tanggalmulai" width="200" />
                            <Column text="<b>Tanggal Selesai</b>" dataIndex="tanggalselesai" width="200" />
                            <Column text="<b>Status Kegiatan</b>" dataIndex="tanggalselesai" width="200" />
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditMaksud
                                        },
                                        minus: {
                                            handler: this.onDeleteMaksud
                                        }
                                    }}
                                />
                                <ToolTip showOnTap align="tl-tr" anchorToTarget anchor>
                                    <p>Pilih tombol aksi untuk (+) menambah, (o) mengubah, atau (-) menghapus record</p>
                                    <p>Anda akan mendapati dialog untuk melakukan fungsi yang Anda pilih</p>
                                </ToolTip>
                            </Column>
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar> 

                    </Container> 
                </Container>

                {/* Tab Rencana Penyerapan paket kegiatan */}
                <Container title="Rencana Penyerapan"
                    padding={10} 
                    layout={{
                        type: 'vbox',
                        pack: 'center',
                        align: 'stretch'
                    }}
                    width = "1200"               
                >
                        <Container 
                            autoSize 
                            defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                            layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                            flex={1.5}
                        >
                            <Panel shadow margin="0 0 0 0">
                                <div style={colors.card.red}><b>{this.state.judul}</b></div>
                            </Panel>

                        </Container>

                        <Container 
                            autoSize 
                            defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                            layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                            flex={8.5}
                        >
                            <Grid store={this.storePenyerapan} shadow grouped flex="10" height="337">
                                <TitleBar docked="top">
                                    <Button text="Rencana Penyerapan Anggaran"/>
                                    <Button text="+Tambah" handler={this.onPenyerapan}/>
                                </TitleBar>
                                <Column text="<b>Rencana Penyerapan</b>" dataIndex="rencanapenyerapan" width="250"/>
                                <Column text="<b>Tanggal Pencairan</b>" dataIndex="tanggalpencairan" width="140" />
                                <Column text="<b>Persentase (%)</b>" dataIndex="persentase" width="120"/>
                                <Column text="<b>Dokumen Pendukung</b>" dataIndex="dokumenpendukung" width="175" />
                                <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditMaksud
                                        },
                                        minus: {
                                            handler: this.onDeleteMaksud
                                        }
                                    }}
                                />
                                <ToolTip showOnTap align="tl-tr" anchorToTarget anchor>
                                    <p>Pilih tombol aksi untuk (+) menambah, (o) mengubah, atau (-) menghapus record</p>
                                    <p>Anda akan mendapati dialog untuk melakukan fungsi yang Anda pilih</p>
                                </ToolTip>
                            </Column>
                            </Grid>

                            <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar> 

                        </Container>
                </Container>

                {/* Dialog-dialog penginputan data */} 

                {/* Dialog input data Jadwal Paket Kegiatan */} 
                <Dialog 
                    displayed={this.state.showJadwalDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showJadwalDialog: false })}
                    width="600"
                    height="550"                    
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        width="500"
                    > 
                        <FormPanel flex="10" height="400">
                            <FieldSet title="Input Jadwal Paket Kegiatan">
                                <TextField label="Uraian Kegiatan"/>
                                <DatePickerField 
                                    width={200}
                                    value={new Date()}
                                    destroyPickerOnHide
                                    label="Tanggal Mulai"
                                    picker={{
                                        yearFrom: 2000
                                }}
                                />
                                <DatePickerField 
                                    width={200}
                                    value={new Date()}
                                    destroyPickerOnHide
                                    label="Tanggal Selesai"
                                    picker={{
                                        yearFrom: 2000
                                }}
                                />
                                <ComboBoxField
                                    width={200}
                                    label="Status Kegiatan"
                                    store={jenisEvent}
                                    displayField="jenis"
                                    valueField="jenis"
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
                </Dialog>
                
                {/* Dialog input data Rencana Penyerapan Anggaran */} 
                <Dialog 
                    displayed={this.state.showPenyerapanDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showPenyerapanDialog: false })}
                    width="600"
                    height="550"
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        width="500"
                    > 
                        <FormPanel flex="10" height="380">
                            <FieldSet title="Input Rencana Penyerapan Anggaran">
                                <ComboBoxField
                                    width={200}
                                    label="Rencana Penyerapan"
                                    store={jenisPembayaran}
                                    displayField="jenisbayar"
                                    valueField="jenisbayar"
                                    queryMode="local"
                                    labelAlign="placeholder"
                                    clearable
                                />
                                <DatePickerField 
                                    width={200}
                                    value={new Date()}
                                    destroyPickerOnHide
                                    label="Tanggal Pencairan"
                                    picker={{
                                        yearFrom: 2000
                                }}
                                />
                                <TextField label="Persentase (%)"/>
                                <TextField label="Dokumen Pendukung"/>
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog>

            </TabPanel>
        )

    }    
}