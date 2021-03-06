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
    ComboBoxField
    } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import modelLingkup from '../Model/DetailLingkupModel';
import model from '../PaketModel';


Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

class RealisasiSwakelola extends Component {

    state = {
        showRealisasiJadwalDialog: false,
        showRealisasiPenyerapanDialog: false,
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

    onPilih = (grid, info) => {
        this.setState({ kodepaket: info.record.data.kodepaket });
        this.setState({ judul: info.record.data.kodepaket + ' - ' + info.record.data.namapaket });
        Ext.toast({message: 'PAKET KEGIATAN: ' + String(this.state.judul), timeout: 1500});
        this.storeJadwal.filter('kodepaket', this.state.kodepaket);
        this.storePenyerapan.filter('kodepaket', this.state.kodepaket);
    }

    onRealisasiJadwal = (grid, info) => {
        this.setState({ showRealisasiJadwalDialog: true });
    }

    onRealisasiPenyerapan = (grid, info) => {
        this.setState({ showRealisasiPenyerapanDialog: true });
    }    

    render() {

        const { dispatch } = this.props;

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
                                onChange={(me, value) => dispatch(filterChange(value))}
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

                {/* Tab Realisasi Jadwal paket kegiatan */}
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
                                <Button text="+Realisasi" handler={this.onRealisasiJadwal}/>
                            </TitleBar>
                            <Column text="<b>Jadwal Kegiatan</b>" dataIndex="jadwalkegiatan" width="350" />
                            <Column text="<b>Tanggal Mulai</b>" dataIndex="tanggalmulai" width="200" />
                            <Column text="<b>Tanggal Selesai</b>" dataIndex="tanggalselesai" width="200" />
                            <Column editable text="<b>Tanggal Realisasi</b>" dataIndex="tanggalselesai" width="200" />
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar> 

                    </Container> 
                </Container>

                {/* Tab Realisasi Penyerapan paket kegiatan */}
                <Container title="Penyerapan Anggaran"
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
                            <Grid store={this.storeGrid} shadow grouped flex="10" height="337">
                                <TitleBar docked="top">
                                    <Button text="Realisasi Penyerapan Anggaran"/>
                                    <Button text="+Realisasi" handler={this.onRealisasiJadwal}/>
                                </TitleBar>
                                <Column text="<b>Jadwal Kegiatan</b>" dataIndex="jadwalkegiatan" width="300" />
                                <Column text="<b>Total Penyerapan</b>" align="right" dataIndex="jadwalkegiatan" width="200" formatter='currency("Rp",0,false," ")'/>
                            </Grid>

                            <Grid store={this.storeGrid} shadow grouped flex="10" height="337">
                                <TitleBar docked="top">
                                    <Button text="Realisasi Penyerapan per Akun"/>
                                    <Button text="+Realisasi" handler={this.onRealisasiPenyerapan}/>
                                </TitleBar>
                                <Column text="<b>Akun</b>" dataIndex="jadwalkegiatan" width="200" />
                                <Column text="<b>Penyerapan</b>" align="right" dataIndex="jadwalkegiatan" width="200" formatter='currency("Rp",0,false," ")'/>
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
                    displayed={this.state.showRealisasiJadwalDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showRealisasiJadwalDialog: false })}
                    width="600"
                    height="350"                    
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        width="500"
                    > 
                        <FormPanel flex="10" height="200">
                            <FieldSet title="Input Jadwal Paket Kegiatan">
                                <TextField label="Kegiatan"/>
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
                    displayed={this.state.showRealisasiPenyerapanDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showRealisasiPenyerapanDialog: false })}
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
                        <FormPanel flex="10" height="300">
                            <FieldSet title="Input Rencana Penyerapan Anggaran">
                                <TextField label="Akun"/>
                                <TextField label="Penyerapan"/>
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

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(RealisasiSwakelola);