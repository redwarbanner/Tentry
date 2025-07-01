import { useState } from 'react';
import { Card, Input, Button, Typography, Space, Row, Col, Alert, Tag, Divider } from 'antd';
import { SearchOutlined, ClearOutlined, GlobalOutlined } from '@ant-design/icons';
import { analyzePage, isValidUrl, formatUrl } from '../../utils/pageAnalyzer';
import { useStore } from '../../store';
import './PageAnalyzer.css';
import { getHeadingColor } from './utils/getHeadingColor.ts';
import { getHeadingLabel } from './utils/getHeadingLabel.ts';

const { Title, Text, Paragraph } = Typography;

const PageAnalyzer = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className={'fadeIn'}>
      <div className={'titleContainer'}>
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
                <Button icon={<ClearOutlined />} onClick={handleClear}>
                  Очистить
                </Button>
              </Space>
            }
          >
            <Input
              size="large"
              placeholder="https://example.com"
              value={url}
              onChange={e => {
                setUrl(e.target.value);
              }}
              onPressEnter={handleAnalyze}
              prefix={<GlobalOutlined />}
            />

            <Alert
              type="info"
              showIcon
              message="Анализ SEO-элементов"
              description={
                <ul className={'list'}>
                  <li>Title — заголовок страницы</li>
                  <li>Meta description — описание для поисковиков</li>
                  <li>Заголовки H1-H6 — структура контента</li>
                </ul>
              }
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {pageAnalysis ? (
            <div className={'flexColumn'}>
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
                  <Card title="Основная информация" className="card">
                    <div className={'block'}>
                      <Text strong>URL: </Text>
                      <Text copyable>{pageAnalysis.url}</Text>
                    </div>

                    <Divider />

                    <div className={'block'}>
                      <Text strong>Title:</Text>
                      <div className={'highlightBox'}>
                        {pageAnalysis.title || <Text type="secondary">Не найден</Text>}
                      </div>
                      {pageAnalysis.title && (
                        <Text className={'secondaryText'}>
                          Длина: {pageAnalysis.title.length} символов
                        </Text>
                      )}
                    </div>

                    <div className={'block'}>
                      <Text strong>Meta Description:</Text>
                      <div className={'highlightBox'}>
                        {pageAnalysis.description || <Text type="secondary">Не найден</Text>}
                      </div>
                      {pageAnalysis.description && (
                        <Text className={'secondaryText'}>
                          Длина: {pageAnalysis.description.length} символов
                        </Text>
                      )}
                    </div>
                  </Card>

                  <Card
                    title={`Заголовки (${String(pageAnalysis.headings.length)})`}
                    className="card"
                  >
                    {pageAnalysis.headings.length > 0 ? (
                      <div className={'flexColumn'}>
                        {pageAnalysis.headings.map((heading, index) => (
                          <div key={index} className={'headingTag'}>
                            <div style={{ marginBottom: 8 }}>
                              <Tag color={getHeadingColor(heading.level)}>H{heading.level}</Tag>
                            </div>
                            <div>{heading.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={'centerBlock'}>Заголовки не найдены</div>
                    )}
                  </Card>

                  {pageAnalysis.headings.length > 0 && (
                    <Card title="Структура заголовков" className="card">
                      <div className={'structureText'}>
                        {Array.from({ length: 6 }, (_, i) => {
                          const level = i + 1;
                          const count = pageAnalysis.headings.filter(h => h.level === level).length;
                          return (
                            <div key={level} style={{ marginBottom: 4 }}>
                              <Tag color={getHeadingColor(level)}>H{level}</Tag>
                              <span style={{ marginLeft: 8 }}>
                                {count} {getHeadingLabel(count)}
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
              <div className={'emptyState'}>
                <GlobalOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <Title level={4} style={{ color: 'var(--text-secondary)' }}>
                  Введите URL для анализа
                </Title>
                <Paragraph>
                  Анализ покажет основные SEO-элементы страницы: title, meta description и структуру
                  заголовков
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
