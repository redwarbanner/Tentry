import React, { useCallback, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button, Divider } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1
      )
    );
  }, [editor, updateToolbar]);

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };

  const insertOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const insertUnorderedList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  return (
    <div
      className="editor-toolbar"
      style={{
        background: 'var(--card-background)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}
    >
      <Button
        size="small"
        type={isBold ? 'primary' : 'default'}
        icon={<BoldOutlined />}
        onClick={formatBold}
      />
      <Button
        size="small"
        type={isItalic ? 'primary' : 'default'}
        icon={<ItalicOutlined />}
        onClick={formatItalic}
      />
      <Button
        size="small"
        type={isUnderline ? 'primary' : 'default'}
        icon={<UnderlineOutlined />}
        onClick={formatUnderline}
      />

      <Divider type="vertical" />

      <Button
        size="small"
        icon={<UnorderedListOutlined />}
        onClick={insertUnorderedList}
      />
      <Button
        size="small"
        icon={<OrderedListOutlined />}
        onClick={insertOrderedList}
      />
    </div>
  );
}
