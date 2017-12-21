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
import model from '../PaketModel';
import modelMaksud from '../Model/DetailMaksudModel';
import modelTujuan from '../Model/DetailTujuanModel';
import modelSasaran from '../Model/DetailSasaranModel';
import modelLingkup from '../Model/DetailLingkupModel';
import modelKeluaran from '../Model/DetailKeluaranModel';
import modelTenagaAhli from '../Model/DetailTenagaAhliModel';
import modelTimTeknis from '../Model/DetailTimTeknisModel';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
]);

export default class LengkapiKontraktual extends Component {

    state = {
        showMaksudDialog: false,
        showTujuanDialog: false,
        showSasaranDialog: false,
        showLingkupDialog: false,
        showKeluaranDialog: false,
        showTenagaAhliDialog: false,
        showTimTeknisDialog: false,
        judul: "",
        kodepaket: "",
        lingkup: ""
    }

    storePaket = Ext.create('Ext.data.Store', {
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

    storeMaksud = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelMaksud,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketMaksudData.json'
        }
    });

    storeTujuan = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTujuan,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketTujuanData.json'
        }
    });

    storeSasaran = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelSasaran,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketSasaranData.json'
        }
    });

    storeLingkup = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelLingkup,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketLingkupData.json'
        }
    });

    storeKeluaran = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelKeluaran,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketKeluaranData.json'
        }
    });

    storeTenagaAhli = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTenagaAhli,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketTenagaAhliData.json'
        }
    });

    storeTimTeknis = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTimTeknis,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketTimTeknisData.json'
        }
    });

    onMaksud = (grid, info) => {
        this.setState({ showMaksudDialog: true });
        // this.setState({ kodepaket: info.record.data.kodepaket });
        // this.setState({ judul: info.record.data.kodepaket + ' - ' + info.record.data.namapaket });
        // this.storeGrid.filter('kodepaket', this.state.kodepaket);
    }

    onTujuan = (grid, info) => {
        this.setState({ showTujuanDialog: true });
    }

    onSasaran = (grid, info) => {
        this.setState({ showSasaranDialog: true });
    }

    onLingkup = (grid, info) => {
        this.setState({ showLingkupDialog: true });
    }

    onKeluaran = (grid, info) => {
        this.setState({ showKeluaranDialog: true });
    }

    onTenagaAhli = (grid, info) => {
        this.setState({ showTenagaAhliDialog: true });
    }
    
    onTimTeknis = (grid, info) => {
        this.setState({ showTimTeknisDialog: true });
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
                        store={this.storePaket}
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

                {/* Tab Info Dasar: Maksud, Tujuan, dan Sasaran */}
                <Container title="Info Dasar"
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
                        <Grid store={this.storeMaksud} grouped flex="3" border>
                            <TitleBar docked="top">
                                <Button text="Maksud"/>
                                <Button text="+Tambah" handler={this.onMaksud}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Maksud</b>" dataIndex="maksud" width="355"/>
                        </Grid>

                        <Grid store={this.storeTujuan} grouped flex="3" border>
                            <TitleBar docked="top">
                                <Button text="Tujuan"/>
                                <Button text="+Tambah" handler={this.onTujuan}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Tujuan</b>" dataIndex="tujuan" width="355"/>
                        </Grid>

                        <Grid store={this.storeSasaran} grouped flex="3" border>
                            <TitleBar docked="top">
                                <Button text="Sasaran"/>
                                <Button text="+Tambah" handler={this.onSasaran}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Sasaran</b>" dataIndex="sasaran" width="355"/>
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>                                              

                    </Container> 
                </Container>

                {/* Tab Ruang Lingkup kegiatan */}
                <Container title="Lingkup"
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
                        <Grid store={this.storeLingkup} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Lingkup"/>
                                <Button text="+Tambah" handler={this.onLingkup}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Ruang Lingkup</b>" dataIndex="lingkup" width="1130"/>
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>

                    </Container>
                </Container>

                {/* Tab Keluaran paket kegiatan */}
                <Container title="Keluaran"
                    padding={10} 
                    layout={{
                        type: 'vbox',
                        pack: 'center',
                        align: 'stretch'
                    }}               
                >

                    <Container 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1.5}              
                        autoSize           
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
                        <Grid store={this.storeKeluaran} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Keluaran"/>
                                <Button text="+Tambah" handler={this.onKeluaran}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Keluaran</b>" width="550" dataIndex="luaran"/>
                            <Column text="<b>Jenis Keluaran</b>" width="150" dataIndex="jenisluaran"/>
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>
                        
                    </Container>

                </Container>

                {/* Tab Tenaga Ahli paket kegiatan */}
                <Container title="Tenaga Ahli"
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
                        <Grid store={this.storeTenagaAhli} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Tenaga Ahli"/>
                                <Button text="+Tambah" handler={this.onTenagaAhli}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>Nama Tenaga Ahli</b>" width="300" dataIndex="namatenagaahli" />
                            <Column text="<b>Pendidikan Terakhir</b>" width="100" dataIndex="pendidikanterakhir"/>
                            <Column text="<b>Lama Kontrak (Bln)</b>" dataIndex="durasikontrak" width="200" align="right"/>
                            <Column text="<b>Kualifikasi</b>" dataIndex="kualifikasi" width="200"/>
                            <Column text="<b>Lama Pengalaman (Thn)</b>" width="180" dataIndex="durasipengalaman" align="right"/>
                            <Column text="<b>Sertifikat Keahlian</b>" width="150" dataIndex="sertifikatkeahlian"/>           
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>
                            
                    </Container>  

                </Container>

                {/* Tab Tim Teknis paket kegiatan */}
                <Container title="Tim Teknis"
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
                        <Grid store={this.storeTimTeknis} shadow grouped flex="6" height="337">
                            <TitleBar docked="top">
                                <Button text="Tim Teknis"/>
                                <Button text="+Tambah" handler={this.onTimTeknis}/>
                                <Button text="Edit"/>
                                <Button text="-Hapus"/>
                            </TitleBar>
                            <Column text="<b>No. SK Tim Teknis</b>" dataIndex="nosktimteknis" width="150"/>
                            <Column text="<b>Nama</b>" dataIndex="namatimteknis" width="300" />
                            <Column text="<b>Kategori</b>" dataIndex="kategori" width="100" />
                            <Column text="<b>Posisi</b>" dataIndex="posisi" width="100" />
                        </Grid>

                        <Toolbar border shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button text="Batal" />
                            <Button text="Simpan" />
                        </Toolbar>

                    </Container>

                </Container>

                {/* Dialog-dialog penginputan data */}    

                {/* Dialog input data Maksud Paket Kegiatan */} 
                <Dialog 
                    displayed={this.state.showMaksudDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    width="600"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showMaksudDialog: false })}
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="300"
                    > 
                        <FormPanel flex="10" height="275">
                            <FieldSet title="Input Maksud Paket Kegiatan">
                                <TextAreaField 
                                    label="Maksud"
                                    value={this.state.maksud}
                                    width="500"
                                    maxRows={10}
                                />
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog>

                {/* Dialog input data Tujuan Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showTujuanDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    width="600"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showTujuanDialog: false })}
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="300"
                    > 
                        <FormPanel flex="10" height="275">
                            <FieldSet title="Input Tujuan Paket Kegiatan">
                                <TextAreaField 
                                    label="Tujuan"
                                    value={this.state.maksud}
                                    width="500"
                                    maxRows={10}
                                />
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog> 

                {/* Dialog input data Sasaran Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showSasaranDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    width="600"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showSasaranDialog: false })}
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: Ext.os.is.Phone ? 'vbox' : 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="300"
                    > 
                        <FormPanel flex="10" height="275">
                            <FieldSet title="Input Sasaran Paket Kegiatan">
                                <TextAreaField 
                                    label="Tujuan"
                                    value={this.state.maksud}
                                    width="500"
                                    maxRows={10}
                                />
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog>

                {/* Dialog input data Lingkup Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showLingkupDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    width="600"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showLingkupDialog: false })}
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="300"
                    > 
                        <FormPanel flex="10" height="275">
                            <FieldSet title="<h4>Input Lingkup Paket Kegiatan</h4>">
                                <TextAreaField 
                                    label="Lingkup"
                                    value={this.state.maksud}
                                    width="500"
                                    maxRows={10}
                                />
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog>

                {/* Dialog input data Keluaran Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showKeluaranDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    width="600"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showKeluaranDialog: false })}
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="300"
                    > 
                        <FormPanel height="275">
                            <FieldSet title="Input Keluaran Paket Kegiatan">
                                <TextField label="Luaran"/>
                                <TextField label="Jenis Keluaran"/>
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog>

                {/* Dialog input data Tenaga Ahli Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showTenagaAhliDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showTenagaAhliDialog: false })}
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
                         <FormPanel height="560">
                            <FieldSet title="Input Tenaga Ahli Paket Kegiatan">
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
                </Dialog> 

                {/* Dialog input data Tim Teknis Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showTimTeknisDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showTimTeknisDialog: false })}
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
                         <FormPanel height="560">
                            <FieldSet title="Input Tim Teknis Paket Kegiatan">
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
                </Dialog>

            </TabPanel>
        )
    }    
}