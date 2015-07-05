// workaround for Charts bug
Ext.define('stream.overrides.chart.axis.sprite.Axis', {
    override: 'Ext.chart.axis.sprite.Axis',

    renderLabels: function (surface, ctx, layout, clipRect) {
        var me = this,
            attr = me.attr,
            halfLineWidth = 0.5 * attr.lineWidth,
            docked = attr.position,
            matrix = attr.matrix,
            textPadding = attr.textPadding,
            xx = matrix.getXX(),
            dx = matrix.getDX(),
            yy = matrix.getYY(),
            dy = matrix.getDY(),
            thickness = 0,
            majorTicks = layout.majorTicks,
            tickPadding = Math.max(attr.majorTickSize, attr.minorTickSize) + attr.lineWidth,
            label = me.getLabel(), font, labelOffset,
            lastLabelText = null,
            textSize = 0, textCount = 0,
            segmenter = layout.segmenter,
            renderer = me.getRenderer(),
            title = me.getAxis().getTitle(),
            titleBBox = title && title.attr.text !== '' && title.getBBox(),
            labelInverseMatrix, lastBBox = null, bbox, fly, text, titlePadding,
            translation;

        if (majorTicks && label && !label.attr.hidden) {
            font = label.attr.font;
            if (ctx.font !== font) {
                ctx.font = font;
            } // This can profoundly improve performance.
            label.setAttributes({translationX: 0, translationY: 0}, true, true);
            label.applyTransformations();
            labelInverseMatrix = label.attr.inverseMatrix.elements.slice(0);
            switch (docked) {
                case 'left':
                    titlePadding = titleBBox ? titleBBox.x + titleBBox.width : 0;
                    switch (label.attr.textAlign) {
                        case 'start':
                            translation = surface.roundPixel(titlePadding + dx) - halfLineWidth;
                            break;
                        case 'end':
                            translation = surface.roundPixel(clipRect[2] - tickPadding + dx) - halfLineWidth;
                            break;
                        default: // 'center'
                            translation = surface.roundPixel(titlePadding + (clipRect[2] - titlePadding - tickPadding) / 2 + dx) - halfLineWidth;
                    }
                    label.setAttributes({
                        translationX: translation
                    }, true, true);
                    break;
                case 'right':
                    titlePadding = titleBBox ? clipRect[2] - titleBBox.x : 0;
                    switch (label.attr.textAlign) {
                        case 'start':
                            translation = surface.roundPixel(tickPadding + dx) + halfLineWidth;
                            break;
                        case 'end':
                            translation = surface.roundPixel(clipRect[2] - titlePadding + dx) + halfLineWidth;
                            break;
                        default: // 'center'
                            translation = surface.roundPixel(tickPadding + (clipRect[2] - tickPadding - titlePadding) / 2 + dx) + halfLineWidth;
                    }
                    label.setAttributes({
                        translationX: translation
                    }, true, true);
                    break;
                case 'top':
                    titlePadding = titleBBox ? titleBBox.y + titleBBox.height: 0;
                    label.setAttributes({
                        translationY: surface.roundPixel(titlePadding + (clipRect[3] - titlePadding - tickPadding) / 2) - halfLineWidth
                    }, true, true);
                    break;
                case 'bottom':
                    titlePadding = titleBBox ? clipRect[3] - titleBBox.y : 0;
                    label.setAttributes({
                        translationY: surface.roundPixel(tickPadding + (clipRect[3] - tickPadding - titlePadding) / 2) + halfLineWidth
                    }, true, true);
                    break;
                case 'radial' :
                    label.setAttributes({
                        translationX: attr.centerX
                    }, true, true);
                    break;
                case 'angular':
                    label.setAttributes({
                        translationY: attr.centerY
                    }, true, true);
                    break;
                case 'gauge':
                    label.setAttributes({
                        translationY: attr.centerY
                    }, true, true);
                    break;
            }

            // TODO: there are better ways to detect collision.
            if (docked === 'left' || docked === 'right') {
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    label.setAttributes({
                        text: String(text),
                        translationY: surface.roundPixel(position * yy + dy)
                    }, true, true);
                    label.applyTransformations();
                    thickness = Math.max(thickness, label.getBBox().width + tickPadding);
                    //workaround fix
                    if (/*thickness <= me.thickness*/true) {
                        fly = Ext.draw.Matrix.fly(label.attr.matrix.elements.slice(0));
                        bbox = fly.prepend.apply(fly, labelInverseMatrix).transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox, textPadding)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.height;
                        textCount++;
                    }
                });
            } else if (docked === 'top' || docked === 'bottom') {
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(this, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    label.setAttributes({
                        text: String(text),
                        translationX: surface.roundPixel(position * xx + dx)
                    }, true, true);
                    label.applyTransformations();
                    thickness = Math.max(thickness, label.getBBox().height + tickPadding);
                    //workaround fix
                    if (/*thickness <= me.thickness*/true) {
                        fly = Ext.draw.Matrix.fly(label.attr.matrix.elements.slice(0));
                        bbox = fly.prepend.apply(fly, labelInverseMatrix).transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox, textPadding)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            } else if (docked === 'radial') {
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    if (typeof text !== 'undefined') {
                        label.setAttributes({
                            text: String(text),
                            translationX: attr.centerX - surface.roundPixel(position) / attr.max * attr.length * Math.cos(attr.baseRotation + Math.PI / 2),
                            translationY: attr.centerY - surface.roundPixel(position) / attr.max * attr.length * Math.sin(attr.baseRotation + Math.PI / 2)
                        }, true, true);
                        label.applyTransformations();
                        bbox = label.attr.matrix.transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            } else if (docked === 'angular') {
                labelOffset = attr.majorTickSize + attr.lineWidth * 0.5 + (parseInt(label.attr.fontSize, 10) || 10) / 2;
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;
                    thickness = Math.max(thickness, Math.max(attr.majorTickSize, attr.minorTickSize) + (attr.lineCap !== 'butt' ? attr.lineWidth * 0.5 : 0));
                    if (typeof text !== 'undefined') {
                        var angle = position / (attr.max + 1) * Math.PI * 2 + attr.baseRotation;
                        label.setAttributes({
                            text: String(text),
                            translationX: attr.centerX + (attr.length + labelOffset) * Math.cos(angle),
                            translationY: attr.centerY + (attr.length + labelOffset) * Math.sin(angle)
                        }, true, true);
                        label.applyTransformations();
                        bbox = label.attr.matrix.transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            } else if (docked === 'gauge') {
                var gaugeAngles = me.getGaugeAngles();
                me.iterate(majorTicks, function (position, labelText, i) {
                    if (labelText === undefined) {
                        return;
                    }
                    text = renderer ? renderer.call(me, labelText, layout, lastLabelText) : segmenter.renderer(labelText, layout, lastLabelText);
                    lastLabelText = labelText;

                    if (typeof text !== 'undefined') {
                        var angle = (position - attr.min) / (attr.max - attr.min + 1) * attr.totalAngle - attr.totalAngle + gaugeAngles.start;
                        label.setAttributes({
                            text: String(text),
                            translationX: attr.centerX + (attr.length + 10) * Math.cos(angle),
                            translationY: attr.centerY + (attr.length + 10) * Math.sin(angle)
                        }, true, true);
                        label.applyTransformations();
                        bbox = label.attr.matrix.transformBBox(label.getBBox(true));
                        if (lastBBox && !Ext.draw.Draw.isBBoxIntersect(bbox, lastBBox)) {
                            return;
                        }
                        surface.renderSprite(label);
                        lastBBox = bbox;
                        textSize += bbox.width;
                        textCount++;
                    }
                });
            }

            if (attr.enlargeEstStepSizeByText && textCount) {
                textSize /= textCount;
                textSize += tickPadding;
                textSize *= 2;
                if (attr.estStepSize < textSize) {
                    attr.estStepSize = textSize;
                }
            }
            //workaround fix
            /*if (Math.abs(me.thickness - (thickness)) > 1) {
             me.thickness = thickness;
             attr.bbox.plain.dirty = true;
             attr.bbox.transform.dirty = true;
             me.doThicknessChanged();
             return false;
             }*/
        }
    }
});