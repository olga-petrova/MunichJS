/**
 * This class is the main classic view for the application.
 */
Ext.define('MunichJS.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'MunichJS.view.main.MainController',
        'MunichJS.view.main.MainModel',
        'MunichJS.view.main.MeetupList',
        'MunichJS.view.main.Agenda',
        'MunichJS.view.main.Chart'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,


    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            platformConfig: {
                desktop: {
                    text: 'MunichJS Application'
                },
                '!desktop': {
                    text: 'MunichJS App'
                }
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },


    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        bind: {
            title: '{firstTabTitle}'
        },
        iconCls: 'meetup',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'meetuplist',
            flex: 2
        },
            {
                xtype: 'agenda',
                flex: 3
            }]
    }, {
        bind: {
            title: '{secondTabTitle}'
        },
        iconCls: 'chart',
        items: [{
            xtype: 'meetupchart'
        }]
    }]
});



