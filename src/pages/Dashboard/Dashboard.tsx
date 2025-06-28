import { Card, Typography, Row, Col } from 'antd';
import FeatureGrid from './components/FeatureGrid.tsx';
import { seoInfo } from './utils/seoInfoBlocks.ts';
import styles from './Dashboard.module.css';

const { Title, Paragraph } = Typography;

const Dashboard = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      <Title level={1} className={styles.title}>
        SEO-блокнот Tentry
      </Title>
      <Paragraph className={styles.subtitle}>
        Комплексный инструмент для анализа и оптимизации SEO-текстов
      </Paragraph>
    </div>

    <FeatureGrid />

    <Card title="Возможности SEO-анализа" className={`card ${styles.infoCard}`}>
      <Row gutter={[24, 24]}>
        {seoInfo.map(block => (
          <Col xs={24} md={12} key={block.title}>
            <Title level={5}>{block.title}</Title>
            <ul className={styles.infoList}>
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
