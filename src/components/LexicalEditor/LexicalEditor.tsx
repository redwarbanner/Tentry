import { useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, type EditorState } from 'lexical';

import './LexicalEditor.css';
import { EDITOR_NODES } from './utils/editorNodes.ts';
import { EDITOR_THEME } from './utils/editorTheme.ts';
import ToolbarPlugin from '../LexicalToolbar/ToolbarPlugin.tsx';

type Props = {
  onChange?: (content: string) => void;
  placeholder?: string;
};

function LexicalEditor({
  onChange,
  placeholder = 'Введите или вставьте текст для анализа...',
}: Props) {
  const initialConfig = {
    namespace: 'TentryEditor',
    theme: EDITOR_THEME,
    onError: (error: Error) => {
      console.error('Lexical error:', error);
    },
    nodes: EDITOR_NODES,
  };

  const handleChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const textContent = root.getTextContent();
        onChange?.(textContent);
      });
    },
    [onChange],
  );

  return (
    <div className="editor-container">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-content" />}
            placeholder={<div className="editor-placeholder">{placeholder}</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
}

export default LexicalEditor;
