export default Ext.define('sipromo.model.DetailTahapan', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'urutantahapan' },
        { name: 'tahapan' },
    ]
});