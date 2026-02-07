/**
 * logger.js
 * Handles visitor logging for the Antimirror app.
 */

const LOG_STORAGE_KEY = 'antimirror_visitor_logs';

export const logVisitor = async (userData) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ...userData,
    userAgent: navigator.userAgent,
  };

  // 1. Log to console (for development)
  console.log('[Visitor Logged]:', logEntry);

  // 2. Persist to localStorage for demo purposes
  const existingLogs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
  existingLogs.push(logEntry);
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(existingLogs));

  // 3. Mock Backend Call (e.g., to Supabase or a custom API)
  try {
    // This is where you would call your real backend
    // await fetch('https://your-api.com/log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logEntry),
    // });
    
    // For now, we simulate a successful cloud log
    console.info('Visitor data would be sent to the cloud here.');
  } catch (error) {
    console.error('Failed to send log to cloud:', error);
  }

  return logEntry;
};

export const getLogs = () => {
  return JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
};

export const clearLogs = () => {
  localStorage.removeItem(LOG_STORAGE_KEY);
};
