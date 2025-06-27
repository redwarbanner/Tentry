/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2025 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * @module modules/messages
 */
import type { IViewBased, MessageVariant } from "../../types/index";
import { UIElement } from "../../core/ui/index";
export declare class UIMessage extends UIElement {
    className(): string;
    constructor(jodit: IViewBased, options: {
        text: string;
        variant: MessageVariant;
    });
}
