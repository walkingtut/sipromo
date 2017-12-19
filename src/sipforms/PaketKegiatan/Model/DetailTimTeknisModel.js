export default Ext.define('sipromo.model.DetailTimTeknis', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'kodepaket' },
        { name: 'nosktimteknis' },
        { name: 'namatimteknis' },
        { name: 'kategori' },
        { name: 'posisi' },
    ]
});