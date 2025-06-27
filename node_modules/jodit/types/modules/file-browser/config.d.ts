/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2025 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * @module modules/file-browser
 */
import type { IFileBrowserOptions } from "../../types/index";
import "../../core/request/config";
declare module 'jodit/config' {
    interface Config {
        filebrowser: IFileBrowserOptions;
    }
}
