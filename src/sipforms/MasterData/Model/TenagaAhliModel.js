export default Ext.define('sipromo.model.TenagaAhli', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'nama' },
        { name: 'pendidikanTerakhir' },
        { name: 'jurusan' },
        { name: 'keahlian' },
        { name: 'lamaPengalaman' },
        { name: 'sertifikatKeahlian' },
        { name: 'billingRate' }
    ]
});
