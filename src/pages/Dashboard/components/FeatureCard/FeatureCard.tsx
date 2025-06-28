import { Card, Typography, Button } from 'antd';
import type { ReactNode, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeatureCard.module.css';

const { Title, Paragraph } = Typography;

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  path: string;
}

const FeatureCard = ({ icon, title, description, path }: FeatureCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(path);
  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    void navigate(path);
  };

  return (
    <Card
      className={`card ${styles.card}`}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      onClick={() => void handleCardClick()}
    >
      <div className={styles.icon}>{icon}</div>
      <Title level={4} className={styles.title}>
        {title}
      </Title>
      <Paragraph className={styles.description}>{description}</Paragraph>
      <Button type="primary" block onClick={handleButtonClick}>
        Открыть
      </Button>
    </Card>
  );
};

export default FeatureCard;
