export default Ext.define('sipromo.model.LengkapiSwakelolaTenagaAhli', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'namatenagaahli' },
        { name: 'pendidikanterakhir' },
        { name: 'kualifikasi' },
        { name: 'durasipengalaman' },
        { name: 'sertifikatkeahlian' },
        { name: 'billingrate' },
        { name: 'durasikontrak' },
    ]
});

