import { Alert, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import './styles.css';

const { Title } = Typography;

const EmptyStateUniqueness = () => (
  <div className={'emptyState'}>
    <PlayCircleOutlined style={{ fontSize: 48, marginBottom: 16 }} />
    <Title level={4}>Введите текст для проверки уникальности</Title>
    <Alert
      type="info"
      showIcon
      message="Как работает проверка"
      description={
        <ul className={'infoList'}>
          <li>Текст разбивается на фразы по 8 слов</li>
          <li>Каждая фраза ищется в Google в кавычках</li>
          <li>Между запросами делается пауза в 1 секунду</li>
          <li>Результат показывает процент уникальности</li>
        </ul>
      }
    />
  </div>
);

export default EmptyStateUniqueness;
