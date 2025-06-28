import { useState, useEffect } from 'react';
import { Card, Button, Space, Row, Col, Typography } from 'antd';
import { ClearOutlined, CopyOutlined, FileSearchOutlined } from '@ant-design/icons';

import styles from './styles.module.css';
import TextCounters from './TextCounters';
import EmptyStateBlock from './EmptyStateBlock';
import { type TextAnalysisResult } from './types';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { useStore } from '../../store';
import { analyzeText } from '../../utils/textAnalysis.ts';
import LexicalEditor from '../../components/LexicalEditor/LexicalEditor.tsx';
import TextStats from '../../components/TextStats/TextStats.tsx';

const { Title } = Typography;

const TextAnalyzer = () => {
  const [text, setText] = useState<string>('');
  const debouncedText = useDebounce(text, 500);

  const analysisResult = useStore(state => state.analysisResult);
  const setAnalysisResult = useStore(state => state.setAnalysisResult);
  const setCurrentText = useStore(state => state.setCurrentText);

  useEffect(() => {
    if (debouncedText.trim()) {
      const result = analyzeText(debouncedText);
      setAnalysisResult(result);
      setCurrentText(debouncedText);
      localStorage.setItem('tentry-current-text', debouncedText);
      localStorage.setItem('tentry-analysis-result', JSON.stringify(result));
    } else {
      setAnalysisResult(null);
    }
  }, [debouncedText, setAnalysisResult, setCurrentText]);

  useEffect(() => {
    const savedText = localStorage.getItem('tentry-current-text');
    const savedResult = localStorage.getItem('tentry-analysis-result');

    if (savedText) {
      setText(savedText);
    }

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult) as TextAnalysisResult;
        setAnalysisResult(parsedResult);
      } catch (error) {
        console.error('Ошибка разбора savedResult:', error);
      }
    }
  }, [setAnalysisResult]);

  const handleClear = (): void => {
    setText('');
    setAnalysisResult(null);
    setCurrentText('');
    localStorage.removeItem('tentry-current-text');
    localStorage.removeItem('tentry-analysis-result');
  };

  const handlePasteFromClipboard = async (): Promise<void> => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error('Ошибка чтения из буфера обмена:', error);
    }
  };

  const handleAnalyze = (): void => {
    if (text.trim()) {
      const result = analyzeText(text);
      setAnalysisResult(result);
      setCurrentText(text);
      localStorage.setItem('tentry-current-text', text);
      localStorage.setItem('tentry-analysis-result', JSON.stringify(result));
    }
  };

  return (
    <div className={styles.fadeIn}>
      <div className={styles.title}>
        <Title level={2}>Анализ текста</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title="Текст для анализа"
            className="card"
            extra={
              <Space>
                <Button icon={<CopyOutlined />} onClick={handlePasteFromClipboard} size="small">
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
                <Button icon={<ClearOutlined />} onClick={handleClear} danger size="small">
                  Очистить
                </Button>
              </Space>
            }
          >
            <LexicalEditor
              onChange={setText}
              placeholder="Введите или вставьте текст для анализа. Анализ выполняется автоматически при наборе текста."
            />

            {text && <TextCounters text={text} />}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {analysisResult ? (
            <TextStats
              stats={analysisResult.stats}
              semanticCore={analysisResult.semanticCore}
              stopWords={analysisResult.stopWords}
            />
          ) : (
            <Card className="card">
              <EmptyStateBlock />
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TextAnalyzer;
