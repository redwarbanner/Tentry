import { Button } from 'antd';
import type { ReactNode } from 'react';

interface FormatButtonProps {
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
}

const FormatButton = ({ active, icon, onClick }: FormatButtonProps) => (
  <Button size="small" type={active ? 'primary' : 'default'} icon={icon} onClick={onClick} />
);

export default FormatButton;
