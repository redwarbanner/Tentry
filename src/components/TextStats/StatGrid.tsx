import { Row, Col, Tag, Typography } from 'antd';
import { getWaterTagColor } from './utils/getWaterTagColor';
import type { TextStats as ITextStats } from '../../types';

const { Text } = Typography;

interface StatGridProps {
  stats: ITextStats;
}

const StatGrid = ({ stats }: StatGridProps) => (
  <>
    <div className="stats-grid">
      {[
        { label: 'Символов', value: stats.characterCount },
        { label: 'Символов без пробелов', value: stats.characterCountNoSpaces },
        { label: 'Слов', value: stats.wordCount },
        { label: 'Уникальных слов', value: stats.uniqueWordCount },
        { label: 'Значимых слов', value: stats.significantWordCount },
        { label: 'Стоп-слов', value: stats.stopWordCount },
      ].map(({ label, value }) => (
        <div key={label} className="stat-card">
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>

    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
      <Col span={24}>
        <Text strong>Вода: </Text>
        <Tag color={getWaterTagColor(stats.waterPercentage)}>
          {stats.waterPercentage.toFixed(2)}%
        </Tag>
      </Col>
    </Row>
  </>
);

export default StatGrid;
