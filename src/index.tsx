import { createRoot } from 'react-dom/client';
import { store } from '@redux/configure-store';
import { Provider } from 'react-redux';

import 'normalize.css';
import './index.module.scss';

import App from './App';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
