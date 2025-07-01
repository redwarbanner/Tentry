import { useState } from 'react';
import { Card, Button, Space, Row, Col, Progress, Input, Radio } from 'antd';
import { PlayCircleOutlined, StopOutlined, ClearOutlined } from '@ant-design/icons';

import './styles.css';

import UniquenessSummary from './UniquenessSummary';
import UniquenessResultsTable from './UniquenessResultsTable';
import EmptyStateUniqueness from './EmptyStateUniqueness';
import { useStore } from '../../store';
import { checkUniqueness } from '../../utils';

const UniquenessChecker = () => {
  const [checkMode, setCheckMode] = useState<'fast' | 'full'>('full');

  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const uniquenessCheck = useStore(state => state.uniquenessCheck);
  const setUniquenessCheck = useStore(state => state.setUniquenessCheck);

  const handleStartCheck = async () => {
    if (!text.trim()) {
      return;
    }

    setIsChecking(true);
    setCurrentProgress(0);

    try {
      const result = await checkUniqueness(
        text,
        progress => {
          setCurrentProgress(progress);
        },
        checkMode,
      );

      setUniquenessCheck(result);
      localStorage.setItem('tentry-uniqueness-check', JSON.stringify(result));
    } catch (error) {
      console.error('Ошибка при проверке уникальности:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleStopCheck = () => {
    setIsChecking(false);
    setCurrentProgress(0);
  };

  const handleClear = () => {
    setText('');
    setUniquenessCheck(null);
    setCurrentProgress(0);
    setIsChecking(false);
    localStorage.removeItem('tentry-uniqueness-check');
  };

  return (
    <div className="fadeIn">
      <div className="title">
        <h2>Проверка уникальности</h2>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title="Текст для проверки"
            className="card"
            extra={
              <Space>
                <Radio.Group
                  value={checkMode}
                  onChange={e => {
                    setCheckMode(e.target.value as 'fast' | 'full');
                  }}
                  optionType="button"
                  buttonStyle="solid"
                >
                  <Radio value="fast">Быстрая проверка</Radio>
                  <Radio value="full">Полная проверка</Radio>
                </Radio.Group>

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
            <Input.TextArea
              value={text}
              onChange={e => {
                setText(e.target.value);
              }}
              placeholder="Введите текст для проверки уникальности. Текст будет разбит на фразы по 8 слов и проверен через поисковые системы."
              autoSize={{ minRows: 8, maxRows: 20 }}
            />

            {isChecking && (
              <div className="progress-container">
                <Progress
                  percent={Math.round(currentProgress)}
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
