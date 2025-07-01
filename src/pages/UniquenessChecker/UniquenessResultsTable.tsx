import { Card, Table, Tag } from 'antd';
import type { PhraseResult } from '../../types';

interface Props {
  results: PhraseResult[];
}

const UniquenessResultsTable = ({ results }: Props) => {
  const columns = [
    {
      title: 'Фраза',
      dataIndex: 'phrase',
      key: 'phrase',
      width: '70%',
      render: (text: string, record: PhraseResult) => (
        <span
          className={record.isUnique ? 'phrase-highlight unique' : 'phrase-highlight not-unique'}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'isUnique',
      key: 'isUnique',
      width: '15%',
      align: 'center' as const,
      render: (isUnique: boolean) => (
        <Tag color={isUnique ? 'green' : 'red'}>{isUnique ? 'Уникальная' : 'Найдена'}</Tag>
      ),
    },
    {
      title: 'Источники',
      dataIndex: 'sources',
      key: 'sources',
      width: '15%',
      render: (sources: string[]) => (sources?.length ? sources.join(', ') : '—'),
    },
  ];

  return (
    <Card title="Детальные результаты" className="card">
      <Table
        dataSource={results.map((r, i) => ({ ...r, key: i }))}
        columns={columns}
        pagination={{ pageSize: 10 }}
        size="small"
        scroll={{ y: 400 }}
      />
    </Card>
  );
};

export default UniquenessResultsTable;
