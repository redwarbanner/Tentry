import { Card, Typography, Row, Col } from 'antd';
import FeatureGrid from './components/FeatureGrid.tsx';
import { seoInfo } from './constants/seoInfoBlocks.ts';
import './Dashboard.css';

const { Title, Paragraph } = Typography;

const Dashboard = () => (
  <div className="container">
    <div className="header">
      <Title level={1} className="title">
        SEO-блокнот Tentry
      </Title>
      <Paragraph className="subtitle">
        Комплексный инструмент для анализа и оптимизации SEO-текстов
      </Paragraph>
    </div>

    <FeatureGrid />

    <Card title="Возможности SEO-анализа" className="infoCard">
      <Row gutter={[24, 24]}>
        {seoInfo.map(block => (
          <Col xs={24} md={12} key={block.title}>
            <Title level={5}>{block.title}</Title>
            <ul className="infoList">
              {block.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    </Card>
  </div>
);

export default Dashboard;
