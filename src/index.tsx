import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@redux/configure-store';

import App from './App';

import 'normalize.css';
import './index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
