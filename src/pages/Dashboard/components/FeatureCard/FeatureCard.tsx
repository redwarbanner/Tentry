import { Card, Typography, Button } from 'antd';
import type { ReactNode, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureCard.css';

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
    <Card className="card" onClick={() => void handleCardClick()}>
      <div className="icon">{icon}</div>
      <Title level={4} className="title">
        {title}
      </Title>
      <Paragraph className="description">{description}</Paragraph>
      <Button type="primary" block onClick={handleButtonClick}>
        Открыть
      </Button>
    </Card>
  );
};

export default FeatureCard;
