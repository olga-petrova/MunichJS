/**
 View Controller for Modern view
 show meetup details for selected meetup
 */
Ext.define('MunichJS.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'MunichJS.view.main.Agenda'
    ],

    alias: 'controller.main',

    stores: ['MunichJS.store.Meetup'],


    onMeetupSelect: function(sender, meetup) {
        var talksStore = meetup.talks(),
            refs = this.getReferences(),
            agenda = refs.navigationview.push({
                xtype: 'agenda',
                flex: 1,
                styleHtmlContent: true
            });

        agenda.getViewModel().set('meetup', meetup);
        agenda.getViewModel().set('talks', talksStore);
    }
});
