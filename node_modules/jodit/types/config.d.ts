import type { AjaxOptions } from "./types/index";
import type { IDialogOptions } from "./types/index";
import type { IFileBrowserOptions } from "./types/index";
import type { ImageEditorOptions } from "./types/index";
import type { IUploaderOptions } from "./types/index";
import type { IUploader } from "./types/index";
import type { HTMLTagNames } from "./types/index";
import type { AiAssistantSettings } from "./plugins/ai-assistant/interface";
import type { IDictionary } from "./types/index";
import type { Nullable } from "./types/index";
import type { ImagePropertiesOptions } from "./plugins/image-properties/interface";
import type { IControlType } from "./types/index";
import type { IJodit } from "./types/index";
import type { formTemplate } from "./plugins/link/template";
import type { IUIForm } from "./types/index";
import type { IUIOption } from "./types/index";
import type { ButtonsOption } from "./types/index";
import type { InsertMode } from "./types/index";
import type { FuzzySearch } from "./types/index";
import type { ISourceEditor } from "./types/index";
import type { ISpeechRecognizeConstructor } from "./plugins/speech-recognize/interface";
import type { Attributes } from "./types/index";
import type { Controls } from "./types/index";
import type { IExtraPlugin } from "./types/index";
import type { IUIButtonState } from "./types/index";
import type { IViewOptions } from "./types/index";
import type { NodeFunction } from "./types/index";
/**
 * Default Editor's Configuration
 */
declare class Config implements IViewOptions {
    private constructor();
    /**
     * Use cache for heavy methods
     */
    cache: boolean;
    /**
     * Timeout of all asynchronous methods
     */
    defaultTimeout: number;
    namespace: string;
    /**
     * Editor loads completely without plugins. Useful when debugging your own plugin.
     */
    safeMode: boolean;
    /**
     * Editor's width
     *
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    width: '100%',
     * })
     * ```
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    width: 600, // equivalent for '600px'
     * })
     * ```
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    width: 'auto', // autosize
     * })
     * ```
     */
    width: number | string;
    /**
     * Editor's height
     *
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    height: '100%',
     * })
     * ```
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    height: 600, // equivalent for '600px'
     * })
     * ```
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    height: 'auto', // default - autosize
     * })
     * ```
     */
    height: number | string;
    /**
     * List of plugins that will be initialized in safe mode.
     *
     * ```js
     * Jodit.make('#editor', {
     * 	safeMode: true,
     * 	safePluginsList: ['about'],
     * 	extraPlugins: ['yourPluginDev']
     * });
     * ```
     */
    safePluginsList: string[];
    commandToHotkeys: IDictionary<string | string[]>;
    /**
     * Reserved for the paid version of the editor
     */
    license: string;
    /**
     * The name of the preset that will be used to initialize the editor.
     * The list of available presets can be found here Jodit.defaultOptions.presets
     * ```javascript
     * Jodit.make('.editor', {
     * 	preset: 'inline'
     * });
     * ```
     */
    preset: string;
    presets: IDictionary;
    ownerDocument: Document;
    /**
     * Allows you to specify the window in which the editor will be created. Default - window
     * This is necessary if you are creating the editor inside an iframe but the code is running in the parent window
     */
    ownerWindow: Window;
    /**
     * Shadow root if Jodit was created in it
     *
     * ```html
     * <div id="editor"></div>
     * ```
     *
     * ```js
     * const app = document.getElementById('editor');
     * app.attachShadow({ mode: 'open' });
     * const root = app.shadowRoot;
     *
     * root.innerHTML = `
     * <link rel="stylesheet" href="./build/jodit.css"/>
     * <h1>Jodit example in Shadow DOM</h1>
     * <div id="edit"></div>
     * `;
     *
     * const editor = Jodit.make(root.getElementById('edit'), {
     * 	globalFullSize: false,
     * 	shadowRoot: root
     * });
     * editor.value = '<p>start</p>';
     * ```
     */
    shadowRoot: Nullable<ShadowRoot>;
    /**
     * z-index For editor
     */
    zIndex: number;
    /**
     * Change the read-only state of the editor
     */
    readonly: boolean;
    /**
     * Change the disabled state of the editor
     */
    disabled: boolean;
    /**
     * In readOnly mode, some buttons can still be useful, for example, the button to view source code or print
     */
    activeButtonsInReadOnly: string[];
    /**
     * When the editor is in read-only mode, some commands can still be executed:
     * ```javascript
     * const editor = Jodit.make('.editor', {
     * 	 allowCommandsInReadOnly: ['selectall', 'preview', 'print']
     * 	 readonly: true
     * });
     * editor.execCommand('selectall');// will be selected all content
     * editor.execCommand('delete');// but content will not be deleted
     * ```
     */
    allowCommandsInReadOnly: string[];
    /**
     * Size of icons in the toolbar (can be "small", "middle", "large")
     *
     * @example
     * ```javascript
     * const editor = Jodit.make(".dark_editor", {
     *      toolbarButtonSize: "small"
     * });
     * ```
     */
    toolbarButtonSize: IUIButtonState['size'];
    /**
     * Allow navigation in the toolbar of the editor by Tab key
     */
    allowTabNavigation: boolean;
    /**
     * Inline editing mode
     */
    inline: boolean;
    /**
     * Theme (can be "dark")
     * @example
     * ```javascript
     * const editor = Jodit.make(".dark_editor", {
     *      theme: "dark"
     * });
     * ```
     */
    theme: string;
    /**
     * if set true, then the current mode is saved in a cookie, and is restored after a reload of the page
     */
    saveModeInStorage: boolean;
    /**
     * Class name that can be appended to the editable area
     *
     * @see [[Config.iframeCSSLinks]]
     * @see [[Config.iframeStyle]]
     *
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *    editorClassName: 'some_my_class'
     * });
     * ```
     * ```html
     * <style>
     * .some_my_class p{
     *    line-height: 16px;
     * }
     * </style>
     * ```
     */
    editorClassName: false | string;
    /**
     * Class name that can be appended to the main editor container
     * @example
     * ```javascript
     * const jodit = Jodit.make('#editor', {
     *    className: 'some_my_class'
     * });
     *
     * console.log(jodit.container.classList.contains('some_my_class')); // true
     * ```
     * ```html
     * <style>
     * .some_my_class {
     *    max-width: 600px;
     *    margin: 0 auto;
     * }
     * </style>
     * ```
     */
    className: false | string;
    /**
     * The internal styles of the editable area. They are intended to change
     * not the appearance of the editor, but to change the appearance of the content.
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     * 		style: {
     * 		 font: '12px Arial',
     * 		 color: '#0c0c0c'
     * 		}
     * });
     * ```
     */
    style: false | IDictionary;
    /**
     *
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     * 		editorStyle: {
     * 		 font: '12px Arial',
     * 		 color: '#0c0c0c'
     * 		}
     * });
     * ```
     */
    containerStyle: false | IDictionary;
    /**
     * Dictionary of variable values in css, a complete list can be found here
     * https://github.com/xdan/jodit/blob/main/src/styles/variables.less#L25
     *
     * @example
     * ```js
     * const editor = Jodit.make('#editor', {
     *   styleValues: {
     *		'color-text': 'red',
     *		colorBorder: 'black',
     *		'color-panel': 'blue'
     *   }
     * });
     * ```
     */
    styleValues: IDictionary;
    /**
     * After all, changes in editors for textarea will call change trigger
     *
     * @example
     * ```javascript
     * const editor = Jodit.make('#editor');
     * document.getElementById('editor').addEventListener('change', function () {
     *      console.log(this.value);
     * })
     * ```
     */
    triggerChangeEvent: boolean;
    /**
     * The writing direction of the language which is used to create editor content. Allowed values are: ''
     * (an empty string) – Indicates that content direction will be the same as either the editor UI direction or
     * the page element direction. 'ltr' – Indicates a Left-To-Right text direction (like in English).
     * 'rtl' – Indicates a Right-To-Left text direction (like in Arabic).
     *
     * @example
     * ```javascript
     * Jodit.make('.editor', {
     *    direction: 'rtl'
     * })
     * ```
     */
    direction: 'rtl' | 'ltr' | '';
    /**
     * Language by default. if `auto` language set by document.documentElement.lang ||
     * (navigator.language && navigator.language.substr(0, 2)) ||
     * (navigator.browserLanguage && navigator.browserLanguage.substr(0, 2)) || 'en'
     *
     * @example
     * ```html
     * <!-- include in you page lang file -->
     * <script src="jodit/lang/de.js"></script>
     * <script>
     * var editor = Jodit.make('.editor', {
     *    language: 'de'
     * });
     * </script>
     * ```
     */
    language: string;
    /**
     * if true all Lang.i18n(key) return `{key}`
     *
     * @example
     * ```html
     * <script>
     * var editor = Jodit.make('.editor', {
     *    debugLanguage: true
     * });
     *
     * console.log(editor.i18n("Test")); // {Test}
     * </script>
     * ```
     */
    debugLanguage: boolean;
    /**
     * Collection of language pack data `{en: {'Type something': 'Type something', ...}}`
     *
     * @example
     * ```javascript
     * const editor = Jodit.make('#editor', {
     *     language: 'ru',
     *     i18n: {
     *         ru: {
     *            'Type something': 'Начните что-либо вводить'
     *         }
     *     }
     * });
     * console.log(editor.i18n('Type something')) //Начните что-либо вводить
     * ```
     */
    i18n: IDictionary<IDictionary<string>> | false;
    /**
     * The tabindex global attribute is an integer indicating if the element can take
     * input focus (is focusable), if it should participate to sequential keyboard navigation,
     * and if so, at what position. It can take several values
     */
    tabIndex: number;
    /**
     * Boolean, whether the toolbar should be shown.
     * Alternatively, a valid css-selector-string to use an element as toolbar container.
     */
    toolbar: boolean | string | HTMLElement;
    /**
     * Boolean, whether the statusbar should be shown.
     */
    statusbar: boolean;
    /**
     * Show tooltip after mouse enter on the button
     */
    showTooltip: boolean;
    /**
     * Delay before show tooltip
     */
    showTooltipDelay: number;
    /**
     * Instead of create custop tooltip - use native title tooltips
     */
    useNativeTooltip: boolean;
    /**
     * Default insert method
     * @default insert_as_html
     */
    defaultActionOnPaste: InsertMode;
    /**
     * Element that will be created when you press Enter
     */
    enter: 'p' | 'div' | 'br';
    /**
     * When this option is enabled, the editor's content will be placed in an iframe and isolated from the rest of the page.
     *
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *    iframe: true,
     *    iframeStyle: 'html{margin: 0px;}body{padding:10px;background:transparent;color:#000;position:relative;z-index:2;\
     *    user-select:auto;margin:0px;overflow:hidden;}body:after{content:"";clear:both;display:block}';
     * });
     * ```
     */
    iframe: boolean;
    /**
     * Allow editing the entire HTML document(html, head)
     * \> Works together with the iframe option.
     * @example
     * ```js
     * const editor = Jodit.make('#editor', {
     *   iframe: true,
     *   editHTMLDocumentMode: true
     * });
     * editor.value = '<!DOCTYPE html><html lang="en" style="overflow-y:hidden">' +
     * 	'<head><title>Jodit Editor</title></head>' +
     * 	'<body spellcheck="false"><p>Some text</p><p> a </p></body>' +
     * 	'</html>';
     * ```
     */
    editHTMLDocumentMode: boolean;
    /**
     * Use when you need to insert new block element
     * use enter option if not set
     */
    enterBlock: 'p' | 'div';
    /**
     * Jodit.MODE_WYSIWYG The HTML editor allows you to write like MSWord,
     * Jodit.MODE_SOURCE syntax highlighting source editor
     * @example
     * ```javascript
     * var editor = Jodit.make('#editor', {
     *     defaultMode: Jodit.MODE_SPLIT
     * });
     * console.log(editor.getRealMode())
     * ```
     */
    defaultMode: number;
    /**
     * Use split mode
     */
    useSplitMode: boolean;
    /**
     * The colors in HEX representation to select a color for the background and for the text in colorpicker
     * @example
     * ```javascript
     *  Jodit.make('#editor', {
     *     colors: ['#ff0000', '#00ff00', '#0000ff']
     * })
     * ```
     */
    colors: IDictionary<string[]> | string[];
    /**
     * The default tab color picker
     * @example
     * ```javascript
     * Jodit.make('#editor2', {
     *     colorPickerDefaultTab: 'color'
     * })
     * ```
     */
    colorPickerDefaultTab: 'background' | 'color';
    /**
     * Image size defaults to a larger image
     */
    imageDefaultWidth: number;
    /**
     * Do not display these buttons that are on the list
     * @example
     * ```javascript
     * Jodit.make('#editor2', {
     *     removeButtons: ['hr', 'source']
     * });
     * ```
     */
    removeButtons: string[];
    /**
     * Do not init these plugins
     * @example
     * ```typescript
     * var editor = Jodit.make('.editor', {
     *    disablePlugins: 'table,iframe'
     * });
     * //or
     * var editor = Jodit.make('.editor', {
     *    disablePlugins: ['table', 'iframe']
     * });
     * ```
     */
    disablePlugins: string[] | string;
    /**
     * Init and download extra plugins
     * @example
     * ```typescript
     * var editor = Jodit.make('.editor', {
     *    extraPlugins: ['emoji']
     * });
     * ```
     * It will try load %SCRIPT_PATH%/plugins/emoji/emoji.js and after load will try init it
     */
    extraPlugins: Array<string | IExtraPlugin>;
    /**
     * Base path for download extra plugins
     */
    basePath?: string;
    /**
     * These buttons list will be added to the option. Buttons
     */
    extraButtons: Array<string | IControlType>;
    /**
     * By default, you can only install an icon from the Jodit suite.
     * You can add your icon to the set using the `Jodit.modules.Icon.set (name, svg Code)` method.
     * But for a declarative declaration, you can use this option.
     *
     * @example
     * ```js
     * Jodit.modules.Icon.set('someIcon', '<svg><path.../></svg>');
     * const editor = Jodit.make({
     *   extraButtons: [{
     *     name: 'someButton',
     *     icon: 'someIcon'
     *   }]
     * });
     *
     * @example
     * const editor = Jodit.make({
     *   extraIcons: {
     *     someIcon: '<svg><path.../></svg>'
     *   },
     *   extraButtons: [{
     *     name: 'someButton',
     *     icon: 'someIcon'
     *   }]
     * });
     * ```
     * @example
     * ```js
     * const editor = Jodit.make({
     *   extraButtons: [{
     *     name: 'someButton',
     *     icon: '<svg><path.../></svg>'
     *   }]
     * });
     * ```
     */
    extraIcons: IDictionary<string>;
    /**
     * Default attributes for created inside editor elements
     * @example
     * ```js
     * const editor2 = Jodit.make('#editor', {
     * 	createAttributes: {
     * 		div: {
     * 			class: 'test'
     * 		},
     * 		ul: function (ul) {
     * 			ul.classList.add('ui-test');
     * 		}
     * 	}
     * });
     *
     * const div2 = editor2.createInside.div();
     * expect(div2.className).equals('test');
     *
     * const ul = editor2.createInside.element('ul');
     * expect(ul.className).equals('ui-test');
     * ```
     * Or JSX in React
     * @example
     * ```jsx
     * import React, {useState, useRef} from 'react';
     * import JoditEditor from "jodit-react";
     *
     * const config = {
     * 	createAttributes: {
     * 		div: {
     * 			class: 'align-center'
     * 		}
     * 	}
     * };
     *
     * <JoditEditor config={config}/>
     * ```
     */
    createAttributes: IDictionary<Attributes | NodeFunction>;
    /**
     * The width of the editor, accepted as the biggest. Used to the responsive version of the editor
     */
    sizeLG: number;
    /**
     * The width of the editor, accepted as the medium. Used to the responsive version of the editor
     */
    sizeMD: number;
    /**
     * The width of the editor, accepted as the small. Used to the responsive version of the editor
     */
    sizeSM: number;
    /**
     * The list of buttons that appear in the editor's toolbar on large places (≥ options.sizeLG).
     * Note - this is not the width of the device, the width of the editor
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *     buttons: ['bold', 'italic', 'source'],
     *     buttonsMD: ['bold', 'italic'],
     *     buttonsXS: ['bold', 'fullsize'],
     * });
     * ```
     * @example
     * ```javascript
     * Jodit.make('#editor2', {
     *     buttons: [{
     *         name: 'empty',
     *         icon: 'source',
     *         exec: function (editor) {
     *             const dialog = new Jodit.modules.Dialog({}),
     *                 text = editor.c.element('textarea');
     *
     *             dialog.setHeader('Source code');
     *             dialog.setContent(text);
     *             dialog.setSize(400, 300);
     *
     *             Jodit.modules.Helpers.css(elm, {
     *                 width: '100%',
     *                 height: '100%'
     *             })

     *             dialog.open();
     *         }
     *     }]
     * });
     * ```
     * @example
     * ```javascript
     * Jodit.make('#editor2', {
     *     buttons: Jodit.defaultOptions.buttons.concat([{
     *        name: 'listsss',
     *        iconURL: 'stuf/dummy.png',
     *        list: {
     *            h1: 'insert Header 1',
     *            h2: 'insert Header 2',
     *            clear: 'Empty editor',
     *        },
     *        exec: ({originalEvent, control, btn}) => {
     *             var key = control.args[0],
     *                value = control.args[1];
     *             if (key === 'clear') {
     *                 this.val('');
     *                 return;
     *             }
     *             this.s.insertNode(this.c.element(key, ''));
     *             this.message.info('Was inserted ' + value);
     *        },
     *        template: function (key, value) {
     *            return '<div>' + value + '</div>';
     *        }
     *  });
     * ```
     */
    buttons: ButtonsOption;
    /**
     * Behavior for buttons
     */
    controls: Controls;
    /**
     * Some events are called when the editor is initialized, for example, the `afterInit` event.
     * So this code won't work:
     * ```javascript
     * const editor = Jodit.make('#editor');
     * editor.events.on('afterInit', () => console.log('afterInit'));
     * ```
     * You need to do this:
     * ```javascript
     * Jodit.make('#editor', {
     * 		events: {
     * 	  	afterInit: () => console.log('afterInit')
     * 		}
     * });
     * ```
     * The option can use any Jodit events, for example:
     * ```javascript
     * const editor = Jodit.make('#editor', {
     * 		events: {
     * 			hello: (name) => console.log('Hello', name)
     * 		}
     * });
     * editor.e.fire('hello', 'Mike');
     * ```
     */
    events: IDictionary<(...args: any[]) => any>;
    /**
     * Buttons in toolbat without SVG - only texts
     */
    textIcons: boolean;
    /**
     * Element for dialog container
     */
    popupRoot: Nullable<HTMLElement>;
    /**
     * shows a INPUT[type=color] to open the browser color picker, on the right bottom of widget color picker
     */
    showBrowserColorPicker: boolean;
    private static __defaultOptions;
    static get defaultOptions(): Config;
}
export { Config };
interface Config {
    /**
     * A set of key/value pairs that configure the Ajax request. All settings are optional
     */
    defaultAjaxOptions: AjaxOptions;
}
interface Config {
    dialog: IDialogOptions;
}
interface Config {
    filebrowser: IFileBrowserOptions;
}
interface Config {
    history: {
        enable: boolean;
        /**
         * Limit of history length
         */
        maxHistoryLength: number;
        /**
         * Delay on every change
         */
        timeout: number;
    };
}
interface Config {
    imageeditor: ImageEditorOptions;
}
interface Config {
    /**
     * Enable drag and drop file editor
     */
    enableDragAndDropFileToEditor: boolean;
    uploader: IUploaderOptions<IUploader>;
}
interface Config {
    /**
     * Create helper
     */
    addNewLine: boolean;
    /**
     * What kind of tags it will be impact
     */
    addNewLineTagsTriggers: HTMLTagNames[];
    /**
     * On dbl click on empty space of editor it add new P element
     * @example
     * ```js
     * Jodit.make('#editor', {
     *   addNewLineOnDBLClick: false // disable
     * })
     * ```
     */
    addNewLineOnDBLClick: boolean;
    /**
     * Absolute delta between cursor position and edge(top or bottom)
     * of element when show line
     */
    addNewLineDeltaShow: number;
}
interface Config {
    aiAssistant: AiAssistantSettings;
}
interface Config {
    delete: {
        hotkeys: {
            delete: string[];
            deleteWord: string[];
            deleteSentence: string[];
            backspace: string[];
            backspaceWord: string[];
            backspaceSentence: string[];
        };
    };
}
interface Config {
    cleanHTML: {
        timeout: number;
        /**
         * Replace &amp;nbsp; to plain space
         */
        replaceNBSP: boolean;
        /**
         * Remove empty P tags, if they are not in the beginning of the text
         */
        fillEmptyParagraph: boolean;
        /**
         * Remove empty elements
         */
        removeEmptyElements: boolean;
        /**
         * Replace old tags to new eg. <i> to <em>, <b> to <strong>
         */
        replaceOldTags: IDictionary<HTMLTagNames> | false;
        /**
         * You can use an iframe with the sandbox attribute to safely paste and test HTML code.
         * It prevents scripts and handlers from running, but it does slow things down.
         *
         * ```javascript
         * Jodit.make('#editor', {
         * 	 cleanHTML: {
         * 	 	 useIframeSandbox: true
         * 	 }
         * 	});
         * ```
         */
        useIframeSandbox: boolean;
        /**
         * Remove onError attributes
         */
        removeOnError: boolean;
        /**
         * Safe href="javascript:" links
         */
        safeJavaScriptLink: boolean;
        /**
         * The allowTags option defines which elements will remain in the
         * edited text when the editor saves. You can use this limit the returned HTML.
         * @example
         * ```javascript
         * const jodit = new Jodit.make('#editor', {
         *    cleanHTML: {
         *       cleanOnPaste: false
         *    }
         * });
         * ```
         * @example
         * ```javascript
         * const editor = Jodit.make('#editor', {
         *     cleanHTML: {
         *         allowTags: 'p,a[href],table,tr,td, img[src=1.png]' // allow only <p>,<a>,<table>,<tr>,<td>,<img> tags and
         *         for <a> allow only `href` attribute and <img> allow only `src` attribute == '1.png'
         *     }
         * });
         * editor.value = 'Sorry! <strong>Goodby</strong>\
         * <span>mr.</span> <a style="color:red" href="https://xdsoft.net">Freeman</a>';
         * console.log(editor.value); //Sorry! <a href="https://xdsoft.net">Freeman</a>
         * ```
         *
         * @example
         * ```javascript
         * const editor = Jodit.make('#editor', {
         *     cleanHTML: {
         *         allowTags: {
         *             p: true,
         *             a: {
         *                 href: true
         *             },
         *             table: true,
         *             tr: true,
         *             td: true,
         *             img: {
         *                 src: '1.png'
         *             }
         *         }
         *     }
         * });
         * ```
         */
        allowTags: false | string | IDictionary<string>;
        denyTags: false | string | IDictionary<string>;
        /**
         * Node filtering rules that do not need to be applied to content
         * The full list of rules is generated dynamically from the folder
         * https://github.com/xdan/jodit/tree/main/src/plugins/clean-html/helpers/visitor/filters
         */
        disableCleanFilter: Nullable<Set<string>>;
    };
}
interface Config {
    /**
     * Draggable elements
     */
    draggableTags: string | string[];
}
interface Config {
    dtd: {
        /**
         * Remove extra br element inside block element after pasting
         */
        removeExtraBr: boolean;
        /**
         * Check when inserting a block element if it can be inside another block element (according `blockLimits`)
         */
        checkBlockNesting: boolean;
        /**
         * List of elements that contain other blocks
         */
        blockLimits: IDictionary<1>;
    };
}
interface Config {
    autofocus: boolean;
    cursorAfterAutofocus: 'start' | 'end';
    saveSelectionOnBlur: boolean;
}
interface Config {
    defaultFontSizePoints: 'px' | 'pt';
}
interface Config {
    /**
     * Open WYSIWYG in full screen
     * @example
     * ```javascript
     * var editor = Jodit.make({
     *     fullsize: true // fullsize editor
     * });
     * ```
     * @example
     * ```javascript
     * var editor = Jodit.make();
     * editor.e.fire('toggleFullSize');
     * editor.e.fire('toggleFullSize', true); // fullsize
     * editor.e.fire('toggleFullSize', false); // usual mode
     * ```
     */
    fullsize: boolean;
    /**
     * True, after `fullsize` -  all editors elements above jodit will get `jodit_fullsize-box_true` class (z-index: 100000 !important;)
     */
    globalFullSize: boolean;
}
interface Config {
    /**
     * You can redefine hotkeys for some command
     *
     * @example
     * ```js
     * const jodit = Jodit.make('#editor', {
     *  commandToHotkeys: {
     *      bold: 'ctrl+shift+b',
     *      italic: ['ctrl+i', 'ctrl+b'],
     *  }
     * })
     * ```
     */
    commandToHotkeys: IDictionary<string | string[]>;
}
interface Config {
    /**
     * You can redefine default page
     *
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *    iframe: true,
     *    iframeDefaultSrc: 'https://xdsoft.net/jodit/docs/',
     * });
     * ```
     */
    iframeDefaultSrc: string;
    /**
     * Base URL where the root directory for [[Config.iframe]] mode
     *
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *    iframe: true,
     *    iframeBaseUrl: 'https://xdsoft.net/jodit/docs/',
     * });
     * ```
     */
    iframeBaseUrl: string;
    /**
     * Iframe title's content
     */
    iframeTitle: string;
    /**
     * Iframe's DOCTYPE
     */
    iframeDoctype: string;
    /**
     * Custom style to be used inside the iframe to display content.
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *    iframe: true,
     *    iframeStyle: 'html{margin: 0px;}',
     * })
     * ```
     */
    iframeStyle: string;
    /**
     * Custom stylesheet files to be used inside the iframe to display content.
     *
     * @example
     * ```javascript
     * Jodit.make('#editor', {
     *    iframe: true,
     *    iframeCSSLinks: ['styles/default.css'],
     * })
     * ```
     */
    iframeCSSLinks: string[];
    /**
     * Custom sandbox attribute for the iframe.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox
     * ```javascript
     * Jodit.make('#editor', {
     * 		iframe: true,
     * 		iframeSandbox: 'allow-same-origin allow-scripts'
     * });
     * ```
     * Empty string value means that all restrictions are enabled.
     */
    iframeSandbox: string | null;
}
interface Config {
    imageProcessor: {
        replaceDataURIToBlobIdInView: boolean;
    };
}
interface Config {
    image: ImagePropertiesOptions;
}
interface Config {
    /**
     * The number of pixels to use for indenting the current line.
     */
    indentMargin: number;
}
interface Config {
    popup: IDictionary<Array<IControlType | string> | ((editor: IJodit, target: HTMLElement | undefined, close: () => void) => Array<IControlType | string> | HTMLElement | string)>;
    toolbarInlineDisabledButtons: string[];
    toolbarInline: boolean;
    toolbarInlineForSelection: boolean;
    toolbarInlineDisableFor: string | string[];
}
interface Config {
    /**
     * limit words count
     */
    limitWords: false | number;
    /**
     * limit chars count
     */
    limitChars: false | number;
    /**
     * limit html chars count
     */
    limitHTML: false;
}
interface Config {
    /**
     * Default line spacing for the entire editor
     *
     * ```js
     * Jodit.make('#editor', {
     *   defaultLineHeight: 1.2
     * })
     * ```
     */
    defaultLineHeight: number | null;
}
interface Config {
    link: {
        /**
         * Template for the link dialog form
         */
        formTemplate: (editor: IJodit) => string | HTMLElement | IUIForm;
        formClassName?: string;
        /**
         * Follow link address after dblclick
         */
        followOnDblClick: boolean;
        /**
         * Replace inserted youtube/vimeo link to `iframe`
         */
        processVideoLink: boolean;
        /**
         * Wrap inserted link
         */
        processPastedLink: boolean;
        /**
         * Show `no follow` checkbox in link dialog.
         */
        noFollowCheckbox: boolean;
        /**
         * Show `Open in new tab` checkbox in link dialog.
         */
        openInNewTabCheckbox: boolean;
        /**
         * Use an input text to ask the classname or a select or not ask
         */
        modeClassName: 'input' | 'select';
        /**
         * Allow multiple choises (to use with modeClassName="select")
         */
        selectMultipleClassName: boolean;
        /**
         * The size of the select (to use with modeClassName="select")
         */
        selectSizeClassName?: number;
        /**
         * The list of the option for the select (to use with modeClassName="select")
         */
        selectOptionsClassName: IUIOption[];
        hotkeys: string[];
        /**
         * Prevent navigation to the link if it is readonly. Default: true
         */
        preventReadOnlyNavigation: boolean;
    };
}
interface Config {
    /**
     * Decorate media elements
     */
    mediaInFakeBlock: boolean;
    /**
     * Decorate media element with tag
     */
    mediaFakeTag: string;
    /**
     * Media tags
     */
    mediaBlocks: string[];
}
interface Config {
    /**
     * Mobile timeout for CLICK emulation
     */
    mobileTapTimeout: number;
    /**
     * After resizing, the set of buttons will change to accommodate different sizes.
     */
    toolbarAdaptive: boolean;
    /**
     * The list of buttons that appear in the editor's toolbar for medium-sized spaces (≥ options.sizeMD).
     */
    buttonsMD: ButtonsOption;
    /**
     * The list of buttons that appear in the editor's toolbar for small-sized spaces (≥ options.sizeSM).
     */
    buttonsSM: ButtonsOption;
    /**
     * The list of buttons that appear in the editor's toolbar for extra-small spaces (less than options.sizeSM).
     */
    buttonsXS: ButtonsOption;
}
interface Config {
    /**
     * Ask before paste HTML in WYSIWYG mode
     */
    askBeforePasteHTML: boolean;
    /**
     * When the user inserts a snippet of HTML, the plugin will prompt for the insertion method.
     * If the user inserts the same fragment again, the previously selected option will be used without prompting for confirmation.
     */
    memorizeChoiceWhenPasteFragment: boolean;
    /**
     * Handle pasted text - similar to HTML
     */
    processPasteHTML: boolean;
    /**
     * Inserts HTML line breaks before all newlines in a string
     */
    nl2brInPlainText: boolean;
    /**
     * List of tags that will not be removed from the pasted HTML with INSERT_AS_TEXT mode
     */
    pasteExcludeStripTags: HTMLTagNames[];
    /**
     * Options when inserting HTML string
     */
    pasteHTMLActionList: IUIOption[];
    /**
     * Scroll the editor to the pasted fragment
     */
    scrollToPastedContent: boolean;
}
interface Config {
    /**
     * Show the paste dialog if the html is similar to what MSWord gives when copying.
     */
    askBeforePasteFromWord: boolean;
    /**
     * Handle pasting of HTML - similar to a fragment copied from MSWord
     */
    processPasteFromWord: boolean;
    /**
     * Default insert method from word, if not define, it will use defaultActionOnPaste instead
     *
     * ```js
     * Jodit.make('#editor', {
     *   defaultActionOnPasteFromWord: 'insert_clear_html'
     * })
     * ```
     */
    defaultActionOnPasteFromWord: InsertMode | null;
    /**
     * Options when inserting data from Word
     */
    pasteFromWordActionList: IUIOption[];
}
interface Config {
    /**
     * Show placeholder
     * @example
     * ```javascript
     * const editor = Jodit.make('#editor', {
     *    showPlaceholder: false
     * });
     * ```
     */
    showPlaceholder: boolean;
    /**
     * Use a placeholder from original input field, if it was set
     * @example
     * ```javascript
     * //<textarea id="editor" placeholder="start typing text ..." cols="30" rows="10"></textarea>
     * const editor = Jodit.make('#editor', {
     *    useInputsPlaceholder: true
     * });
     * ```
     */
    useInputsPlaceholder: boolean;
    /**
     * Default placeholder
     * @example
     * ```javascript
     * const editor = Jodit.make('#editor', {
     *    placeholder: 'start typing text ...'
     * });
     * ```
     */
    placeholder: string;
}
interface Config {
    /**
     * Hide the link to the Jodit site at the bottom of the editor
     */
    hidePoweredByJodit: boolean;
}
interface Config {
    tableAllowCellResize: boolean;
}
interface Config {
    allowResizeX: boolean;
    allowResizeY: boolean;
}
interface Config {
    /**
     * Use true frame for editing iframe size
     */
    allowResizeTags: Set<HTMLTagNames>;
    resizer: {
        /**
         * Show size
         */
        showSize: boolean;
        hideSizeTimeout: number;
        /**
         * Save width and height proportions when resizing
         * ```js
         * Jodit.make('#editor', {
         *   allowResizeTags: ['img', 'iframe', 'table', 'jodit'],
         *   resizer: {
         *     useAspectRatio: false, // don't save,
         *     useAspectRatio: ['img'], // save only for images (default value)
         *     useAspectRatio: true // save for all
         *   }
         * });
         * ```
         */
        useAspectRatio: boolean | Set<HTMLTagNames>;
        /**
         * When resizing images, change not the styles but the width and height attributes
         */
        forImageChangeAttributes: boolean;
        /**
         * The minimum width for the editable element
         */
        min_width: number;
        /**
         * The minimum height for the item being edited
         */
        min_height: number;
    };
}
interface Config {
    /**
     * Enable custom search plugin
     * ![search](https://user-images.githubusercontent.com/794318/34545433-cd0a9220-f10e-11e7-8d26-7e22f66e266d.gif)
     */
    useSearch: boolean;
    search: {
        lazyIdleTimeout: number;
        /**
         * Use custom highlight API https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
         * or use default implementation (wrap text in span and attribute jd-tmp-selection)
         */
        useCustomHighlightAPI: boolean;
        /**
         * Function to search for a string within a substring. The default implementation is [[fuzzySearchIndex]]
         * But you can write your own. It must implement the [[FuzzySearch]] interface.
         *
         * ```ts
         * Jodit.make('#editor', {
         *   search: {
         *     fuzzySearch: (needle, haystack, offset) => {
         *       return [haystack.toLowerCase().indexOf(needle.toLowerCase(), offset), needle.length];
         *     }
         *   }
         * })
         * ```
         */
        fuzzySearch?: FuzzySearch;
    };
}
interface Config {
    select: {
        /**
         * When the user selects the elements of the list - from the beginning to
         * the end from the inside - when copying, we change the selection
         * to cover the entire selected container
         *
         * `<ul><li>|test|</li></ul>` will be `|<ul><li>test</li></ul>|`
         * `<ul><li>|test|</li><li>|test</li></ul>` will be `<ul>|<li>test</li><li>|test</li></ul>`
         */
        normalizeSelectionBeforeCutAndCopy: boolean;
        /**
         * Normalize selection after triple click
         * @example
         *
         * `<ul><li>|test</li><li>|pop</li></ul>` will be `<ul><li>|test|</li><li>pop</li</ul>|`
         */
        normalizeTripleClick: boolean;
    };
}
interface Config {
    tableAllowCellSelection: boolean;
}
interface Config {
    saveHeightInStorage: boolean;
    minWidth: number | string;
    minHeight: number | string;
    maxWidth: number | string;
    maxHeight: number | string;
}
interface Config {
    sourceEditor: 'area' | 'ace' | ((jodit: IJodit) => ISourceEditor);
    /**
         * Options for [ace](https://ace.c9.io/#config) editor
         * @example
         * ```js
         * Jodit.make('#editor', {
         * 	showGutter: true,
         * 	theme: 'ace/theme/idle_fingers',
         * 	mode: 'ace/mode/html',
         * 	wrap: true,
§		 * 	highlightActiveLine: true
         * })
         * ```
         */
    sourceEditorNativeOptions: {
        showGutter: boolean;
        theme: string;
        mode: string;
        wrap: string | boolean | number;
        highlightActiveLine: boolean;
    };
    /**
     * Beautify HTML then it possible
     */
    beautifyHTML: boolean;
    /**
     * CDN URLs for HTML Beautifier
     */
    beautifyHTMLCDNUrlsJS: string[];
    /**
     * CDN URLs for ACE editor
     */
    sourceEditorCDNUrlsJS: string[];
}
interface Config {
    speechRecognize: {
        readonly api: ISpeechRecognizeConstructor | null;
        /**
         * Returns and sets the language of the current SpeechRecognition.
         * If not specified, this defaults to the HTML lang attribute value, or
         * the user agent's language setting if that isn't set either.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang
         */
        readonly lang?: string;
        /**
         * Controls whether continuous results are returned for each recognition,
         * or only a single result.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
         */
        readonly continuous: boolean;
        /**
         * Controls whether interim results should be returned (true) or not (false.)
         * Interim results are results that are not yet final (e.g. the isFinal property is false.)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
         */
        readonly interimResults: boolean;
        /**
         * On recognition error - make an error sound
         */
        readonly sound: boolean;
        /**
         * You can specify any commands in your language by listing them with the `|` sign.
         * In the value, write down any commands for
         * [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#parameters)
         * and value (separated by ::)
         * You can also use [custom Jodit commands](#need-article)
         * For example
         * ```js
         * Jodit.make('#editor', {
         *   speechRecognize: {
         *     commands: {
         *       'remove line|remove paragraph': 'backspaceSentenceButton',
         *       'start bold': 'bold',
         *       'insert table|create table': 'insertHTML::<table><tr><td>test</td></tr></table>',
         *     }
         *   }
         * });
         * ```
         */
        readonly commands: IDictionary<string>;
    };
}
interface Config {
    /**
     * Options specifies whether the editor is to have its spelling and grammar checked or not
     * @see http://www.w3schools.com/tags/att_global_spellcheck.asp
     */
    spellcheck: boolean;
}
interface Config {
    showCharsCounter: boolean;
    countHTMLChars: boolean;
    countTextSpaces: boolean;
    showWordsCounter: boolean;
}
interface Config {
    /**
     * @example
     * ```javascript
     * var editor = Jodit.make('#someid', {
     *  toolbarSticky: false
     * })
     * ```
     */
    toolbarSticky: boolean;
    toolbarDisableStickyForMobile: boolean;
    /**
     * For example, in Joomla, the top menu bar closes Jodit toolbar when scrolling. Therefore, it is necessary to
     * move the toolbar Jodit by this amount [more](https://xdsoft.net/jodit/docs/#2.5.57)
     *
     * @example
     * ```javascript
     * var editor = Jodit.make('#someid', {
     *  toolbarStickyOffset: 100
     * })
     * ```
     */
    toolbarStickyOffset: number;
}
interface Config {
    specialCharacters: string[];
    usePopupForSpecialCharacters: boolean;
}
interface Config {
    tab: {
        /**
         * Pressing Tab inside LI will add an internal list
         */
        tabInsideLiInsertNewList: boolean;
    };
}
interface Config {
    table: {
        selectionCellStyle: string;
        useExtraClassesOptions: boolean;
    };
}
interface Config {
    video: {
        /**
         * Custom function for parsing video URL to embed code
         * ```javascript
         * Jodit.make('#editor', {
         * 		video: {
         * 			// Defaul behavior
         * 			parseUrlToVideoEmbed: (url, size) => Jodit.modules.Helpers.convertMediaUrlToVideoEmbed(url, size)
         * 		}
         * });
         * ```
         */
        parseUrlToVideoEmbed?: (url: string, { width, height }?: {
            width?: number;
            height?: number;
        }) => string;
        /**
         * Default width for video iframe. Default: 400
         */
        defaultWidth?: number;
        /**
         * Default height for video iframe. Default: 345
         */
        defaultHeight?: number;
    };
}
interface Config {
    wrapNodes: {
        /**
         * List of tags that should not be wrapped
         * Default: `new Set(['hr', 'style', 'br'])`
         */
        exclude: Set<HTMLTagNames>;
        /**
         * If the editor is empty, then insert an empty paragraph into it
         * ```javascript
         * Jodit.make('#editor', {
         * 	wrapNodes: {
         * 		emptyBlockAfterInit: true
         * 	}
         * });
         * ```
         * Default: `true`
         */
        emptyBlockAfterInit: boolean;
    };
}
interface Config {
    showXPathInStatusbar: boolean;
}
