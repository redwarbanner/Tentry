import { BoldOutlined, ItalicOutlined, UnderlineOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import FormatButton from './UI/FormatButton';
import ListButtons from './UI/ListButtons';
import { useTextFormattingState } from './hooks/useTextFormattingState';
import { formatCommand, insertListCommand } from './utils/commands';

const ToolbarPlugin = () => {
  const { isBold, isItalic, isUnderline, editor } = useTextFormattingState();

  return (
    <div
      className="editor-toolbar"
      style={{
        background: 'var(--card-background)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <FormatButton
        icon={<BoldOutlined />}
        active={isBold}
        onClick={() => {
          formatCommand(editor, 'bold');
        }}
      />
      <FormatButton
        icon={<ItalicOutlined />}
        active={isItalic}
        onClick={() => {
          formatCommand(editor, 'italic');
        }}
      />
      <FormatButton
        icon={<UnderlineOutlined />}
        active={isUnderline}
        onClick={() => {
          formatCommand(editor, 'underline');
        }}
      />

      <Divider type="vertical" />

      <ListButtons
        onUnordered={() => {
          insertListCommand(editor, 'unordered');
        }}
        onOrdered={() => {
          insertListCommand(editor, 'ordered');
        }}
      />
    </div>
  );
};

export default ToolbarPlugin;
