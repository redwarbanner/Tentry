import { Modal, List, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { SavedText } from '../../../types';

interface LoadModalProps {
  visible: boolean;
  texts: SavedText[];
  onLoad: (text: SavedText) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const LoadModal = ({ visible, texts, onLoad, onDelete, onCancel }: LoadModalProps) => (
  <Modal title="Открыть документ" open={visible} onCancel={onCancel} footer={null} width={600}>
    {texts.length > 0 ? (
      <List
        dataSource={texts}
        renderItem={text => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => {
                  onLoad(text);
                }}
              >
                Открыть
              </Button>,
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  onDelete(text.id);
                }}
              >
                Удалить
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={text.title}
              description={
                <div>
                  <div>Создан: {new Date(text.createdAt).toLocaleDateString()}</div>
                  <div>Изменён: {new Date(text.updatedAt).toLocaleDateString()}</div>
                  <div>{text.content.length} символов</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    ) : (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
        Нет сохранённых документов
      </div>
    )}
  </Modal>
);

export default LoadModal;
