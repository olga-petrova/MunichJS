/**
 View Controller for Classical view
 show meetup details for selected meetup
 */
Ext.define('MunichJS.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    control: {
        'meetuplist': {
            select: 'onMeetupSelect'
        }
    },

    onMeetupSelect: function(sender, meetup) {
       var talksStore = meetup.talks(),
           agenda = this.lookupReference('agenda');

       agenda.getViewModel().set('meetup', meetup);
       agenda.getViewModel().set('talks', talksStore);
    }
});
