export default Ext.define('sipromo.model.DetailKeluaran', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'luaran' },
        { name: 'jenisluaran' },
    ]
});