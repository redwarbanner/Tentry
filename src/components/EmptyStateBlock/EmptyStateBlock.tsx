import { Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import './EmptyStateBlock.css';

const { Title, Text } = Typography;

const features = [
  'Расчёт классической и академической тошноты',
  'Подсчёт символов, слов и уникальных слов',
  'Анализ водности и стоп-слов',
  'Извлечение семантического ядра',
];

const EmptyStateBlock = () => (
  <div className="emptyState">
    <FileSearchOutlined style={{ fontSize: 48, marginBottom: 16 }} />
    <Title level={4}>Введите текст для анализа</Title>
    <div className="emptyList">
      {features.map((item, index) => (
        <Text key={index} className="listItem">
          • {item}
        </Text>
      ))}
    </div>
  </div>
);

export default EmptyStateBlock;
