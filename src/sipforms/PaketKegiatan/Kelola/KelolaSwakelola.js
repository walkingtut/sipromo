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
    Panel
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import modelLingkup from '../Model/DetailLingkupModel';
import model from '../PaketModel';


Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class KelolaSwakelola extends Component {

    state = {
        showJadwalDialog: false,
        showPenyerapanDialog: false,
        judul: "",
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
            value: 'SWAKELOLA'
        }]
    });

    storeGrid = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelLingkup,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketLingkupData.json'
        }
    });

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
                            <Button text="Pilih"/>
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
                            width="380" 
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
                            width="150" 
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
                            align="center" 
                            hidden />
                        <Column 
                            text="<b>Tanggal Penyelesaian</b>" 
                            dataIndex="tanggalpenyelesaian" 
                            width="150"
                            align="center" />                                
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
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1.5}
                    >
                        <Panel>
                            Paket Pekerjaan
                        </Panel>

                    </Container>                
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={8.5}
                    > 
                        <Grid store={this.storeGrid} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Jadwal Kegiatan"/>
                                <Button text="+Tambah" handler={this.onJadwal}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Jadwal Kegiatan</b>" dataIndex="jadwalkegiatan" width="350" />
                            <Column text="<b>Tanggal Mulai</b>" dataIndex="tanggalmulai" width="200" />
                            <Column text="<b>Tanggal Selesai</b>" dataIndex="tanggalselesai" width="200" />
                            <Column text="<b>Status Kegiatan</b>" dataIndex="tanggalselesai" width="200" />
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
                            <Panel>
                                Paket Pekerjaan
                            </Panel>

                        </Container>

                        <Container 
                            autoSize 
                            defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                            layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                            flex={8.5}
                        >
                            <Grid store={this.storeGrid} shadow grouped flex="5" height="337">
                                <TitleBar docked="top">
                                    <Button text="Rencana Penyerapan Anggaran"/>
                                    <Button text="+Tambah" handler={this.onPenyerapan}/>
                                    <Button text="Edit"/>
                                    <Button text="-Hapus"/>
                                </TitleBar>
                                <Column text="<b>Akun</b>" dataIndex="rencanapenyerapan" width="150"/>
                                <Column text="<b>Januari</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Februari</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Maret</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>April</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Mei</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Juni</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Juli</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Agustus</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>September</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Oktober</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>November</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
                                <Column text="<b>Desember</b>" dataIndex="persentase" width="100" align="right" formatter='currency("Rp",0,false," ")'/>
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
                    height="500"                    
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        width="500"
                    > 
                        <FormPanel flex="10" height="350">
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
                    height="700"
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        width="500"
                    > 
                        <FormPanel flex="10" height="550">
                            <FieldSet title="Input Rencana Penyerapan Anggaran">
                                <TextField label="Akun"/>
                                <TextField label="Januari"/>
                                <TextField label="Februari"/>
                                <TextField label="Maret"/>
                                <TextField label="April"/>
                                <TextField label="Mei"/>
                                <TextField label="Juni"/>
                                <TextField label="Juli"/>
                                <TextField label="Agustus"/>
                                <TextField label="September"/>
                                <TextField label="Oktober"/>
                                <TextField label="November"/>
                                <TextField label="Desember"/>
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