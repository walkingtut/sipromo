export default Ext.define('sipromo.model.PembuatKomitmen', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name' },
        {
            name: 'phone', 
            validators: [{ 
                type: 'format', 
                matcher: /^\d{3}-?\d{3}-?\d{4}$/,
                message: 'Must be in the format xxx-xxx-xxxx'
            }]
        },
        { name: 'price', type: 'float'},
        { name: 'priceChange', type: 'float' },
        { name: 'priceChangePct', type: 'float' },
        { name: 'priceLastChange', type: 'date', dateReadFormat: 'n/j' },
        
         // Calculated field, recalculated when price changes
        {
            name: 'lastChange',
            type: 'date',
            calculate: function(data) {
                // Signal that we are dependent upon price so we get recaulculated when price changes
                data.price;

                return new Date();
            }
        },
    ]
});

