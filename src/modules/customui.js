module.exports = (function() {
    util.extend( disableSwipViewpager, $ui.Widget );
    $ui.registerWidget( "disable-SwipViewpager", disableSwipViewpager );

    function disableSwipViewpager() {
        $ui.Widget.call(this);
        this.render = function () {
            return JavaAdapter( com.stardust.autojs.core.ui.widget.JsViewPager, {
                onInterceptTouchEvent: function () {
                    return false;
                },
                onTouchEvent: function () {
                    return false;
                },
            }, context );
        };
    }

    return this;
})();