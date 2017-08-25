export default Ext.define('sipromo.model.AmandemenKontraktualPenyerapan', {
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