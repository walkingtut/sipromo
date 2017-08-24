export default Ext.define('sipromo.model.LengkapiSwakelolaTimTeknis', {
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

