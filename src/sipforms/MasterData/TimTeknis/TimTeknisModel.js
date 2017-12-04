export default Ext.define('sipromo.model.TimTeknis', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'nama' },
        { name: 'nosktimteknis' },
        { name: 'kategori' },
        { name: 'posisi' }
    ]
});