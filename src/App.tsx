import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import TextAnalyzer from './pages/TextAnalyzer/TextAnalyzer.tsx';
import UniquenessChecker from './pages/UniquenessChecker/UniquenessChecker.tsx';

import Editor from './pages/Editor/Editor.tsx';
import { useTheme } from './hooks/useTheme';
import './styles/globals.scss';
import PageAnalyzer from './pages/PageAnalyzer/PageAnalyzer.tsx';

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
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
            <Routes location={location} key={location.pathname}>
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
