/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2025 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { IS_INLINE } from "../../../../../core/constants.js";
import { Dom } from "../../../../../core/dom/dom.js";
import { trim } from "../../../../../core/helpers/string/trim.js";
/**
 * @private
 */
export function tryRemoveNode(jodit, nodeElm, hadEffect, allowTags, denyTags, currentSelectionNode) {
    if (isRemovableNode(jodit, nodeElm, currentSelectionNode, allowTags, denyTags)) {
        Dom.safeRemove(nodeElm);
        return true;
    }
    return hadEffect;
}
/**
 * @private
 */
function isRemovableNode(jodit, node, current, allow, deny) {
    if (!Dom.isText(node)) {
        if (allow && !allow[node.nodeName]) {
            return true;
        }
        if (!allow && deny && deny[node.nodeName]) {
            return true;
        }
    }
    if (!jodit.o.cleanHTML.removeEmptyElements) {
        return false;
    }
    return (Dom.isElement(node) &&
        node.nodeName.match(IS_INLINE) != null &&
        !Dom.isTemporary(node) &&
        trim(node.innerHTML).length === 0 &&
        (current == null || !Dom.isOrContains(node, current)));
}
