/**
 * List of meetups
 */
Ext.define('MunichJS.view.main.MeetupList', {
    extend: 'Ext.grid.Panel',
    xtype: 'meetuplist',

    title: 'Meetups',

    columns: [
        { text: 'Date',  dataIndex: 'date' },
        { text: 'Company', dataIndex: 'company', flex: 1 },
        { text: 'Place', dataIndex: 'place', flex: 1 }
    ],

    store: {
        type: 'Meetup'
    }
});
