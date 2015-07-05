//Global application controller
//load Meetup Store on Meetup Grid render
Ext.define('MunichJS.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'main.Main'
    ],

    stores: ['Meetup'],

    init: function() {
        this.control({
            'meetuplist' : {
                activate: this.loadMeetups,
                render: this.loadMeetups
            }
        });
    },

    loadMeetups: function (grid) {
        grid.getStore().load();
    }
});