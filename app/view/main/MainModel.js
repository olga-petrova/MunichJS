//View Model
//contains some labels
Ext.define('MunichJS.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        applicationTitle: 'MunichJS',
        firstTabTitle: 'Meetup',
        secondTabTitle: 'Chart'
    }

});
