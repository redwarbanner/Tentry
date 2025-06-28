import { Button } from 'antd';
import { OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';

interface ListButtonsProps {
  onOrdered: () => void;
  onUnordered: () => void;
}

const ListButtons = ({ onOrdered, onUnordered }: ListButtonsProps) => (
  <>
    <Button size="small" icon={<UnorderedListOutlined />} onClick={onUnordered} />
    <Button size="small" icon={<OrderedListOutlined />} onClick={onOrdered} />
  </>
);

export default ListButtons;
