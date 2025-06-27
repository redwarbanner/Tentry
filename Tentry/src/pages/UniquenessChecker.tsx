import React, { useState } from 'react';
import { Card, Button, Progress, Typography, Table, Tag, Space, Row, Col, Alert } from 'antd';
import { PlayCircleOutlined, StopOutlined, ClearOutlined } from '@ant-design/icons';
import LexicalEditor from '../components/LexicalEditor';
import { checkUniqueness, estimateCheckTime } from '../utils/uniquenessChecker';
import { useStore } from '../store';

const { Title, Text } = Typography;

const UniquenessChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  const uniquenessCheck = useStore(state => state.uniquenessCheck);
  const setUniquenessCheck = useStore(state => state.setUniquenessCheck);

  const handleStartCheck = async () => {
    if (!text.trim()) return;
    
    setIsChecking(true);
    setCurrentProgress(0);
    
    try {
      const result = await checkUniqueness(text, (progress) => {
        setCurrentProgress(progress);
      });
      
      setUniquenessCheck(result);
      localStorage.setItem('tentry-uniqueness-check', JSON.stringify(result));
    } catch (error) {
      console.error('Uniqueness check failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleStopCheck = () => {
    setIsChecking(false);
    setCurrentProgress(0);
  };

  const handleClear = () => {
    setText('');
    setUniquenessCheck(null);
    setCurrentProgress(0);
    setIsChecking(false);
    localStorage.removeItem('tentry-uniqueness-check');
  };

  const estimatedTime = text ? estimateCheckTime(text.length) : 0;

  const columns = [
    {
      title: 'Фраза',
      dataIndex: 'phrase',
      key: 'phrase',
      width: '70%',
      render: (text: string, record: any) => (
        <span className={record.isUnique ? 'phrase-highlight unique' : 'phrase-highlight not-unique'}>
          {text}
        </span>
      )
    },
    {
      title: 'Статус',
      dataIndex: 'isUnique',
      key: 'isUnique',
      width: '15%',
      align: 'center' as const,
      render: (isUnique: boolean) => (
        <Tag color={isUnique ? 'green' : 'red'}>
          {isUnique ? 'Уникальная' : 'Найдена'}
        </Tag>
      )
    },
    {
      title: 'Источники',
      dataIndex: 'sources',
      key: 'sources',
      width: '15%',
      render: (sources: string[]) => (
        sources && sources.length > 0 ? sources.join(', ') : '—'
      )
    }
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Проверка уникальности</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Текст для проверки" 
            className="card"
            extra={
              <Space>
                {!isChecking ? (
                  <Button 
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={handleStartCheck}
                    disabled={!text.trim()}
                  >
                    Проверить
                  </Button>
                ) : (
                  <Button 
                    danger
                    icon={<StopOutlined />}
                    onClick={handleStopCheck}
                  >
                    Остановить
                  </Button>
                )}
                <Button 
                  icon={<ClearOutlined />}
                  onClick={handleClear}
                >
                  Очистить
                </Button>
              </Space>
            }
          >
            <LexicalEditor
              onChange={setText}
              placeholder="Введите текст для проверки уникальности. Текст будет разбит на фразы по 8 слов и проверен через поисковые системы."
            />
            
            {text && (
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                background: 'var(--background-color)',
                borderRadius: '8px'
              }}>
                <Text strong>Примерное время проверки: </Text>
                <Text>{Math.ceil(estimatedTime)} секунд</Text>
                <br />
                <Text type="secondary">
                  Текст будет разбит на фразы и проверен через Google Search
                </Text>
              </div>
            )}

            {isChecking && (
              <div className="progress-container">
                <Progress 
                  percent={currentProgress} 
                  status={isChecking ? 'active' : 'success'}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {uniquenessCheck ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card title="Результат проверки" className="card">
                <div style={{ marginBottom: '16px' }}>
                  <Title level={4} style={{ marginBottom: '8px' }}>
                    Общая уникальность: {uniquenessCheck.overallUniqueness.toFixed(1)}%
                  </Title>
                  <Progress 
                    percent={uniquenessCheck.overallUniqueness}
                    strokeColor={
                      uniquenessCheck.overallUniqueness >= 90 ? '#52c41a' :
                      uniquenessCheck.overallUniqueness >= 70 ? '#fa8c16' : '#f5222d'
                    }
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 600 }}>
                      {uniquenessCheck.results.filter(r => r.isUnique).length}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      Уникальных фраз
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 600 }}>
                      {uniquenessCheck.results.filter(r => !r.isUnique).length}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      Найденных фраз
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Детальные результаты" className="card">
                <Table
                  dataSource={uniquenessCheck.results.map((result, index) => ({
                    ...result,
                    key: index
                  }))}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                  size="small"
                  scroll={{ y: 400 }}
                />
              </Card>
            </div>
          ) : (
            <Card className="card">
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: 'var(--text-secondary)'
              }}>
                <PlayCircleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <Title level={4} style={{ color: 'var(--text-secondary)' }}>
                  Введите текст для проверки уникальности
                </Title>
                
                <Alert
                  type="info"
                  showIcon
                  message="Как работает проверка"
                  description={
                    <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                      <li>Текст разбивается на фразы по 8 слов</li>
                      <li>Каждая фраза ищется в Google в кавычках</li>
                      <li>Между запросами делается пауза в 1 секунду</li>
                      <li>Результат показывает процент уникальности</li>
                    </ul>
                  }
                  style={{ marginTop: '20px' }}
                />
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UniquenessChecker;
