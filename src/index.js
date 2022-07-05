import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/tabler.min.css';

const root = createRoot(document.getElementById('wrapper'));
root.render(<App />);