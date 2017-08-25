// Master Data
import Direktorat from './MasterData/Direktorat/Direktorat';
import TenagaAhli from './MasterData/TenagaAhli/TenagaAhli';
import PembuatKomitmen from './MasterData/PembuatKomitmen/PembuatKomitmen';
import Satker from './MasterData/Satker/Satker';
import TimTeknis from './MasterData/TimTeknis/TimTeknis';

// Paket Kegiatan
// Daftar Paket Kegiatan
import DaftarSeluruhPaket from './PaketKegiatan/DaftarPaket/DaftarSeluruhPaket';
import DaftarPaketKontraktual from './PaketKegiatan/DaftarPaket/DaftarPaketKontraktual';
import DaftarPaketSwakelola from './PaketKegiatan/DaftarPaket/DaftarPaketSwakelola';

// Lengkapi Paket Kegiatan
import LengkapiKontraktualMaksud from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualMaksud';
import LengkapiKontraktualTujuan from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualTujuan';
import LengkapiKontraktualSasaran from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualSasaran';
import LengkapiKontraktualLingkup from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualLingkup';
import LengkapiKontraktualLuaran from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualLuaran';
import LengkapiKontraktualTimTeknis from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualTimTeknis';
import LengkapiKontraktualTenagaAhli from './PaketKegiatan/Lengkapi/Kontraktual/LengkapiKontraktualTenagaAhli';

import LengkapiSwakelolaMaksud from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaMaksud';
import LengkapiSwakelolaTujuan from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaTujuan';
import LengkapiSwakelolaSasaran from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaSasaran';
import LengkapiSwakelolaLingkup from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaLingkup';
import LengkapiSwakelolaLuaran from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaLuaran';
import LengkapiSwakelolaTimTeknis from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaTimTeknis';
import LengkapiSwakelolaTenagaAhli from './PaketKegiatan/Lengkapi/Swakelola/LengkapiSwakelolaTenagaAhli';

// Kelola Paket Kegiatan
import KelolaKontraktualTahapan from './PaketKegiatan/Kelola/Kontraktual/KelolaKontraktualTahapan';
import KelolaKontraktualJadwal from './PaketKegiatan/Kelola/Kontraktual/KelolaKontraktualJadwal';
import KelolaKontraktualPenyerapan from './PaketKegiatan/Kelola/Kontraktual/KelolaKontraktualPenyerapan';

import KelolaSwakelolaTahapan from './PaketKegiatan/Kelola/Swakelola/KelolaSwakelolaTahapan';
import KelolaSwakelolaJadwal from './PaketKegiatan/Kelola/Swakelola/KelolaSwakelolaJadwal';
import KelolaSwakelolaPenyerapan from './PaketKegiatan/Kelola/Swakelola/KelolaSwakelolaPenyerapan';

// Amandemen Paket Kegiatan
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
                {text: 'Kontraktual', layout: 'center', navIcon: 'icon-basic-list', children: [
                    {text: 'Maksud', component: LengkapiKontraktualMaksud, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tujuan', component: LengkapiKontraktualTujuan, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Sasaran', component: LengkapiKontraktualSasaran, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Lingkup Kegiatan', component: LengkapiKontraktualLingkup, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Luaran', component: LengkapiKontraktualLuaran, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tenaga Ahli', component: LengkapiKontraktualTenagaAhli, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tim Teknis', component: LengkapiKontraktualTimTeknis, layout: 'center', navIcon: 'icon-basic-list'}
                ]},
                {text: 'Swakelola', layout: 'center', navIcon: 'icon-basic-list', children: [
                    {text: 'Maksud', component: LengkapiSwakelolaMaksud, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tujuan', component: LengkapiSwakelolaTujuan, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Sasaran', component: LengkapiSwakelolaSasaran, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Lingkup Kegiatan', component: LengkapiSwakelolaLingkup, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Luaran', component: LengkapiSwakelolaLuaran, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tenaga Ahli', component: LengkapiSwakelolaTenagaAhli, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tim Teknis', component: LengkapiSwakelolaTimTeknis, layout: 'center', navIcon: 'icon-basic-list'}
                ]}
            ]},
            {text: 'Kelola Kegiatan', layout: 'center', navIcon: 'icon-buttons', children: [
                {text: 'Kontraktual', layout: 'center', navIcon: 'icon-basic-list', children: [
                    {text: 'Tahapan Kegiatan', component: KelolaKontraktualTahapan, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Jadwal Kegiatan', component: KelolaKontraktualJadwal, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Rencana Penyerapan', component: KelolaKontraktualPenyerapan, layout: 'center', navIcon: 'icon-basic-list'}
                ]},
                {text: 'Swakelola', layout: 'center', navIcon: 'icon-basic-list', children: [
                    {text: 'Tahapan Kegiatan', component: KelolaSwakelolaTahapan, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Jadwal Kegiatan', component: KelolaSwakelolaJadwal, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Rencana Penyerapan', component: KelolaKontraktualPenyerapan, layout: 'center', navIcon: 'icon-basic-list'}
                ]}
            ]},
            {text: 'Amandemen Kegiatan', layout: 'center', navIcon: 'icon-buttons', children: [
                {text: 'Kontraktual', layout: 'center', navIcon: 'icon-basic-list', children: [
                    {text: 'Maksud', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tujuan', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Sasaran', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Lingkup Kegiatan', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Luaran', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tenaga Ahli', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tim Teknis', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tahapan Kegiatan', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Jadwal Kegiatan', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Rencana Penyerapan', component: AmandemenKontraktual, layout: 'center', navIcon: 'icon-basic-list'}
                ]},
                {text: 'Swakelola', layout: 'center', navIcon: 'icon-basic-list', children: [
                    {text: 'Maksud', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tujuan', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Sasaran', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Lingkup Kegiatan', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Luaran', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tenaga Ahli', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tim Teknis', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Tahapan Kegiatan', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Jadwal Kegiatan', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'},
                    {text: 'Rencana Penyerapan', component: AmandemenSwakelola, layout: 'center', navIcon: 'icon-basic-list'}
                ]}
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