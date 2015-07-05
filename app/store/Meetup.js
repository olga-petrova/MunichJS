Ext.define('MunichJS.store.Meetup', {
    extend: 'Ext.data.Store',
    storeId: 'Meetup',

    alias: 'store.Meetup',

    model: 'MunichJS.model.Meetup',

    proxy: {
        type: 'ajax',
        url: 'app/data/meetup.json',
        reader: {
            type: 'json',
            rootProperty: 'meetup'
        }
    }
});
