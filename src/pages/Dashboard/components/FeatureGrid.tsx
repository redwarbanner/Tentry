import { Row, Col } from 'antd';
import FeatureCard from './FeatureCard/FeatureCard.tsx';
import { dashboardFeatures } from '../constants/features';

const FeatureGrid = () => (
  <Row gutter={[24, 24]}>
    {dashboardFeatures.map(feature => (
      <Col xs={24} sm={12} lg={6} key={feature.path}>
        <FeatureCard {...feature} />
      </Col>
    ))}
  </Row>
);

export default FeatureGrid;
