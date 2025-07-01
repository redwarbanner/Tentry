import { Card, Typography, Progress } from 'antd';
import './styles.css';
import type { PhraseResult } from '../../types';

interface Props {
  overallUniqueness: number;
  results: PhraseResult[];
}

const UniquenessSummary = ({ overallUniqueness, results }: Props) => {
  const uniqueCount = results.filter(result => result.isUnique).length;
  const duplicateCount = results.length - uniqueCount;

  const color =
    overallUniqueness >= 90 ? '#52c41a' : overallUniqueness >= 70 ? '#fa8c16' : '#f5222d';

  return (
    <Card title="Результат проверки" className="card">
      <div style={{ marginBottom: 16 }}>
        <Typography.Title level={4} style={{ marginBottom: 8 }}>
          Общая уникальность: {overallUniqueness.toFixed(1)}%
        </Typography.Title>
        <Progress percent={overallUniqueness} strokeColor={color} />
      </div>

      <div className={'resultStats'}>
        <div className={'resultItem'}>
          <div className={'resultValue'}>{uniqueCount}</div>
          <div className={'resultLabel'}>Уникальных фраз</div>
        </div>
        <div className={'resultItem'}>
          <div className={'resultValue'}>{duplicateCount}</div>
          <div className={'resultLabel'}>Найденных фраз</div>
        </div>
      </div>
    </Card>
  );
};

export default UniquenessSummary;
