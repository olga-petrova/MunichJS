/**
 * This class is the main modern view for the application.
 */
Ext.define('MunichJS.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',
        'Ext.navigation.View',

        'MunichJS.view.main.MainController',
        'MunichJS.view.main.MainModel',
        'MunichJS.view.main.MeetupList',
        'MunichJS.view.main.Chart'
    ],

    controller: 'main',

    tabBarPosition: 'bottom',

    items: [
        {
            xtype: 'navigationview',
            reference: 'navigationview',
            iconCls: 'meetup',
            title: 'Meetup',
            styleHtmlContent: true,
            items: [{
                viewModel: 'main',
                bind: {
                    title: '{firstTabTitle}'
                },
                xtype: 'meetuplist'
            }]
        },{
            xtype: 'meetupchart',
            iconCls: 'chart',
            title: 'Chart'
        }
    ]
});
