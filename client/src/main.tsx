import { createRoot } from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.js'

/**
 * Application entry point.
 * Mounts the React app into the #root DOM element, wrapped with:
 * - BrowserRouter: enables client-side routing via react-router-dom
 * - AuthProvider: provides global authentication state to all components
 */
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
) 