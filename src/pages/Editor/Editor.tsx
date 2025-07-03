import { useMemo, useState } from 'react';
import { Card, Typography, Input } from 'antd';

import { useEditorStorage } from './hooks/useEditorStorage';
import { useEditorActions } from './hooks/useEditorActions';
import Toolbar from './components/Toolbar';
import SaveModal from './components/SaveModal';
import LoadModal from './components/LoadModal';
import StatsBar from './components/StatsBar';
import type { TextFile } from './types';

const { Title } = Typography;

const Editor = () => {
  const { content, setContent, savedTexts, saveTexts, currentFileName, setCurrentFileName } =
    useEditorStorage();

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [saveFileName, setSaveFileName] = useState('');

  const { handleSave, handleLoad, handleDelete, handleNewFile, updateCurrentFile } =
    useEditorActions(savedTexts, setContent, setCurrentFileName, currentFileName, saveTexts);

  const displayFileName = useMemo(() => {
    if (!currentFileName) return 'Новый документ';
    const found = savedTexts.find(t => t.id === currentFileName);
    return found?.title ?? 'Новый документ';
  }, [currentFileName, savedTexts]);

  const closeSaveModal = () => {
    setShowSaveModal(false);
    setSaveFileName('');
  };

  const handleSaveNew = () => {
    if (!saveFileName.trim()) return;

    const newText: TextFile = {
      id: Date.now().toString(),
      title: saveFileName.trim(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...savedTexts, newText];
    saveTexts(updated);
    updateCurrentFile(newText.id);
    closeSaveModal();
  };

  return (
    <div className="fade-in">
      <Title level={2} style={{ marginBottom: 24 }}>
        Текстовый редактор
      </Title>

      <Card
        title={displayFileName}
        className="card"
        extra={
          <Toolbar
            onNew={handleNewFile}
            onOpen={() => {
              setShowLoadModal(true);
            }}
            onSave={() => {
              handleSave(content, () => {
                setShowSaveModal(true);
              });
            }}
          />
        }
      >
        <Input.TextArea
          value={content}
          onChange={e => {
            setContent(e.target.value);
          }}
          placeholder="Начните писать ваш текст здесь. Все изменения автоматически сохраняются в браузере."
          autoSize={{ minRows: 8, maxRows: 20 }}
          allowClear
        />
        <StatsBar content={content} />
      </Card>

      <SaveModal
        visible={showSaveModal}
        fileName={saveFileName}
        setFileName={setSaveFileName}
        onSave={handleSaveNew}
        onCancel={closeSaveModal}
      />

      <LoadModal
        visible={showLoadModal}
        texts={savedTexts}
        onLoad={text => {
          handleLoad(text);
          setShowLoadModal(false);
        }}
        onDelete={handleDelete}
        onCancel={() => {
          setShowLoadModal(false);
        }}
      />
    </div>
  );
};

export default Editor;
