import { Table } from 'antd';
import type { StopWord } from '../../types';

interface StopWordsTableProps {
  data: StopWord[];
}

const StopWordsTable = ({ data }: StopWordsTableProps) => (
  <Table
    dataSource={data.map((item, i) => ({ ...item, key: i.toString() }))}
    columns={[
      { title: 'Слово', dataIndex: 'word', key: 'word', width: '60%' },
      {
        title: 'Количество',
        dataIndex: 'count',
        key: 'count',
        width: '20%',
        align: 'center',
      },
      {
        title: 'Частота (%)',
        dataIndex: 'frequency',
        key: 'frequency',
        width: '20%',
        align: 'center',
        render: (value: number) => value.toFixed(2),
      },
    ]}
    pagination={{ pageSize: 10 }}
    size="small"
    scroll={{ y: 400 }}
  />
);

export default StopWordsTable;
