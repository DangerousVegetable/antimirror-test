import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { logVisitor, getLogs, clearLogs } from './services/logger';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    // 1. Initialize Telegram Mini App
    WebApp.ready();
    WebApp.expand();

    // 2. Capture user data
    const tgUser = WebApp.initDataUnsafe?.user;
    if (tgUser) {
      setUser(tgUser);
    }

    // 3. Log visitor
    const visitorData = {
      source: 'Telegram Mini App',
      tgId: tgUser?.id || 'unknown',
      username: tgUser?.username || 'anonymous',
      firstName: tgUser?.first_name || 'Visitor',
      platform: WebApp.platform,
    };

    logVisitor(visitorData);
    setLogs(getLogs());
  }, []);

  const handleRefreshLogs = () => {
    setLogs(getLogs());
  };

  const handleClearLogs = () => {
    clearLogs();
    setLogs([]);
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>Antimirror</h1>
        <p className="subtitle">Future of Web Integration</p>

        <div className="tg-info">
          <h3>Visitor Information</h3>
          {user ? (
            <div>
              <p><strong>Username:</strong> @{user.username || 'N/A'}</p>
              <p><strong>First Name:</strong> {user.first_name}</p>
              <p><strong>Platform:</strong> {WebApp.platform}</p>
            </div>
          ) : (
            <p>Accessing outside of Telegram or data not shared.</p>
          )}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button className="btn" onClick={() => setShowLogs(!showLogs)}>
            {showLogs ? 'Hide Visitor History' : 'View Visitor History'}
          </button>
        </div>

        {showLogs && (
          <div className="logs-container">
            <h3>Recent Visitors (Local Log)</h3>
            <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#444' }} onClick={handleRefreshLogs}>Refresh</button>
            <button className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#ff4444', marginLeft: '10px' }} onClick={handleClearLogs}>Clear</button>

            <div style={{ marginTop: '1rem' }}>
              {logs.length === 0 ? (
                <p>No logs found.</p>
              ) : (
                logs.slice().reverse().map((log, index) => (
                  <div key={index} className="log-item">
                    <div><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</div>
                    <div><strong>User:</strong> {log.firstName} (@{log.username})</div>
                    <div><strong>Platform:</strong> {log.platform}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="footer">
          <p>© 2026 Antimirror. AI-Generated Excellence.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
