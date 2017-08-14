// Master Data
import Direktorat from './MasterData/Direktorat/Direktorat';
import TenagaAhli from './MasterData/TenagaAhli/TenagaAhli';
import PembuatKomitmen from './MasterData/PembuatKomitmen/PembuatKomitmen';
import Satker from './MasterData/Satker/Satker';
import TimTeknis from './MasterData/TimTeknis/TimTeknis';

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
            {text: 'Lengkapi Data', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list', children: [
                {text: 'Kontraktual', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Kelola Kegiatan', component: TenagaAhli, layout: 'center', navIcon: 'icon-buttons', children: [
                {text: 'Kontraktual', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'},
                {text: 'Swakelola', component: Direktorat, layout: 'center', navIcon: 'icon-basic-list'}
            ]},
            {text: 'Amandemen Kegiatan', component: PembuatKomitmen, layout: 'center', navIcon: 'icon-buttons', children: [
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