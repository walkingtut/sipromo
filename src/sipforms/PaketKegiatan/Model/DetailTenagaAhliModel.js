export default Ext.define('sipromo.model.DetailTenagaAhli', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'namatenagaahli' },
        { name: 'posisi' },
        { name: 'pendidikanterakhir' },
        { name: 'kualifikasi' },
        { name: 'durasipengalaman' },
        { name: 'sertifikatkeahlian' },
        { name: 'billingrate' },
        { name: 'durasikontrak' },
    ]
});