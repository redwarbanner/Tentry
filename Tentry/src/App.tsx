import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TextAnalyzer from './pages/TextAnalyzer';
import UniquenessChecker from './pages/UniquenessChecker';
import PageAnalyzer from './pages/PageAnalyzer';
import Editor from './pages/Editor';
import { useTheme } from './hooks/useTheme';
import './styles/globals.scss';

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    // Устанавливаем тему в data-атрибут для CSS переменных
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyzer" element={<TextAnalyzer />} />
              <Route path="/uniqueness" element={<UniquenessChecker />} />
              <Route path="/page-analyzer" element={<PageAnalyzer />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
