import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
