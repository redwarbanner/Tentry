import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, GlobalOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      title: 'Анализ текста',
      description: 'Полный анализ текста с расчётом тошноты, водности и семантического ядра',
      path: '/analyzer'
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      title: 'Проверка уникальности',
      description: 'Проверка уникальности текста по фрагментам через поисковые системы',
      path: '/uniqueness'
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
      title: 'Анализ страницы',
      description: 'Анализ SEO-элементов страницы: title, description, заголовки',
      path: '/page-analyzer'
    },
    {
      icon: <EditOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      title: 'Текстовый редактор',
      description: 'Редактор с поддержкой форматирования и истории изменений',
      path: '/editor'
    }
  ];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '32px' }}>
        <Title level={1} style={{ marginBottom: '8px' }}>
          SEO-блокнот Tentry
        </Title>
        <Paragraph style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Комплексный инструмент для анализа и оптимизации SEO-текстов
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="card"
              style={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => navigate(feature.path)}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <Title level={4} style={{ textAlign: 'center', marginBottom: '12px' }}>
                {feature.title}
              </Title>
              <Paragraph style={{ 
                textAlign: 'center', 
                color: 'var(--text-secondary)',
                marginBottom: '20px'
              }}>
                {feature.description}
              </Paragraph>
              <Button 
                type="primary" 
                block
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(feature.path);
                }}
              >
                Открыть
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Card 
        title="Возможности SEO-анализа"
        style={{ marginTop: '32px' }}
        className="card"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={5}>Анализ текста</Title>
            <ul style={{ color: 'var(--text-secondary)' }}>
              <li>Классическая и академическая тошнота</li>
              <li>Подсчёт символов, слов и уникальных слов</li>
              <li>Анализ водности текста</li>
              <li>Извлечение семантического ядра</li>
              <li>Анализ стоп-слов</li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>Дополнительные инструменты</Title>
            <ul style={{ color: 'var(--text-secondary)' }}>
              <li>Проверка уникальности по фрагментам</li>
              <li>Анализ SEO-тегов страницы</li>
              <li>Текстовый редактор с форматированием</li>
              <li>Сохранение результатов в localStorage</li>
              <li>Тёмная и светлая темы</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
