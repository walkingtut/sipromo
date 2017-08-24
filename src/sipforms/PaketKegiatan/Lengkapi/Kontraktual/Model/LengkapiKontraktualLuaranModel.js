export default Ext.define('sipromo.model.LengkapiKontraktualLuaran', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'luaran' },
        { name: 'jenisluaran' },
    ]
});