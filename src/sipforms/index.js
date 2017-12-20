// Master Data
import Direktorat from './MasterData/Direktorat/Direktorat';
import TenagaAhli from './MasterData/TenagaAhli/TenagaAhli';
import PembuatKomitmen from './MasterData/PembuatKomitmen/PembuatKomitmen';
import Satker from './MasterData/Satker/Satker';
import TimTeknis from './MasterData/TimTeknis/TimTeknis';

// Paket Kegiatan
// Daftar Paket Kegiatan
import DaftarSeluruhPaket from './PaketKegiatan/DaftarPaket/DaftarSeluruhPaket';

// Lengkapi Paket Kegiatan
import LengkapiKontraktual from './PaketKegiatan/Lengkapi/LengkapiKontraktual';
import LengkapiSwakelola from './PaketKegiatan/Lengkapi/LengkapiSwakelola';

// Kelola Paket Kegiatan
import KelolaKontraktual from './PaketKegiatan/Kelola/KelolaKontraktual';
import KelolaSwakelola from './PaketKegiatan/Kelola/KelolaSwakelola';

// Amandemen Paket Kegiatan
import AmandemenKontraktual from './PaketKegiatan/Amandemen/AmandemenKontraktual';
import AmandemenSwakelola from './PaketKegiatan/Amandemen/AmandemenSwakelola';

// Amandemen Paket Kegiatan
import RealisasiKontraktual from './PaketKegiatan/Realisasi/RealisasiKontraktual';
import RealisasiSwakelola from './PaketKegiatan/Realisasi/RealisasiSwakelola';

// Manajemen Resiko
import PaketKontraktualResiko from './Resiko/PaketKontraktualResiko';
import PaketSwakelolaResiko from './Resiko/PaketSwakelolaResiko';
import ForumDiskusi from './Resiko/ForumDiskusi';

// Kalender
import TampilLengkap from './Kalender/Lengkap/TampilLengkap';

// Statistik
import JumlahPaketKontraktual from './Statistik/Paket/PerPPK/JumlahPaketKontraktual';
import JumlahPaketSwakelola from './Statistik/Paket/PerPPK/JumlahPaketSwakelola';
import ResikoKontraktual from './Statistik/Paket/PerPPK/ResikoKontraktual';
import ResikoSwakelola from './Statistik/Paket/PerPPK/ResikoSwakelola';
import NilaiPaketKontraktual from './Statistik/Paket/PerPPK/NilaiPaketKontraktual';
import NilaiPaketSwakelola from './Statistik/Paket/PerPPK/NilaiPaketSwakelola';

const root = {
    id: '/',
    text: 'Menu',
    children: [
        { text: 'Master Data', navIcon: 'icon-basic-list', children: [
            {text: 'Tenaga Ahli', component: TenagaAhli, layout: 'center', navIcon: 'icon-basic-list'},
            {text: 'PPK', component: PembuatKomitmen, layout: 'center', navIcon: 'icon-basic-list'},
            {text: 'Satker', component: Satker, layout: 'center', navIcon: 'icon-basic-list'},
            {text: 'Tim Teknis', component: TimTeknis, layout: 'center', navIcon: 'icon-basic-list'}
        ]},
        { text: 'Paket Kegiatan', navIcon: 'icon-basic-list', children: [
            {text: 'Daftar Paket Kegiatan', component: DaftarSeluruhPaket, layout: 'center', navIcon: 'icon-basic-list'},           
            {text: 'Lengkapi', navIcon: 'icon-basic-list', children: [
                {text: 'Kontraktual', component: LengkapiKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: LengkapiSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Kelola', navIcon: 'icon-basic-list', children: [
                {text: 'Kontraktual', component: KelolaKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: KelolaSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Amandemen', navIcon: 'icon-basic-list', children: [
                {text: 'Kontraktual', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Realisasi', navIcon: 'icon-basic-list', children: [
                {text: 'Kontraktual', component: RealisasiKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: RealisasiSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},    
        ]},   
        { text: 'Manajemen Resiko', component: PaketKontraktualResiko, layout: 'center', navIcon: 'icon-basic-list'},  
        { text: 'Kalender', component: TampilLengkap, layout: 'center', navIcon: 'icon-basic-list'}, 
        { text: 'Statistik', navIcon: 'icon-pie-charts', children: [
            { text: 'Kontraktual', layout: 'center', navIcon: 'icon-charts', children: [
                { text: 'Jumlah Paket per PPK', component: JumlahPaketKontraktual, navIcon: 'icon-bar-basic' },
                { text: 'Nilai Paket per PPK', component: NilaiPaketKontraktual, navIcon: 'icon-bar-stacked' },
                { text: 'Jumlah Total Paket dan Paket Beresiko', component: ResikoKontraktual, navIcon: 'icon-bar-stacked' } 
            ]},
            {text: 'Swakelola', layout: 'center', navIcon: 'icon-charts', children: [   
                { text: 'Jumlah Paket Swakelola per PPK', component: JumlahPaketSwakelola, navIcon: 'icon-bar-basic' }, 
                { text: 'Nilai Paket per PPK', component: NilaiPaketSwakelola, navIcon: 'icon-bar-stacked' },
                { text: 'Jumlah Total Paket dan Paket Beresiko', component: ResikoSwakelola, navIcon: 'icon-bar-stacked' }
            ]}
        ]},
        { text: 'Dashboard', layout: 'center', navIcon: 'icon-basic-list'}, 
    ]
};

function transform(node, parentUrl) {
    node.leaf = !node.hasOwnProperty('children');
    node.iconCls = node.navIcon;

    if (node.text && !node.id) {
        node.id = (parentUrl === '/' ? '' : parentUrl) + '/' + node.text.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '');
        //console.log(node.id);
    }

    node.name = node.text;

    if (node.children) {
        node.children = node.children.filter(node => !node.hidden);
        node.children.forEach(child => transform(child, node.id))
    }
}

transform(root); 

export default root;