export default Ext.define('sipromo.model.Direktorat', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest'
    ],
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
    ],

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: '/sipromo/Direktorat'
    },

    validators: {
        name: 'presence'
    },

});

