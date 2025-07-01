import { useState, useEffect, useCallback } from 'react';
import { Card, Button, Space, Row, Col, Typography, Input } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

import './TextAnalyzer.css';
import EmptyStateBlock from '../../components/EmptyStateBlock/EmptyStateBlock.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { useStore } from '../../store';
import TextStats from '../../components/TextStats/TextStats.tsx';
import type { TextAnalysisResult } from '../../types';
import { analyzeText } from '../../utils';

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

  const handleClear = useCallback(() => {
    setText('');
    setAnalysisResult(null);
    setCurrentText('');
    localStorage.removeItem('tentry-current-text');
    localStorage.removeItem('tentry-analysis-result');
  }, [setAnalysisResult, setCurrentText]);

  return (
    <div className={'fadeIn'}>
      <div className={'title'}>
        <Title level={2}>Анализ текста</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title="Текст для анализа"
            className="card"
            extra={
              <Space>
                <Button icon={<ClearOutlined />} onClick={handleClear} danger size="small">
                  Очистить
                </Button>
              </Space>
            }
          >
            <Input.TextArea
              value={text}
              onChange={e => {
                setText(e.target.value);
              }}
              placeholder="Введите или вставьте текст для анализа. Анализ выполняется автоматически при наборе текста."
              autoSize={{ minRows: 8, maxRows: 20 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {analysisResult && text.trim() ? (
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
