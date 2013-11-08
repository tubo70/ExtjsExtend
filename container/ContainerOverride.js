Ext.define('Ext.container.ContainerOverride', function () {
    return {
        override: 'Ext.container.Container',
        initComponent: function () {
            var me = this;
            me.addEvents(

            );

            me.callParent();
        },
        onAdd: function () {

        }
    }
});

