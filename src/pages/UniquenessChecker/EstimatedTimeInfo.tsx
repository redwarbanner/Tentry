import { Typography } from 'antd';
import styles from './styles.module.css';

interface Props {
  seconds: number;
}

const EstimatedTimeInfo = ({ seconds }: Props) => (
  <div className={styles.timeBox}>
    <Typography.Text strong>Примерное время проверки: </Typography.Text>
    <Typography.Text>{Math.ceil(seconds)} секунд</Typography.Text>
    <br />
    <Typography.Text type="secondary">
      Текст будет разбит на фразы и проверен через Google Search
    </Typography.Text>
  </div>
);

export default EstimatedTimeInfo;
