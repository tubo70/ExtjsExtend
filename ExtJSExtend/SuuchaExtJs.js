/// <reference path="http://docs.sencha.com/extjs/4.2.0/extjs-build/ext-all-dev.js" />

var Suucha = Suucha || {};
Suucha.Ext = Suucha.Ext || {};

//Json 序列化日期格式为/Date('')/
Ext.JSON.encodeDate = function (d) {
    var value = '/Date(' + Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()) + ')/';
    return '"' + value + '"';
};

//Json 反序列化支持/Date('')/日期格式
Ext.data.Types.DATE =
{
    convert: function (v) {
        var df = this.dateFormat,
            parsed;
        if (!v) {
            return null;
        }
        if (Ext.isDate(v)) {
            return v;
        }
        if (v.toString().indexOf('Date(') != -1) {
            var t = v.replace('/Date(', '').replace(')/', '').replace('+0800', '');
            return new Date(parseInt(t, 10));
        }
        if (df) {
            if (df == 'timestamp') {
                return new Date(v * 1000);
            }
            if (df == 'time') {
                return new Date(parseInt(v, 10));
            }
            return Ext.Date.parse(v, df);
        }

        parsed = Date.parse(v);
        return parsed ? new Date(parsed) : null;
    },
    sortType: Ext.data.SortTypes.asDate,
    type: 'date'
}


Ext.define('Suucha.Ext.Menu', {
    extend: 'Ext.menu.Menu',
    alias: ['widget.suuchamenu'],
    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.on('beforeadd', me.onBeforeAdd, me);
    },
    checkPermission:null,
    onBeforeAdd: function (container, component, index, eOpts) {
        var me = this;
        if (me.checkPermission) {
            return me.checkPermission(component);
        }
    },
    getMenuItems: function () {
        /// <summary>
        /// 获取所有有name属性的menuitem
        /// </summary>
        var me = this;
        return me.query('menuitem[name]');
    },
    getMenuItemByName: function (name) {
        /// <summary>
        /// 根据名称获取menuitem
        /// </summary>

        var me = this;
        var items = me.query('menuitem[name="' + name + '"]');
        if (items.length < 1) {
            return null;
        }
        if (items.length == 1) {
            return items[0];
        }
        return items;
    }

});