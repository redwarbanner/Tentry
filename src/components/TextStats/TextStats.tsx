import { Card } from 'antd';
import type { TextStats as ITextStats, SemanticPhrase, StopWord } from '../../types';
import './TextStats.css';
import StatGrid from './StatGrid';
import SemanticTable from './SemanticTable';
import StopWordsTable from './StopWordsTable';

interface TextStatsProps {
  stats: ITextStats;
  semanticCore: SemanticPhrase[];
  stopWords: StopWord[];
}

const TextStats = ({ stats, semanticCore, stopWords }: TextStatsProps) => (
  <div className="text-stats-container">
    <Card title="Статистика текста" className="card">
      <StatGrid stats={stats} />
    </Card>

    <Card title="Семантическое ядро" className="card">
      <SemanticTable data={semanticCore} />
    </Card>

    <Card title="Стоп-слова" className="card">
      <StopWordsTable data={stopWords} />
    </Card>
  </div>
);

export default TextStats;
