import { Row, Col, Tag } from 'antd';
import { getToxicityColor } from '../../utils/textAnalysis';
import type { TextStats as ITextStats } from '../../types';

interface ToxicityBlockProps {
  stats: ITextStats;
}

const ToxicityBlock = ({ stats }: ToxicityBlockProps) => {
  const renderTag = (value: number, label: string) => (
    <Tag color={getToxicityColor(value)} className="toxicity-tag">
      {label}: {value?.toFixed(2)}%
    </Tag>
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>{renderTag(stats.classicToxicity, 'Классическая')}</Col>
        <Col span={12}>{renderTag(stats.academicToxicity, 'Академическая')}</Col>
      </Row>
      <div className="description">
        <p>• Классическая тошнота — корень из количества повторений самого частого слова</p>
        <p>• Академическая тошнота — отношение повторяющихся слов к общему количеству символов</p>
      </div>
    </>
  );
};

export default ToxicityBlock;
