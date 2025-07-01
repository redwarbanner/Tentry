import { Tag } from 'antd';
import { getWaterTagColor } from './utils/getWaterTagColor';

import type { TextStats as ITextStats } from '../../types';
import { getToxicityColor } from '../../utils';

interface StatGridProps {
  stats: ITextStats;
}

const StatGrid = ({ stats }: StatGridProps) => {
  if (
    stats.waterPercentage == null ||
    stats.classicToxicity == null ||
    stats.academicToxicity == null
  ) {
    return null;
  }

  const getStatCard = (label: string, value: number | string, color?: string) => (
    <div key={label} className="stat-card">
      <div className="stat-value">{color ? <Tag color={color}>{value}</Tag> : value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );

  return (
    <div className="stats-grid">
      {getStatCard('Символов', stats.characterCount)}
      {getStatCard('Символов без пробелов', stats.characterCountNoSpaces)}
      {getStatCard('Слов', stats.wordCount)}
      {getStatCard('Уникальных слов', stats.uniqueWordCount)}
      {getStatCard('Значимых слов', stats.significantWordCount)}
      {getStatCard('Стоп-слов', stats.stopWordCount)}

      {getStatCard(
        'Вода',
        `${stats.waterPercentage.toFixed(2)}%`,
        getWaterTagColor(stats.waterPercentage),
      )}

      {getStatCard(
        'Классическая тошнота',
        `${stats.classicToxicity.toFixed(2)}%`,
        getToxicityColor(stats.classicToxicity),
      )}

      {getStatCard(
        'Академическая тошнота',
        `${stats.academicToxicity.toFixed(2)}%`,
        getToxicityColor(stats.academicToxicity),
      )}
    </div>
  );
};

export default StatGrid;
