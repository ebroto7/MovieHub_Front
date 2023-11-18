import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENTID: clientId, VITE_AUTH0_CLIENT_SECRET: clientSecret } = import.meta.env
const redirectUri = window.location.origin +"/user"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: redirectUri
        }}>
        <App />
    </Auth0Provider>
)
