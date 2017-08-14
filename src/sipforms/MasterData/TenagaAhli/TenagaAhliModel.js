export default Ext.define('sipromo.model.TenagaAhli', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'nama' },
        { name: 'pendidikanTerakhir' },
        { name: 'kualifikasi' },
        { name: 'lamaPengalaman' },
        { name: 'sertifikatKeahlian' },
        { name: 'billingRate' }
    ]
});
