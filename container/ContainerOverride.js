Ext.define('Ext.container.ContainerOverride', {
    override: 'Ext.container.Container',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            allItems: {},
            preventItemsBubble: true
        });
        me.callParent();
    },
    onAdd: function (cmp) {
        var me = this;
        me.callParent(arguments);
        var name = cmp.itemId || cmp.name;
        if (name) {
            if (me.allItems[name]) {
                me.allItems[name] = Ext.Array.merge(
                    Ext.Array.from(me.allItems[name]),
                    [cmp]);
            }
            else {
                me.allItems[name] = cmp;
            }
        }
    },
    onAdded: function (container) {
        var me = this;
        me.callParent(arguments);
        if (container && me.preventItemsBubble !== true) {
            for (var name in me.allItems) {
                if (container.allItems[name]) {
                    container.allItems[name] = Ext.Array.merge(
                        Ext.Array.from(container.allItems[name]),
                        Ext.Array.from(me.allItems[name]));
                }
                else {
                    container.allItems[name] = me.allItems[name];
                }
            }
        }
    }
});


