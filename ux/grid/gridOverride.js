/**
 * Created by quan on 13-11-10.
 */
Ext.define('Ext.ux.grid.PanelOverride', {
    override: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        me.on('selectionchange', me.onSelectionChange, me);
        me.callParent();
    },
    onSelectionChange: function (grid, records) {
        if (!records) {
            return;
        }
        var me = this;
        var items = me.allItems;
        var disableNames = me.noSelectionDisable;
        if (records.length == 1) {
            disableNames = me.oneSelectionDisable;
        }
        if (records.length > 1) {
            disableNames = me.moreSelectionsDisable;
        }
        for (var name in items) {
            var item = items[name];
            if (Ext.isArray(item)) {
                Ext.Array.each(item, function (oneItem) {
                    if (oneItem.enable) {
                        oneItem.enable();
                    }
                });
            }
            else if (item.enable) {
                item.enable();
            }
            if (disableNames && Ext.Array.contains(disableNames, name)) {
                if (Ext.isArray(item)) {
                    Ext.Array.each(item, function (oneItem) {
                        if (oneItem.disable) {
                            oneItem.disable();
                        }
                    });
                }
                else if (item.disable) {
                    item.disable();
                }
            }
        }
    }
});
