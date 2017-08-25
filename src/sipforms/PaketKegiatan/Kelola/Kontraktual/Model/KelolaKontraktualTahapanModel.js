export default Ext.define('sipromo.model.KelolaKontraktualTahapan', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'urutantahapan' },
        { name: 'tahapan' },
    ]
});