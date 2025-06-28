import {
  FileTextOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const dashboardFeatures = [
  {
    icon: <FileTextOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
    title: 'Анализ текста',
    description: 'Полный анализ текста с расчётом тошноты, водности и семантического ядра',
    path: '/analyzer',
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
    title: 'Проверка уникальности',
    description: 'Проверка уникальности текста по фрагментам через поисковые системы',
    path: '/uniqueness',
  },
  {
    icon: <GlobalOutlined style={{ fontSize: 48, color: '#fa8c16' }} />,
    title: 'Анализ страницы',
    description: 'Анализ SEO-элементов страницы: title, description, заголовки',
    path: '/page-analyzer',
  },
  {
    icon: <EditOutlined style={{ fontSize: 48, color: '#722ed1' }} />,
    title: 'Текстовый редактор',
    description: 'Редактор с поддержкой форматирования и истории изменений',
    path: '/editor',
  },
];
