export default Ext.define('sipromo.model.Paket', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'tahun'},
        { name: 'namapaket' },
        { name: 'satker' },
        { name: 'namappk' },
        { name: 'penanggungjawab' },
        { name: 'nilaipaket', type: 'float' },
        { name: 'nokontrak' },
        { name: 'tglkontrak' },
        { name: 'jenispaket' },
        { name: 'durasikegiatan' },
        { name: 'satuandurasi' },
        { name: 'nospmk' },
        { name: 'penyediajasa' },
        { name: 'tanggalpenyelesaian' },
        { name: 'dir' },
        { name: 'rating' }
    ]
});