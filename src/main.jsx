import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const originalFetch = window.fetch.bind(window)

function isApiRequest(input) {
  return typeof input === 'string'
    ? input.startsWith('/api')
    : input instanceof Request && input.url.includes('/api')
}

window.fetch = async (input, init) => {
  const runId = 'initial-debug'
  const requestUrl = typeof input === 'string' ? input : input.url

  if (isApiRequest(input)) {
    // #region agent log
    fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H1-H2',location:'src/main.jsx:15',message:'API request started',data:{url:requestUrl,method:init?.method ?? 'GET'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }

  try {
    const response = await originalFetch(input, init)
    if (isApiRequest(input)) {
      // #region agent log
      fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H2-H3',location:'src/main.jsx:24',message:'API response received',data:{url:requestUrl,status:response.status,ok:response.ok,type:response.type},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }
    return response
  } catch (error) {
    if (isApiRequest(input)) {
      // #region agent log
      fetch('http://127.0.0.1:7671/ingest/783128e5-0b5c-4bc5-a7d7-15d9bdb44212',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c41a43'},body:JSON.stringify({sessionId:'c41a43',runId,hypothesisId:'H1-H4',location:'src/main.jsx:33',message:'API request failed',data:{url:requestUrl,errorName:error?.name,errorMessage:error?.message},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }
    throw error
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)