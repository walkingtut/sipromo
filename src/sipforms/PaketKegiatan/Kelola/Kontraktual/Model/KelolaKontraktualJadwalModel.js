export default Ext.define('sipromo.model.KelolaKontraktualJadwal', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'tahapan' },
        { name: 'jadwalkegiatan' },
        { name: 'tanggalmulai' },
        { name: 'tanggalselesai' },
    ]
});