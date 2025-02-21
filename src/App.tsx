import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IntegrationsPage from "./integrations/IntegrationsPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IntegrationsPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
