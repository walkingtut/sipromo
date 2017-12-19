export default Ext.define('sipromo.model.DetailPenyerapan', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'rencanapenyerapan' },
        { name: 'tanggalpencairan' },
        { name: 'persentase' },
        { name: 'dokumenpendukung' },
    ]
});