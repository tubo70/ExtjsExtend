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
        for (var name in items) {
            var item = items[name];
            if (Ext.isArray(item)) {
                Ext.each(item, function (oneItem) {
                    if (oneItem.enable) {
                        oneItem.enable();
                    }
                });
            }
            else if (item.enable) {
                item.enable();
            }
        }
        var disables = {};
        if (me.buttonDisable) {
            if (me.buttonDisable.expressions) {
                var exps = me.buttonDisable.expressions;
                for (var btn in exps) {
                    var exp = exps[btn];
                    for(var i = 0, il = records.length;i<il;i++) {
                        var data = records[i].data;
                        exp = exp.replace(/\$/g, 'data.');
                        var disabled = eval(exp);
                        if (disabled === true) {
                            disables[btn] = true;
                            break;
                        }
                    }
                }
            }
            var disableNames = me.buttonDisable.noSelection;
            if (records.length == 1) {
                disableNames = me.buttonDisable.oneSelection;
            }
            if (records.length > 1) {
                disableNames = me.buttonDisable.moreSelections;
            }
            for (var name in items) {
                if (disables[name]) {
                    continue;
                }
                if (disableNames && Ext.Array.contains(disableNames, name)) {
                    disables[name] = true;
                }
            }
            for (var name in disables) {
                var item = items[name];
                if (Ext.isArray(item)) {
                    Ext.each(item, function (oneItem) {
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
