// workaround for Charts bug
Ext.define('stream.overrides.chart.CartesianChart', {
    override: 'Ext.chart.CartesianChart',

    /**
     * Layout the axes and series.
     */
    performLayout: function () {
        var me = this;

        me.animationSuspendCount++;
        me.callParent();
        me.suspendThicknessChanged();

        var chartRect = me.getSurface('chart').getRect(),
            width = chartRect[2],
            height = chartRect[3],
            axes = me.getAxes(), axis,
            seriesList = me.getSeries(), series,
            axisSurface, thickness,
            insetPadding = me.getInsetPadding(),
            innerPadding = me.getInnerPadding(),
            surface, gridSurface,
            shrinkBox = Ext.apply({}, insetPadding),
            mainRect, innerWidth, innerHeight,
            elements, floating, floatingValue, matrix, i, ln,
            isRtl = me.getInherited().rtl,
            flipXY = me.getFlipXY();

        if (width <= 0 || height <= 0) {
            return;
        }

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];
            axisSurface = axis.getSurface();
            floating = axis.getFloating();
            floatingValue = floating ? floating.value : null;
            //workaround fix
            thickness = 70;//axis.getThickness();
            switch (axis.getPosition()) {
                case 'top':
                    axisSurface.setRect([0, shrinkBox.top + 1, width, thickness]);
                    break;
                case 'bottom':
                    axisSurface.setRect([0, height - (shrinkBox.bottom + thickness), width, thickness]);
                    break;
                case 'left':
                    axisSurface.setRect([shrinkBox.left, 0, thickness, height]);
                    break;
                case 'right':
                    axisSurface.setRect([width - (shrinkBox.right + thickness), 0, thickness, height]);
                    break;
            }
            if (floatingValue === null) {
                shrinkBox[axis.getPosition()] += thickness;
            }
        }

        width -= shrinkBox.left + shrinkBox.right;
        height -= shrinkBox.top + shrinkBox.bottom;

        mainRect = [shrinkBox.left, shrinkBox.top, width, height];

        shrinkBox.left += innerPadding.left;
        shrinkBox.top += innerPadding.top;
        shrinkBox.right += innerPadding.right;
        shrinkBox.bottom += innerPadding.bottom;

        innerWidth = width - innerPadding.left - innerPadding.right;
        innerHeight = height - innerPadding.top - innerPadding.bottom;

        me.setInnerRect([shrinkBox.left, shrinkBox.top, innerWidth, innerHeight]);

        if (innerWidth <= 0 || innerHeight <= 0) {
            return;
        }

        me.setMainRect(mainRect);
        me.getSurface().setRect(mainRect);

        for (i = 0, ln = me.surfaceMap.grid && me.surfaceMap.grid.length; i < ln; i++) {
            gridSurface = me.surfaceMap.grid[i];
            gridSurface.setRect(mainRect);
            gridSurface.matrix.set(1, 0, 0, 1, innerPadding.left, innerPadding.top);
            gridSurface.matrix.inverse(gridSurface.inverseMatrix);
        }

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];
            axisSurface = axis.getSurface();
            matrix = axisSurface.matrix;
            elements = matrix.elements;
            switch (axis.getPosition()) {
                case 'top':
                case 'bottom':
                    elements[4] = shrinkBox.left;
                    axis.setLength(innerWidth);
                    break;
                case 'left':
                case 'right':
                    elements[5] = shrinkBox.top;
                    axis.setLength(innerHeight);
                    break;
            }
            axis.updateTitleSprite();
            matrix.inverse(axisSurface.inverseMatrix);
        }

        for (i = 0, ln = seriesList.length; i < ln; i++) {
            series = seriesList[i];
            surface = series.getSurface();
            surface.setRect(mainRect);
            if (flipXY) {
                if (isRtl) {
                    surface.matrix.set(0, -1, -1, 0,
                            innerPadding.left + innerWidth,
                            innerPadding.top + innerHeight);
                } else {
                    surface.matrix.set(0, -1, 1, 0,
                        innerPadding.left,
                            innerPadding.top + innerHeight);
                }
            } else {
                surface.matrix.set(1, 0, 0, -1,
                    innerPadding.left,
                        innerPadding.top + innerHeight);
            }
            surface.matrix.inverse(surface.inverseMatrix);
            series.getOverlaySurface().setRect(mainRect);
        }
        me.redraw();

        me.animationSuspendCount--;
        me.resumeThicknessChanged();
    }
});