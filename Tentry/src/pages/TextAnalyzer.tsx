import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Row, Col, Typography } from 'antd';
import { ClearOutlined, CopyOutlined, FileSearchOutlined } from '@ant-design/icons';
import LexicalEditor from '../components/LexicalEditor';
import TextStatsComponent from '../components/TextStats';
import { analyzeText } from '../utils/textAnalysis';
import { useDebounce } from '../hooks/useDebounce';
import { useStore } from '../store';

const { Title } = Typography;

const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);
  
  const analysisResult = useStore(state => state.analysisResult);
  const setAnalysisResult = useStore(state => state.setAnalysisResult);
  const setCurrentText = useStore(state => state.setCurrentText);

  useEffect(() => {
    if (debouncedText.trim()) {
      const result = analyzeText(debouncedText);
      setAnalysisResult(result);
      setCurrentText(debouncedText);
      
      // Сохраняем в localStorage
      localStorage.setItem('tentry-current-text', debouncedText);
      localStorage.setItem('tentry-analysis-result', JSON.stringify(result));
    } else {
      setAnalysisResult(null);
    }
  }, [debouncedText, setAnalysisResult, setCurrentText]);

  useEffect(() => {
    // Загружаем сохранённый текст при монтировании
    const savedText = localStorage.getItem('tentry-current-text');
    const savedResult = localStorage.getItem('tentry-analysis-result');
    
    if (savedText) {
      setText(savedText);
    }
    
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setAnalysisResult(parsedResult);
      } catch (error) {
        console.error('Failed to parse saved analysis result:', error);
      }
    }
  }, [setAnalysisResult]);

  const handleClear = () => {
    setText('');
    setAnalysisResult(null);
    setCurrentText('');
    localStorage.removeItem('tentry-current-text');
    localStorage.removeItem('tentry-analysis-result');
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleAnalyze = () => {
    if (text.trim()) {
      const result = analyzeText(text);
      setAnalysisResult(result);
      setCurrentText(text);
      
      // Сохраняем в localStorage
      localStorage.setItem('tentry-current-text', text);
      localStorage.setItem('tentry-analysis-result', JSON.stringify(result));
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Анализ текста</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Текст для анализа" 
            className="card"
            extra={
              <Space>
                <Button 
                  icon={<CopyOutlined />}
                  onClick={handlePasteFromClipboard}
                  size="small"
                >
                  Вставить
                </Button>
                <Button 
                  icon={<FileSearchOutlined />}
                  onClick={handleAnalyze}
                  type="primary"
                  size="small"
                >
                  Анализировать
                </Button>
                <Button 
                  icon={<ClearOutlined />}
                  onClick={handleClear}
                  danger
                  size="small"
                >
                  Очистить
                </Button>
              </Space>
            }
          >
            <LexicalEditor
              onChange={setText}
              placeholder="Введите или вставьте текст для анализа. Анализ выполняется автоматически при наборе текста."
            />
            
            {text && (
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                background: 'var(--background-color)',
                borderRadius: '8px',
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                <strong>Символов:</strong> {text.length} | 
                <strong> Слов:</strong> {text.split(/\s+/).filter(word => word.length > 0).length}
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {analysisResult ? (
            <TextStatsComponent
              stats={analysisResult.stats}
              semanticCore={analysisResult.semanticCore}
              stopWords={analysisResult.stopWords}
            />
          ) : (
            <Card className="card">
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: 'var(--text-secondary)'
              }}>
                <FileSearchOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <Title level={4} style={{ color: 'var(--text-secondary)' }}>
                  Введите текст для анализа
                </Title>
                <p>Анализ включает:</p>
                <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                  <li>Расчёт классической и академической тошноты</li>
                  <li>Подсчёт символов, слов и уникальных слов</li>
                  <li>Анализ водности и стоп-слов</li>
                  <li>Извлечение семантического ядра</li>
                </ul>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TextAnalyzer;
