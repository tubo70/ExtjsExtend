Ext.define('Ext.ux.button.PluploadButton', {
    extend: 'Ext.Button',
    alias: ['widget.pluploadbutton'],
    initComponent: function () {
        var me = this;

        me.on('render', function (btn, eOpts) {
            btn.uploader = Ext.create('Ext.ux.Plupload', {
                browseButton: btn,
                pluploadConfig: eOpts.pluploadConfig
            });
        }, me, { pluploadConfig: me.pluploadConfig });
        me.on('destroy', function (btn, eOpts) {
            if (btn.uploader) {
                btn.uploader.uploader.destroy();
            }
        })
        me.callParent();
    }
});