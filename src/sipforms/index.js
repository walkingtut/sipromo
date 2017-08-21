// Master Data
import Direktorat from './MasterData/Direktorat/Direktorat';
import TenagaAhli from './MasterData/TenagaAhli/TenagaAhli';
import PembuatKomitmen from './MasterData/PembuatKomitmen/PembuatKomitmen';
import Satker from './MasterData/Satker/Satker';
import TimTeknis from './MasterData/TimTeknis/TimTeknis';

// Paket Kegiatan
import DaftarSeluruhPaket from './PaketKegiatan/DaftarPaket/DaftarSeluruhPaket';
import DaftarPaketKontraktual from './PaketKegiatan/DaftarPaket/DaftarPaketKontraktual';
import DaftarPaketSwakelola from './PaketKegiatan/DaftarPaket/DaftarPaketSwakelola';
import KelolaKontraktual from './PaketKegiatan/Kelola/KelolaKontraktual';
import KelolaSwakelola from './PaketKegiatan/Kelola/KelolaSwakelola';
import LengkapiKontraktual from './PaketKegiatan/Lengkapi/LengkapiKontraktual';
import LengkapiSwakelola from './PaketKegiatan/Lengkapi/LengkapiSwakelola';
import AmandemenKontraktual from './PaketKegiatan/Amandemen/AmandemenKontraktual';
import AmandemenSwakelola from './PaketKegiatan/Amandemen/AmandemenSwakelola';

const root = {
    id: '/',
    text: 'Menu',
    children: [
        { text: 'Master Data', navIcon: 'icon-basic-list', children: [
            {text: 'Direktorat', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'},
            {text: 'Tenaga Ahli', component: TenagaAhli, layout: 'center', navIcon: 'icon-buttons'},
            {text: 'PPK', component: PembuatKomitmen, layout: 'center', navIcon: 'icon-buttons'},
            {text: 'Satker', component: Satker, layout: 'center', navIcon: 'icon-buttons'},
            {text: 'Tim Teknis', component: TimTeknis, layout: 'center', navIcon: 'icon-buttons'}
        ]},
        { text: 'Paket Kegiatan', navIcon: 'icon-basic-list', children: [
            {text: 'Daftar Paket Kegiatan', layout: 'center', navIcon: 'icon-basic-list', children: [
                {text: 'Seluruh Paket Kegiatan', component: DaftarSeluruhPaket, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Kontraktual', component: DaftarPaketKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: DaftarPaketSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},            
            {text: 'Lengkapi Data', layout: 'center', navIcon: 'icon-basic-list', children: [
                {text: 'Kontraktual', component: LengkapiKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: LengkapiSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Kelola Kegiatan', layout: 'center', navIcon: 'icon-buttons', children: [
                {text: 'Kontraktual', component: KelolaKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: KelolaSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Amandemen Kegiatan', layout: 'center', navIcon: 'icon-buttons', children: [
                {text: 'Kontraktual', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'}
            ]},         
        ]},   
        { text: 'Manajemen Resiko', navIcon: 'icon-basic-list', children: [
                {text: 'Daftar Paket Beresiko', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'}
        ]},  
        { text: 'Kalender', navIcon: 'icon-basic-list', children: [
            {text: 'Harian', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'},
            {text: 'Mingguan', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'},
            {text: 'Bulanan', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'}
        ]}, 
        { text: 'Statistik', navIcon: 'icon-basic-list', children: [
        ]},                     
        { text: 'Laporan', navIcon: 'icon-basic-list', children: [
        ]},   
                       
    ]
};

function transform(node, parentUrl) {
    node.leaf = !node.hasOwnProperty('children');
    node.iconCls = node.navIcon;

    if (node.text && !node.id) {
        node.id = (parentUrl === '/' ? '' : parentUrl) + '/' + node.text.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '');
    }

    node.name = node.text;

    if (node.children) {
        node.children = node.children.filter(node => !node.hidden);
        node.children.forEach(child => transform(child, node.id))
    }
}

transform(root); 

export default root;