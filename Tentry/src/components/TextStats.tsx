import React from 'react';
import { Card, Table, Typography, Row, Col, Tag } from 'antd';
import type { TextStats as ITextStats, SemanticPhrase, StopWord } from '../types';
import { getToxicityColor } from '../utils/textAnalysis';

const { Text } = Typography;

interface TextStatsProps {
  stats: ITextStats;
  semanticCore: SemanticPhrase[];
  stopWords: StopWord[];
}

const TextStatsComponent: React.FC<TextStatsProps> = ({
  stats,
  semanticCore,
  stopWords
}) => {
  const getToxicityTag = (toxicity: number, label: string) => {
    const color = getToxicityColor(toxicity);
    
    return (
      <Tag 
        color={color}
        style={{ 
          borderRadius: '20px',
          padding: '4px 12px',
          fontWeight: 500
        }}
      >
        {label}: {toxicity.toFixed(2)}%
      </Tag>
    );
  };

  const semanticColumns = [
    {
      title: 'Фраза',
      dataIndex: 'phrase',
      key: 'phrase',
      width: '60%',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: '20%',
      align: 'center' as const,
    },
    {
      title: 'Частота (%)',
      dataIndex: 'frequency',
      key: 'frequency',
      width: '20%',
      align: 'center' as const,
      render: (value: number) => value.toFixed(2),
    },
  ];

  const stopWordsColumns = [
    {
      title: 'Слово',
      dataIndex: 'word',
      key: 'word',
      width: '60%',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: '20%',
      align: 'center' as const,
    },
    {
      title: 'Частота (%)',
      dataIndex: 'frequency',
      key: 'frequency',
      width: '20%',
      align: 'center' as const,
      render: (value: number) => value.toFixed(2),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Основная статистика */}
      <Card title="Статистика текста" className="card">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.characterCount}</div>
            <div className="stat-label">Символов</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.characterCountNoSpaces}</div>
            <div className="stat-label">Символов без пробелов</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.wordCount}</div>
            <div className="stat-label">Слов</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.uniqueWordCount}</div>
            <div className="stat-label">Уникальных слов</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.significantWordCount}</div>
            <div className="stat-label">Значимых слов</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.stopWordCount}</div>
            <div className="stat-label">Стоп-слов</div>
          </div>
        </div>
        
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Text strong>Вода: </Text>
            <Tag color={stats.waterPercentage > 50 ? 'red' : stats.waterPercentage > 30 ? 'orange' : 'green'}>
              {stats.waterPercentage.toFixed(2)}%
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* Тошнота */}
      <Card title="Тошнота текста" className="card">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            {getToxicityTag(stats.classicToxicity, 'Классическая')}
          </Col>
          <Col span={12}>
            {getToxicityTag(stats.academicToxicity, 'Академическая')}
          </Col>
        </Row>
        
        <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          <p>• Классическая тошнота — корень из количества повторений самого частого слова</p>
          <p>• Академическая тошнота — отношение повторяющихся слов к общему количеству символов</p>
        </div>
      </Card>

      {/* Семантическое ядро */}
      <Card title="Семантическое ядро" className="card">
        <Table
          dataSource={semanticCore.map((item, index) => ({ ...item, key: index }))}
          columns={semanticColumns}
          pagination={{ pageSize: 10 }}
          size="small"
          scroll={{ y: 400 }}
        />
      </Card>

      {/* Стоп-слова */}
      <Card title="Стоп-слова" className="card">
        <Table
          dataSource={stopWords.map((item, index) => ({ ...item, key: index }))}
          columns={stopWordsColumns}
          pagination={{ pageSize: 10 }}
          size="small"
          scroll={{ y: 400 }}
        />
      </Card>
    </div>
  );
};

export default TextStatsComponent;
