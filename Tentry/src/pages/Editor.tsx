import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography, Input, Modal, List } from 'antd';
import { SaveOutlined, FolderOpenOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import LexicalEditor from '../components/LexicalEditor';
import type { SavedText } from '../types';

const { Title } = Typography;

const Editor: React.FC = () => {
  const [content, setContent] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [savedTexts, setSavedTexts] = useState<SavedText[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [saveFileName, setSaveFileName] = useState('');

  useEffect(() => {
    // Загружаем сохранённые тексты
    const saved = localStorage.getItem('tentry-saved-texts');
    if (saved) {
      try {
        const parsedTexts = JSON.parse(saved);
        setSavedTexts(parsedTexts);
      } catch (error) {
        console.error('Failed to load saved texts:', error);
      }
    }

    // Загружаем текущий текст редактора
    const currentContent = localStorage.getItem('tentry-editor-content');
    const currentFile = localStorage.getItem('tentry-editor-current-file');
    
    if (currentContent) {
      setContent(currentContent);
    }
    if (currentFile) {
      setCurrentFileName(currentFile);
    }
  }, []);

  useEffect(() => {
    // Автосохранение текущего содержимого
    localStorage.setItem('tentry-editor-content', content);
  }, [content]);

  const handleSave = () => {
    if (currentFileName) {
      // Обновляем существующий файл
      const updatedTexts = savedTexts.map(text => 
        text.id === currentFileName 
          ? { ...text, content, updatedAt: new Date() }
          : text
      );
      setSavedTexts(updatedTexts);
      localStorage.setItem('tentry-saved-texts', JSON.stringify(updatedTexts));
    } else {
      // Показываем модал для сохранения нового файла
      setShowSaveModal(true);
    }
  };

  const handleSaveNew = () => {
    if (!saveFileName.trim()) return;

    const newText: SavedText = {
      id: Date.now().toString(),
      title: saveFileName.trim(),
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedTexts = [...savedTexts, newText];
    setSavedTexts(updatedTexts);
    setCurrentFileName(newText.id);
    localStorage.setItem('tentry-saved-texts', JSON.stringify(updatedTexts));
    localStorage.setItem('tentry-editor-current-file', newText.id);
    
    setShowSaveModal(false);
    setSaveFileName('');
  };

  const handleLoad = (text: SavedText) => {
    setContent(text.content);
    setCurrentFileName(text.id);
    localStorage.setItem('tentry-editor-current-file', text.id);
    setShowLoadModal(false);
  };

  const handleDelete = (id: string) => {
    const updatedTexts = savedTexts.filter(text => text.id !== id);
    setSavedTexts(updatedTexts);
    localStorage.setItem('tentry-saved-texts', JSON.stringify(updatedTexts));
    
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
    const text = savedTexts.find(t => t.id === currentFileName);
    return text ? text.title : 'Новый документ';
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Текстовый редактор</Title>
      </div>

      <Card 
        title={getCurrentFileName()}
        className="card"
        extra={
          <Space>
            <Button 
              icon={<FileAddOutlined />}
              onClick={handleNewFile}
            >
              Новый
            </Button>
            <Button 
              icon={<FolderOpenOutlined />}
              onClick={() => setShowLoadModal(true)}
            >
              Открыть
            </Button>
            <Button 
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </Space>
        }
      >
        <LexicalEditor
          onChange={setContent}
          placeholder="Начните писать ваш текст здесь. Все изменения автоматически сохраняются в браузере."
        />

        {content && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: 'var(--background-color)',
            borderRadius: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>
              <strong>Символов:</strong> {content.length} | 
              <strong> Слов:</strong> {content.split(/\s+/).filter(word => word.length > 0).length}
            </span>
            <span>
              Автосохранение активно
            </span>
          </div>
        )}
      </Card>

      {/* Модал сохранения */}
      <Modal
        title="Сохранить документ"
        open={showSaveModal}
        onOk={handleSaveNew}
        onCancel={() => {
          setShowSaveModal(false);
          setSaveFileName('');
        }}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Input
          placeholder="Введите название документа"
          value={saveFileName}
          onChange={(e) => setSaveFileName(e.target.value)}
          onPressEnter={handleSaveNew}
          autoFocus
        />
      </Modal>

      {/* Модал загрузки */}
      <Modal
        title="Открыть документ"
        open={showLoadModal}
        onCancel={() => setShowLoadModal(false)}
        footer={null}
        width={600}
      >
        {savedTexts.length > 0 ? (
          <List
            dataSource={savedTexts}
            renderItem={(text) => (
              <List.Item
                actions={[
                  <Button 
                    type="link"
                    onClick={() => handleLoad(text)}
                  >
                    Открыть
                  </Button>,
                  <Button 
                    type="link" 
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(text.id)}
                  >
                    Удалить
                  </Button>
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
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: 'var(--text-secondary)'
          }}>
            Нет сохранённых документов
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Editor;
