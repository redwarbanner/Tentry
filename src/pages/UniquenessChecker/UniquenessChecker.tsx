import { useState } from 'react';
import { Card, Button, Space, Row, Col, Progress } from 'antd';
import { PlayCircleOutlined, StopOutlined, ClearOutlined } from '@ant-design/icons';

import styles from './styles.module.css';
import EstimatedTimeInfo from './EstimatedTimeInfo';
import UniquenessSummary from './UniquenessSummary';
import UniquenessResultsTable from './UniquenessResultsTable';
import EmptyStateUniqueness from './EmptyStateUniqueness';
import { useStore } from '../../store';
import { checkUniqueness, estimateCheckTime } from '../../utils/uniquenessChecker.ts';
import LexicalEditor from '../../components/LexicalEditor/LexicalEditor.tsx';

const UniquenessChecker = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const uniquenessCheck = useStore(state => state.uniquenessCheck);
  const setUniquenessCheck = useStore(state => state.setUniquenessCheck);

  const handleStartCheck = async (): Promise<void> => {
    if (!text.trim()) return;

    setIsChecking(true);
    setCurrentProgress(0);

    try {
      const result = await checkUniqueness(text, progress => {
        setCurrentProgress(progress);
      });

      setUniquenessCheck(result);
      localStorage.setItem('tentry-uniqueness-check', JSON.stringify(result));
    } catch (error) {
      console.error('Ошибка при проверке уникальности:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleStopCheck = (): void => {
    setIsChecking(false);
    setCurrentProgress(0);
  };

  const handleClear = (): void => {
    setText('');
    setUniquenessCheck(null);
    setCurrentProgress(0);
    setIsChecking(false);
    localStorage.removeItem('tentry-uniqueness-check');
  };

  const estimatedTime = text ? estimateCheckTime(text.length) : 0;

  return (
    <div className={styles.fadeIn}>
      <div className={styles.title}>
        <h2>Проверка уникальности</h2>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title="Текст для проверки"
            className="card"
            extra={
              <Space>
                {!isChecking ? (
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={handleStartCheck}
                    disabled={!text.trim()}
                  >
                    Проверить
                  </Button>
                ) : (
                  <Button danger icon={<StopOutlined />} onClick={handleStopCheck}>
                    Остановить
                  </Button>
                )}
                <Button icon={<ClearOutlined />} onClick={handleClear}>
                  Очистить
                </Button>
              </Space>
            }
          >
            <LexicalEditor
              onChange={setText}
              placeholder="Введите текст для проверки уникальности. Текст будет разбит на фразы по 8 слов и проверен через поисковые системы."
            />

            {text && <EstimatedTimeInfo seconds={estimatedTime} />}

            {isChecking && (
              <div className="progress-container">
                <Progress
                  percent={currentProgress}
                  status="active"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          {uniquenessCheck ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <UniquenessSummary
                overallUniqueness={uniquenessCheck.overallUniqueness}
                results={uniquenessCheck.results}
              />
              <UniquenessResultsTable results={uniquenessCheck.results} />
            </div>
          ) : (
            <Card className="card">
              <EmptyStateUniqueness />
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UniquenessChecker;
