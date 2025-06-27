import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, Row, Col, Alert, Tag, Divider } from 'antd';
import { SearchOutlined, ClearOutlined, GlobalOutlined } from '@ant-design/icons';
import { analyzePage, isValidUrl, formatUrl } from '../utils/pageAnalyzer';
import { useStore } from '../store';

const { Title, Text, Paragraph } = Typography;

const PageAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const pageAnalysis = useStore(state => state.pageAnalysis);
  const setPageAnalysis = useStore(state => state.setPageAnalysis);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    const formattedUrl = formatUrl(url.trim());
    
    if (!isValidUrl(formattedUrl)) {
      alert('Пожалуйста, введите корректный URL');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await analyzePage(formattedUrl);
      setPageAnalysis(result);
      localStorage.setItem('tentry-page-analysis', JSON.stringify(result));
    } catch (error) {
      console.error('Page analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setPageAnalysis(null);
    localStorage.removeItem('tentry-page-analysis');
  };

  const getHeadingColor = (level: number) => {
    const colors = ['red', 'orange', 'gold', 'green', 'blue', 'purple'];
    return colors[level - 1] || 'default';
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Анализ страницы</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title="URL для анализа" 
            className="card"
            extra={
              <Space>
                <Button 
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleAnalyze}
                  loading={loading}
                  disabled={!url.trim()}
                >
                  Анализировать
                </Button>
                <Button 
                  icon={<ClearOutlined />}
                  onClick={handleClear}
                >
                  Очистить
                </Button>
              </Space>
            }
          >
            <Input
              size="large"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPressEnter={handleAnalyze}
              prefix={<GlobalOutlined />}
            />
            
            <Alert
              type="info"
              showIcon
              message="Анализ SEO-элементов"
              description={
                <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                  <li>Title - заголовок страницы</li>
                  <li>Meta description - описание для поисковиков</li>
                  <li>Заголовки H1-H6 - структура контента</li>
                </ul>
              }
              style={{ marginTop: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {pageAnalysis ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {pageAnalysis.error ? (
                <Card className="card">
                  <Alert
                    type="error"
                    showIcon
                    message="Ошибка анализа"
                    description={pageAnalysis.error}
                  />
                </Card>
              ) : (
                <>
                  {/* Основная информация */}
                  <Card title="Основная информация" className="card">
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>URL: </Text>
                      <Text copyable>{pageAnalysis.url}</Text>
                    </div>
                    
                    <Divider />
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>Title:</Text>
                      <div style={{ 
                        marginTop: '8px',
                        padding: '12px',
                        background: 'var(--background-color)',
                        borderRadius: '6px',
                        fontSize: '16px'
                      }}>
                        {pageAnalysis.title || <Text type="secondary">Не найден</Text>}
                      </div>
                      {pageAnalysis.title && (
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Длина: {pageAnalysis.title.length} символов
                        </Text>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>Meta Description:</Text>
                      <div style={{ 
                        marginTop: '8px',
                        padding: '12px',
                        background: 'var(--background-color)',
                        borderRadius: '6px'
                      }}>
                        {pageAnalysis.description || <Text type="secondary">Не найден</Text>}
                      </div>
                      {pageAnalysis.description && (
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Длина: {pageAnalysis.description.length} символов
                        </Text>
                      )}
                    </div>
                  </Card>

                  {/* Заголовки */}
                  <Card title={`Заголовки (${pageAnalysis.headings.length})`} className="card">
                    {pageAnalysis.headings.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {pageAnalysis.headings.map((heading, index) => (
                          <div 
                            key={index}
                            style={{ 
                              padding: '12px',
                              background: 'var(--background-color)',
                              borderRadius: '6px',
                              borderLeft: `4px solid var(--primary-color)`
                            }}
                          >
                            <div style={{ marginBottom: '8px' }}>
                              <Tag color={getHeadingColor(heading.level)}>
                                H{heading.level}
                              </Tag>
                            </div>
                            <div>{heading.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ 
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: 'var(--text-secondary)'
                      }}>
                        Заголовки не найдены
                      </div>
                    )}
                  </Card>

                  {/* Структура заголовков */}
                  {pageAnalysis.headings.length > 0 && (
                    <Card title="Структура заголовков" className="card">
                      <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                        {Array.from({ length: 6 }, (_, i) => {
                          const level = i + 1;
                          const count = pageAnalysis.headings.filter(h => h.level === level).length;
                          return (
                            <div key={level} style={{ marginBottom: '4px' }}>
                              <Tag color={getHeadingColor(level)}>
                                H{level}
                              </Tag>
                              <span style={{ marginLeft: '8px' }}>
                                {count} {count === 1 ? 'заголовок' : count < 5 ? 'заголовка' : 'заголовков'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>
          ) : (
            <Card className="card">
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: 'var(--text-secondary)'
              }}>
                <GlobalOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <Title level={4} style={{ color: 'var(--text-secondary)' }}>
                  Введите URL для анализа
                </Title>
                <Paragraph>
                  Анализ покажет основные SEO-элементы страницы:
                  title, meta description и структуру заголовков
                </Paragraph>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PageAnalyzer;
