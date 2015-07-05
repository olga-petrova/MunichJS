//ViewModel
//contains selected meetup data
Ext.define('MunichJS.view.main.MeetupModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.meetup',

    data: {
        meetup: null
    },

    stores: {
        talks: {}
    }

});
