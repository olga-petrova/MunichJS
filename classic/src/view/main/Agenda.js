//Meetup details view, show list of Talks
Ext.define('MunichJS.view.main.Agenda', {
    extend: 'Ext.panel.Panel',
    xtype: 'agenda',
    requires: [
        'MunichJS.view.main.MeetupModel'
    ],
    viewModel: 'meetup',

    //data binding for date
    bind: {
        title: 'Agenda for {meetup.date}'
    },
    reference: 'agenda',

    items: [{
        xtype: 'dataview',
        reference: 'talklist',
        //data binding for store
        bind: {
            store: '{talks}'
        },
        itemSelector: 'div.talk',
        tpl : new Ext.XTemplate(
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
    }]
});

