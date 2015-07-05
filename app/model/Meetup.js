//Meetup model
//hasMany association with Talk model
Ext.define('MunichJS.model.Meetup', {
    extend: 'MunichJS.model.Base',
    requires: ['MunichJS.model.Talk'],

    fields: [
        {
            name: 'date',
            //parse date function
            convert: function (v) {
                return Ext.util.Format.date(Ext.Date.parse(v, 'F j, Y, H:i'), 'd.m.Y');
            }
        },
        'sponsors',
        'company',
        'place',
        'going',
        'comments'
    ],
    hasMany: 'Talk'
});