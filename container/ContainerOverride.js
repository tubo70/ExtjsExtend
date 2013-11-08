Ext.define('Ext.container.ContainerOverride', {
    override: 'Ext.container.Container',
    allItems: {},
    initComponent: function () {
        var me = this;
        me.addEvents(
            'bubblyadd'
        );
        me.on('bubblyadd', me.onBubblyadd, me);
        me.callParent();
    },
    onAdd: function (cmp, index) {
        var me = this;
        me.callParent(arguments);
        var name = cmp.itemId || cmp.name;
        if (name) {
            me.allItems[name] = cmp;
            if (me.hasListeners.bubblyadd) {
                me.fireEvent('bubblyadd', cmp, index);
            }
        }
    },
    onBubblyadd:function(cmp, index) {
        var me = this;
        var name = cmp.itemId || cmp.name;
        if (name) {
            me.allItems[name] = cmp;
        }
    }
});

