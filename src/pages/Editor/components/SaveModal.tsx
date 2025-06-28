import { Modal, Input } from 'antd';
import type { ChangeEvent } from 'react';

interface SaveModalProps {
  visible: boolean;
  fileName: string;
  setFileName: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const SaveModal = ({ visible, fileName, setFileName, onSave, onCancel }: SaveModalProps) => (
  <Modal
    title="Сохранить документ"
    open={visible}
    onOk={onSave}
    onCancel={onCancel}
    okText="Сохранить"
    cancelText="Отмена"
  >
    <Input
      placeholder="Введите название документа"
      value={fileName}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
      }}
      onPressEnter={onSave}
      autoFocus
    />
  </Modal>
);

export default SaveModal;
