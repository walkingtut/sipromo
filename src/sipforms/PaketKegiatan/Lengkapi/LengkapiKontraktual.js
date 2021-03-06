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
import model from '../PaketModel';
import modelMaksud from '../Model/DetailMaksudModel';
import modelTujuan from '../Model/DetailTujuanModel';
import modelSasaran from '../Model/DetailSasaranModel';
import modelLingkup from '../Model/DetailLingkupModel';
import modelKeluaran from '../Model/DetailKeluaranModel';
import modelTenagaAhli from '../Model/DetailTenagaAhliModel';
import modelTimTeknis from '../Model/DetailTimTeknisModel';

import tenagaahli from '../../../../resources/data/TenagaAhliData.json';

import colors from '../../colors';

Ext.require([
    'Ext.grid.plugin.ViewOptions',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Sum',
    'Ext.Toast',
    'Ext.MessageBox'
]);

class LengkapiKontraktual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMaksudDialog: false,
            showTujuanDialog: false,
            showSasaranDialog: false,
            showLingkupDialog: false,
            showKeluaranDialog: false,
            showAddTenagaAhliDialog: false,
            showEditTenagaAhliDialog: false,
            showTimTeknisDialog: false,
            judul: "Pilihlah paket kegiatan terlebih dahulu untuk menginput data pada tab ini",
            /* List of Data */
            kodepaket: "",
            maksud: "",
            tujuan: "",
            sasaran: "",
            lingkup: "",
            keluaran: "",
            keluaranjenis: "",
            tanama: "",
            tapendidikanterakhir: "",
            tajurusan: "",
            takualifikasi: "",
            talamapengalaman: "",
            tasertifikatkeahlian: "",
            talamakontrak: "",
            ttnosk: "",
            ttnama: "",
            ttkategori: "",
            ttposisi: "",
            /* Other flags */
            paketChoosen: false,
            showAlert: false
        };

        this.onPilih = this.onPilih.bind(this);
        this.onConfirmResult = this.onConfirmResult.bind(this);
        this.onBatal = this.onBatal.bind(this);
        this.onSimpan = this.onSimpan.bind(this);

        this.onAddMaksud = this.onAddMaksud.bind(this);
        this.onAddTujuan = this.onAddTujuan.bind(this);
        this.onAddSasaran = this.onAddSasaran.bind(this);
        this.onAddLingkup = this.onAddLingkup.bind(this);
        this.onAddKeluaran = this.onAddKeluaran.bind(this);
        this.onAddTA = this.onAddTA.bind(this);
        this.onAddTT = this.onAddTT.bind(this);

        this.onEditMaksud = this.onEditMaksud.bind(this);
        this.onEditTujuan = this.onEditTujuan.bind(this);
        this.onEditSasaran = this.onEditSasaran.bind(this);
        this.onEditLingkup = this.onEditLingkup.bind(this);
        this.onEditKeluaran = this.onEditKeluaran.bind(this);
        this.onEditTA = this.onEditTA.bind(this);
        this.onEditTT = this.onEditTT.bind(this);

        this.onDeleteMaksud = this.onDeleteMaksud.bind(this);
        this.onDeleteTujuan = this.onDeleteTujuan.bind(this);
        this.onDeleteSasaran = this.onDeleteSasaran.bind(this);
        this.onDeleteLingkup = this.onDeleteLingkup.bind(this);
        this.onDeleteKeluaran = this.onDeleteKeluaran.bind(this);
        this.onDeleteTA = this.onDeleteTA.bind(this);
        this.onDeleteTT = this.onDeleteTT.bind(this);

        this.onNamaTenagaAhliChange = this.onNamaTenagaAhliChange.bind(this);
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

    storeMaksud = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelMaksud,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketMaksudData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storeTujuan = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTujuan,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketTujuanData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storeSasaran = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelSasaran,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketSasaranData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storeLingkup = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelLingkup,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketLingkupData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storeKeluaran = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelKeluaran,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketKeluaranData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storeTenagaAhli = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTenagaAhli,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketTenagaAhliData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
    });

    storeTimTeknis = Ext.create('Ext.data.Store', {
        autoLoad: true,
        modelTimTeknis,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/PaketTimTeknisData.json'
        },
        filters: [{
            property: 'kodepaket',
            value: '0000'
        }]
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
        this.storeMaksud.filter('kodepaket', this.state.kodepaket);
        this.storeTujuan.filter('kodepaket', this.state.kodepaket);
        this.storeSasaran.filter('kodepaket', this.state.kodepaket);
        this.storeLingkup.filter('kodepaket', this.state.kodepaket);
        this.storeKeluaran.filter('kodepaket', this.state.kodepaket);
        this.storeTenagaAhli.filter('kodepaket', this.state.kodepaket);
        this.storeTimTeknis.filter('kodepaket', this.state.kodepaket);
        this.setState({ paketChoosen: true });
    }

    onConfirmResult(buttonId, value, opt) {
        if (buttonId == 'yes') {
            Ext.toast('User clicked yes button');
        } else {
            Ext.toast('User clicked no button');
        }
        /*Ext.toast(`User clicked ${buttonId} button.`);*/
    }

    /* Batal input */

    onBatal = () => {    
        if (this.state.showMaksudDialog) {
            this.setState({ showMaksudDialog: false});
            this.setState({maksud: ""});
            Ext.toast({message: 'Penginputan MAKSUD Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showTujuanDialog) {
            this.setState({ showTujuanDialog: false});
            this.setState({tujuan: ""});
            Ext.toast({message: 'Penginputan TUJUAN Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showSasaranDialog) {
            this.setState({ showSasaranDialog: false});
            this.setState({sasaran: ""});
            Ext.toast({message: 'Penginputan SASARAN Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showLingkupDialog) {
            this.setState({ showLingkupDialog: false});
            this.setState({lingkup: ""});
            Ext.toast({message: 'Penginputan LINGKUP Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showKeluaranDialog) {
            this.setState({ showKeluaranDialog: false});
            this.setState({keluaran: "", jeniskeluaran: ""});
            Ext.toast({message: 'Penginputan KELUARAN Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showAddTenagaAhliDialog) {
            this.setState({ showAddTenagaAhliDialog: false});
            Ext.toast({message: 'Penginputan TENAGA AHLI Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showEditTenagaAhliDialog) {
            this.setState({ showEditTenagaAhliDialog: false});
            Ext.toast({message: 'Pengeditan TENAGA AHLI Paket Kegiatan dibatalkan', timeout: 2000});
        } else if (this.state.showTimTeknisDialog) {
            this.setState({ showTimTeknisDialog: false});
            Ext.toast({message: 'Penginputan TIM TEKNIS Paket Kegiatan dibatalkan', timeout: 2000});
        }    
    }

    /* Simpan input */

    onSimpan = () => {
        if (this.state.showMaksudDialog) {

            this.setState({ showMaksudDialog: false});
        }
    }

    /* Data Maksud */
    onAddMaksud = () => {
        if (this.state.paketChoosen) {
            this.setState({ showMaksudDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        }  
    }

    onEditMaksud = (grid, info) => {
        if (this.state.paketChoosen) {
            this.setState({maksud: info.record.data.maksud});
            this.setState({ showMaksudDialog: true });
        } else {
            //alert
            this.setState({showAlert: true});
        }
    }

    onDeleteMaksud = (grid, info) => {
    }

    /* Data Tujuan */
    onAddTujuan = () => { 
        if (this.state.paketChoosen) {
            this.setState({ showTujuanDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        }          
    }

    onEditTujuan = (grid, info) => {
        if (this.state.paketChoosen) {
            this.setState({tujuan: info.record.data.tujuan});
            this.setState({ showTujuanDialog: true });
        } else {
            //alert
            this.setState({showAlert: true});
        }
    }

    onDeleteTujuan = (grid, info) => {
    }

     /* Data Sasaran */
    onAddSasaran = () => {
        if (this.state.paketChoosen) {
            this.setState({ showSasaranDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        } 
    }

    onEditSasaran = (grid, info) => {
        if (this.state.paketChoosen) {
            this.setState({sasaran: info.record.data.sasaran});
            this.setState({ showSasaranDialog: true });
        } else {
            //alert
            this.setState({showAlert: true});
        }
    }

    onDeleteSasaran = (grid, info) => {
    }

    /* Data Lingkup */
    onAddLingkup = () => {
        if (this.state.paketChoosen) {
            this.setState({ showLingkupDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        } 
    }

    onEditLingkup = (grid, info) => {
        if (this.state.paketChoosen) {
            this.setState({lingkup: info.record.data.lingkup});
            this.setState({ showLingkupDialog: true });
        } else {
            //alert
            this.setState({showAlert: true});
        }
    }

    onDeleteLingkup = (grid, info) => {
    }

    /* Data Keluaran */
    onAddKeluaran = () => { 
        if (this.state.paketChoosen) {
            this.setState({ showKeluaranDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        } 
    }

    onEditKeluaran = (grid, info) => {
        if (this.state.paketChoosen) {
            this.setState({keluaran: info.record.data.keluaran});
            this.setState({jeniskeluaran: info.record.data.keluaranje});
            this.setState({ showKeluaranDialog: true });
        } else {
            //alert
            this.setState({showAlert: true});
        }
    }

    onDeleteKeluaran = (grid, info) => {
    }

    /* Data Tenaga Ahli */
    onAddTA = () => {
        if (this.state.paketChoosen) {
            this.setState({ showAddTenagaAhliDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        }
    }

    onEditTA = (grid, info) => {
        if (this.state.paketChoosen) {
            this.setState({tanama: info.record.data.namatenagaahli});
            this.setState({tapendidikanterakhir: info.record.data.pendidikanterakhir});
            this.setState({takualifikasi: info.record.data.kualifikasi});
            this.setState({tasertifikatkeahlian: indexOf.record.data.sertifikatkeahlian});
            this.setState({ showSasaranDialog: true });
        } else {
            //alert
            this.setState({showAlert: true});
        }
    }

    onDeleteTA = (grid, info) => {
    }
    
    /* Data Tim Teknis */
    onAddTT = () => {
        if (this.state.paketChoosen) {
            this.setState({ showTimTeknisDialog: true });
        } else {
            // alert
            this.setState({showAlert: true});
        }
    }    

    onEditTT = (grid, info) => {
        this.setState({ showMaksudDialog: true });
    }

    onDeleteTT = (grid, info) => {
    }

    onNamaTenagaAhliChange = () => {
        console.log('Combobox changed ');
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

                {/* Tab Info Dasar: Maksud, Tujuan, dan Sasaran */}
                <Container title="Maksud & Tujuan"
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
                        <Grid store={this.storeMaksud} grouped flex="5" border>
                            <TitleBar docked="top">
                                <Button text="Maksud"/>
                                <Button text="+Tambah" handler={this.onAddMaksud}/>
                            </TitleBar>
                            <Column text="<b>Maksud</b>" dataIndex="maksud" width="475"/>
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

                        <Grid store={this.storeTujuan} grouped flex="5" border>
                            <TitleBar docked="top">
                                <Button text="Tujuan"/>
                                <Button text="+Tambah" handler={this.onAddTujuan}/>
                            </TitleBar>
                            <Column text="<b>Tujuan</b>" dataIndex="tujuan" width="475"/>
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditTujuan
                                        },
                                        minus: {
                                            handler: this.onDeletetTujuan
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

                {/* Tab Ruang Lingkup kegiatan */}
                <Container title="Sasaran dan Lingkup"
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
                        <Grid store={this.storeSasaran} grouped flex="5" border>
                            <TitleBar docked="top">
                                <Button text="Sasaran"/>
                                <Button text="+Tambah" handler={this.onAddSasaran}/>
                            </TitleBar>
                            <Column text="<b>Sasaran</b>" dataIndex="sasaran" width="475"/>
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditSasaran
                                        },
                                        minus: {
                                            handler: this.onDeleteSasaran
                                        }
                                    }}
                                />
                                <ToolTip showOnTap align="tl-tr" anchorToTarget anchor>
                                    <p>Pilih tombol aksi untuk (+) menambah, (o) mengubah, atau (-) menghapus record</p>
                                    <p>Anda akan mendapati dialog untuk melakukan fungsi yang Anda pilih</p>
                                </ToolTip>
                            </Column>
                        </Grid>

                        <Grid store={this.storeLingkup} shadow grouped flex="5" height="337">
                            <TitleBar docked="top">
                                <Button text="Lingkup"/>
                                <Button text="+Tambah" handler={this.onAddLingkup}/>
                            </TitleBar>
                            <Column text="<b>Ruang Lingkup</b>" dataIndex="lingkup" width="475"/>
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditLingkup
                                        },
                                        minus: {
                                            handler: this.onDeleteLingkup
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
                        <Grid store={this.storeKeluaran} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Keluaran"/>
                                <Button text="+Tambah" handler={this.onAddKeluaran}/>
                            </TitleBar>
                            <Column text="<b>Keluaran</b>" width="550" dataIndex="luaran"/>
                            <Column text="<b>Jenis Keluaran</b>" width="150" dataIndex="jenisluaran"/>
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditKeluaran
                                        },
                                        minus: {
                                            handler: this.onDeleteKeluaran
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
                        <Grid store={this.storeTenagaAhli} shadow grouped flex="10" height="337">
                            <TitleBar docked="top">
                                <Button text="Tenaga Ahli"/>
                                <Button text="+Tambah" handler={this.onAddTA}/>
                            </TitleBar>
                            <Column text="<b>Nama Tenaga Ahli</b>" width="250" dataIndex="namatenagaahli" />
                            <Column text="<b>Pendidikan Terakhir</b>" width="100" dataIndex="pendidikanterakhir"/>
                            <Column text="<b>Lama Kontrak (Bln)</b>" dataIndex="durasikontrak" width="200" align="right"/>
                            <Column text="<b>Kualifikasi</b>" dataIndex="kualifikasi" width="200"/>
                            <Column text="<b>Lama Pengalaman (Thn)</b>" width="170" dataIndex="durasipengalaman" align="right"/>
                            <Column text="<b>Sertifikat Keahlian</b>" width="150" dataIndex="sertifikatkeahlian"/>        
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditTA
                                        },
                                        minus: {
                                            handler: this.onDeleteTA
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
                        <Grid store={this.storeTimTeknis} shadow grouped flex="6" height="337">
                            <TitleBar docked="top">
                                <Button text="Tim Teknis"/>
                                <Button text="+Tambah" handler={this.onAddTT}/>
                            </TitleBar>
                            <Column text="<b>No. SK Tim Teknis</b>" dataIndex="nosktimteknis" width="150"/>
                            <Column text="<b>Nama</b>" dataIndex="namatimteknis" width="300" />
                            <Column text="<b>Kategori</b>" dataIndex="kategori" width="100" />
                            <Column text="<b>Posisi</b>" dataIndex="posisi" width="100" />
                            <Column text="<b>Aksi</b>" width="80" >
                                <GridCell align="center"
                                    tools={{
                                        refresh: {
                                            handler: this.onEditTT
                                        },
                                        minus: {
                                            handler: this.onDeleteTT
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

                {/* Dialog Alert */}
                <Dialog 
                    displayed={this.state.showAlert}
                    title="Peringatan"
                    closeAction="hide"
                    bodyPadding="15"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showAlert: false })}
                    width="500"
                >
                    <Container> 
                        <h3>Silakan memilih paket kegiatan terlebih dahulu sebelum Anda dapat
                        menginputkan data ke dalam detail paket kegiatan. Untuk melakukannya
                        Anda dapat kembali pada tab Daftar Paket Kegiatan, dan memilih salah
                        satu paket kegiatan yang diinginkan.</h3>
                        <Toolbar shadow={true} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                            <Button itemId="ok" text="OK" handler={() => this.setState({showAlert: false})} />
                        </Toolbar>
                    </Container> 
                </Dialog>

                {/* Dialog input data Maksud Paket Kegiatan */} 
                <Dialog 
                    displayed={this.state.showMaksudDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    width="800"
                    defaultFocus="#simpan"
                    onHide={() => this.setState({ showMaksudDialog: false })}
                >
                    <Container 
                        autoSize 
                        defaults={{ flex: 1, bodyPadding: 10, shadow: true, margin: 10 }} 
                        layout={{ type: 'hbox', pack: 'center', align: 'stretch' }}
                        flex={1}
                        height="300"
                        width="700"
                    > 
                        <FormPanel flex="10" height="275">
                            <FieldSet title="Input Maksud Paket Kegiatan">
                                <TextAreaField 
                                    label="Maksud"
                                    value={this.state.maksud}
                                    width="650"
                                    maxRows={10}
                                />
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" handler={this.onBatal}/>
                                <Button itemId="simpan" text="Simpan" handler={this.onSimpan} />
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
                    maskTapHandler={this.onHide}
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
                                    value={this.state.tujuan}
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
                                    value={this.state.sasaran}
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
                                    value={this.state.lingkup}
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
                                <TextField label="Keluaran" value={this.state.keluaran}/>
                                <TextField label="Jenis Keluaran" value={this.state.jeniskeluaran}/>
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
                    displayed={this.state.showAddTenagaAhliDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showAddTenagaAhliDialog: false })}
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
                                <ComboBoxField
                                    width={300}
                                    label="Nama Tenaga Ahli"
                                    store={tenagaahli}
                                    displayField="namatenagaahli"
                                    valueField="id"
                                    queryMode="local"
                                    labelAlign="placeholder"
                                    clearable
                                    onChange={() => this.onNamaTenagaAhliChange}
                                />
                                <TextField label="Pendidikan Terakhir" value={this.state.pendidikanterakhir}/>
                                <TextField label="Kualifikasi" value={this.state.kualifikasi}/>
                                <TextField label="Lama Pengalaman" value={this.state.lamapengalaman}/>
                                <TextField label="Sertifikat Keahlian" value={this.state.sertifikatkeahlian}/>
                                <TextField label="Lama Kontrak" value={this.state.lamakontrak}/>
                            </FieldSet>
                            <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                                <Button text="Batal" />
                                <Button text="Simpan" />
                            </Toolbar>
                        </FormPanel>
                    </Container> 
                </Dialog> 

                {/* Dialog Edit data Tenaga Ahli Paket Kegiatan */}
                <Dialog 
                    displayed={this.state.showEditTenagaAhliDialog}
                    title={this.state.judul}
                    closable
                    closeAction="hide"
                    maskTapHandler={this.onCancel}
                    bodyPadding="20"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showEditTenagaAhliDialog: false })}
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
                                <TextField label="Nama Tenaga Ahli" value={this.state.namatenagaahli}/>
                                <TextField label="Pendidikan Terakhir" value={this.state.pendidikanterakhir}/>
                                <TextField label="Kualifikasi" value={this.state.kualifikasi}/>
                                <TextField label="Lama Pengalaman" value={this.state.lamapengalaman}/>
                                <TextField label="Sertifikat Keahlian" value={this.state.sertifikatkeahlian}/>
                                <TextField label="Lama Kontrak" value={this.state.lamakontrak}/>
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

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(LengkapiKontraktual);