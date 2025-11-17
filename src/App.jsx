/**
 * BVI Social Listening Dashboard
 * Main Application Component
 *
 * Client Requirements:
 * - Interactive dashboard with filters
 * - <3 second load time
 * - Export to CSV
 * - Day one: volume, sentiment, top posts/accounts, heatmap, early signals
 */

import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App
