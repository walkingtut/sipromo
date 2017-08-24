export default Ext.define('sipromo.model.LengkapiKontraktualTimTeknis', {
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