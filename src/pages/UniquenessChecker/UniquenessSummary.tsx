import { Card, Typography, Progress } from 'antd';
import styles from './styles.module.css';
import type { PhraseResult } from './types';

interface Props {
  overallUniqueness: number;
  results: PhraseResult[];
}

const UniquenessSummary = ({ overallUniqueness, results }: Props) => {
  const uniqueCount = results.filter(r => r.isUnique).length;
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

      <div className={styles.resultStats}>
        <div className={styles.resultItem}>
          <div className={styles.resultValue}>{uniqueCount}</div>
          <div className={styles.resultLabel}>Уникальных фраз</div>
        </div>
        <div className={styles.resultItem}>
          <div className={styles.resultValue}>{duplicateCount}</div>
          <div className={styles.resultLabel}>Найденных фраз</div>
        </div>
      </div>
    </Card>
  );
};

export default UniquenessSummary;
