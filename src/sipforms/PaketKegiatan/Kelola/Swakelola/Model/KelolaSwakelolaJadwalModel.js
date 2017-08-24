export default Ext.define('sipromo.model.KelolaSwakelolaJadwal', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'namapaket' },
        { name: 'satker' },
        { name: 'namappk' },
        { name: 'penanggungjawab' },
        { name: 'nilaipaket' },
        { name: 'nokontrak' },
        { name: 'tglkontrak' },
        { name: 'jenispaket' },
        { name: 'durasikegiatan' },
        { name: 'nospmk' },
        { name: 'penyediajasa' },
        { name: 'tanggalpenyelesaian' },
    ]
});