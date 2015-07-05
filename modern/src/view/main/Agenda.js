//Meetup details view, show list of Talks
Ext.define('MunichJS.view.main.Agenda', {
    extend: 'Ext.Panel',
    xtype: 'agenda',
    requires: [
        'MunichJS.view.main.MeetupModel'
    ],
    viewModel: 'meetup',

    reference: 'agenda',
    layout: {
        type: 'hbox'
    },

    constructor: function (config) {
        config.items = [

        {
            xtype: 'titlebar',
            docked: 'top',
            bind: {
                title: 'Agenda for {meetup.date}'
            }
        },
        {
            xtype: 'dataview',
            reference: 'talklist',
            itemSelector: 'div.talk',
            bind: {
                store: '{talks}'
            },
            flex: 1,
            itemTpl:  new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="talk">',
                '<span class="topic">{topic}</span>',
                '<tpl if="duration">, <span class="duration">{duration}</span></tpl>',
                '<tpl for="presenters">',
                '<div class="name">{name}</div>',
                '</tpl>',
                '<div class="description">{description}</div>',
                '</div>',
                '</tpl>'
            )
        }
        ];
        this.callParent([config]);
    }
});

