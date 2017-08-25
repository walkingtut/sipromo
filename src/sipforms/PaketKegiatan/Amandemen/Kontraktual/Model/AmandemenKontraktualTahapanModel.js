export default Ext.define('sipromo.model.AmandemenKontraktualTahapan', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'urutantahapan' },
        { name: 'tahapan' },
    ]
});