import { Card, Button, Space, Row, Col, Typography, Input } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

import './TextAnalyzer.css';
import EmptyStateBlock from '../../components/EmptyStateBlock/EmptyStateBlock';
import TextStats from '../../components/TextStats/TextStats';
import { useStore } from '../../store';
import { useTextAnalysis } from './hooks/useTextAnalysis.ts';

const { Title } = Typography;

const TextAnalyzer = () => {
  const analysisResult = useStore(state => state.analysisResult);
  const setAnalysisResult = useStore(state => state.setAnalysisResult);
  const setCurrentText = useStore(state => state.setCurrentText);

  const { text, setText, handleClear } = useTextAnalysis({
    setAnalysisResult,
    setCurrentText,
  });

  return (
    <div className="fadeIn">
      <div className="title">
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
              autoFocus
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
