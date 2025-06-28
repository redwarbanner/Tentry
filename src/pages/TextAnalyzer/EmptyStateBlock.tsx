import { Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Title } = Typography;

const EmptyStateBlock = () => (
  <div className={styles.emptyState}>
    <FileSearchOutlined style={{ fontSize: 48, marginBottom: 16 }} />
    <Title level={4}>Введите текст для анализа</Title>
    <p>Анализ включает:</p>
    <ul className={styles.emptyList}>
      <li>Расчёт классической и академической тошноты</li>
      <li>Подсчёт символов, слов и уникальных слов</li>
      <li>Анализ водности и стоп-слов</li>
      <li>Извлечение семантического ядра</li>
    </ul>
  </div>
);

export default EmptyStateBlock;
