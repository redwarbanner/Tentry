import { Button, Space } from 'antd';
import { SaveOutlined, FolderOpenOutlined, FileAddOutlined } from '@ant-design/icons';

interface Props {
  onNew: () => void;
  onOpen: () => void;
  onSave: () => void;
}

const Toolbar = ({ onNew, onOpen, onSave }: Props) => (
  <Space>
    <Button icon={<FileAddOutlined />} onClick={onNew}>
      Новый
    </Button>
    <Button icon={<FolderOpenOutlined />} onClick={onOpen}>
      Открыть
    </Button>
    <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
      Сохранить
    </Button>
  </Space>
);

export default Toolbar;
