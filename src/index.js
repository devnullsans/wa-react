import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/tabler.min.css';
import './assets/css/custom.css';

const root = createRoot(document.getElementById('wrapper'));
root.render(<App />);