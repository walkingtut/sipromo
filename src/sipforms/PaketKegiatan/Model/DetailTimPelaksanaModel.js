export default Ext.define('sipromo.model.DetailTimPelaksana', {
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