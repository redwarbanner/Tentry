import type { LexicalEditor } from 'lexical';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';

export const formatCommand = (
  editor: LexicalEditor,
  type: 'bold' | 'italic' | 'underline',
): void => {
  editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
};

export const insertListCommand = (editor: LexicalEditor, type: 'ordered' | 'unordered'): void => {
  const command = type === 'ordered' ? INSERT_ORDERED_LIST_COMMAND : INSERT_UNORDERED_LIST_COMMAND;

  editor.dispatchCommand(command, undefined);
};
