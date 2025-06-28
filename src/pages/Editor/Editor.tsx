import { useState } from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { SaveOutlined, FolderOpenOutlined, FileAddOutlined } from '@ant-design/icons';
import LexicalEditor from '../../components/LexicalEditor/LexicalEditor';
import { useEditorStorage } from './hooks/useEditorStorage';
import SaveModal from './components/SaveModal';
import LoadModal from './components/LoadModal';
import StatsBar from './components/StatsBar';

const { Title } = Typography;

const Editor = () => {
  const { content, setContent, savedTexts, saveTexts, currentFileName, setCurrentFileName } =
    useEditorStorage();

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [saveFileName, setSaveFileName] = useState('');

  const handleSave = () => {
    if (currentFileName) {
      const updated = savedTexts.map(t =>
        t.id === currentFileName ? { ...t, content, updatedAt: new Date() } : t,
      );
      saveTexts(updated);
    } else {
      setShowSaveModal(true);
    }
  };

  const handleSaveNew = () => {
    if (!saveFileName.trim()) return;
    const newText = {
      id: Date.now().toString(),
      title: saveFileName.trim(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...savedTexts, newText];
    saveTexts(updated);
    setCurrentFileName(newText.id);
    localStorage.setItem('tentry-editor-current-file', newText.id);
    setShowSaveModal(false);
    setSaveFileName('');
  };

  const handleLoad = (text: (typeof savedTexts)[0]) => {
    setContent(text.content);
    setCurrentFileName(text.id);
    localStorage.setItem('tentry-editor-current-file', text.id);
    setShowLoadModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = savedTexts.filter(t => t.id !== id);
    saveTexts(updated);
    if (currentFileName === id) {
      setCurrentFileName('');
      localStorage.removeItem('tentry-editor-current-file');
    }
  };

  const handleNewFile = () => {
    setContent('');
    setCurrentFileName('');
    localStorage.removeItem('tentry-editor-current-file');
  };

  const getCurrentFileName = () => {
    if (!currentFileName) return 'Новый документ';
    const found = savedTexts.find(t => t.id === currentFileName);
    return found ? found.title : 'Новый документ';
  };

  return (
    <div className="fade-in">
      <Title level={2} style={{ marginBottom: 24 }}>
        Текстовый редактор
      </Title>

      <Card
        title={getCurrentFileName()}
        className="card"
        extra={
          <Space>
            <Button icon={<FileAddOutlined />} onClick={handleNewFile}>
              Новый
            </Button>
            <Button
              icon={<FolderOpenOutlined />}
              onClick={() => {
                setShowLoadModal(true);
              }}
            >
              Открыть
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Сохранить
            </Button>
          </Space>
        }
      >
        <LexicalEditor
          onChange={setContent}
          placeholder="Начните писать ваш текст здесь. Все изменения автоматически сохраняются в браузере."
        />
        <StatsBar content={content} />
      </Card>

      <SaveModal
        visible={showSaveModal}
        fileName={saveFileName}
        setFileName={setSaveFileName}
        onSave={handleSaveNew}
        onCancel={() => {
          setShowSaveModal(false);
          setSaveFileName('');
        }}
      />

      <LoadModal
        visible={showLoadModal}
        texts={savedTexts}
        onLoad={handleLoad}
        onDelete={handleDelete}
        onCancel={() => {
          setShowLoadModal(false);
        }}
      />
    </div>
  );
};

export default Editor;
