export default Ext.define('sipromo.model.TimTeknis', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id' },
        { name: 'nama' },
        { name: 'sktimteknis' },
        { name: 'kategori' },
        { name: 'posisi' }
    ]
});