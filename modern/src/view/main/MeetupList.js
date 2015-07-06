/**
 * List of meetups
 */
Ext.define('MunichJS.view.main.MeetupList', {
    extend: 'Ext.grid.Grid',
    xtype: 'meetuplist',

    requires: [
        'MunichJS.store.Meetup'
    ],

    columns: [
        { text: 'Date',  dataIndex: 'date', width: 100 },
        { text: 'Company', dataIndex: 'company', width: 130 },
        { text: 'Place', dataIndex: 'place', width: 185 }
    ],

    listeners: {
        select: 'onMeetupSelect'
    },

    store: {
        type: 'Meetup'
    }
});
