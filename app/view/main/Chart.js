
Ext.define('MunichJS.view.main.Chart', {
    extend: 'Ext.chart.CartesianChart',
    requires: [
        'Ext.chart.axis.sprite.Axis3D',
        'Ext.chart.axis.Axis3D',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.axis.Category3D',
        'Ext.chart.series.Bar3D',
        'Ext.chart.grid.HorizontalGrid3D',
        'Ext.chart.interactions.ItemHighlight'
    ],
    xtype: 'meetupchart',

    layout: 'fit',

    store: {
        type: 'Meetup',
        autoLoad: true
    },

    platformConfig: {
        desktop: {
            height: 500,
            width: 1000
        }
    },

    engine: 'Ext.draw.engine.Canvas',
    innerPadding: {top: 20, left: 10, right: 20, bottom: 10},
    axes: [{
        type: 'numeric3d',
        position: 'left',
        fields: ['going'],
        minimum: 0,
        maximum: 200,
        style: {
            lineWidth: 2,
            stroke: '#888'
        },
        label: {
            color: '#888',
            fontFamily: 'helvetica,arial,verdana,sans-serif',
            fontSize: 16
        },
        grid: {
            stroke: '#CCC',
            lineWidth: 1
        },
        enlargeEstStepSizeByText: true,
        majorTickSteps: 5
    }, {
        type: 'category3d',
        position: 'bottom',
        fields: ['date'],
        style: {
            lineWidth: 2,
            stroke: '#888'
        },
        label: {
            color: '#888',
            fontFamily: 'helvetica,arial,verdana,sans-serif',
            fontSize: 16
        },
        grid: false,
        enlargeEstStepSizeByText: true,
        majorTickSteps: 5
    }],
    series: {
        xField: 'date',
        yField: 'going',
        type: 'bar3d',
        style: {
            stroke: '#005a99',
            fill: '#005a99'
        }
    }
});
