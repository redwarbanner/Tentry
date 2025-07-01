import { Typography, Space } from 'antd';

const { Paragraph, Text } = Typography;

type StatsBarProps = {
  content: string;
};

const StatsBar = ({ content }: StatsBarProps) => {
  if (!content) return null;

  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="stats-bar">
      <Space direction="vertical" size={0}>
        <Paragraph>
          <Text strong>Символов:</Text> {content.length} <Text strong>| Слов:</Text> {wordCount}{' '}
          <Text>Автосохранение активно</Text>
        </Paragraph>
      </Space>
    </div>
  );
};

export default StatsBar;
