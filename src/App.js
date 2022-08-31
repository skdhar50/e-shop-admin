import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import { isAuthenticated } from "./utilities/auth";

const App = () => {
    
    return isAuthenticated() ? (
        <Layout />
    ) : (
        <Routes>
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
        
    );
}
 
export default App;