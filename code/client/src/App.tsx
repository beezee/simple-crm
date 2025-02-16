import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Users } from "./users";
import { UserDetail } from "./user-detail";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="p-4 space-y-8">
                <h1 className="text-xl"><a href="/">SimpleCrm</a></h1>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/user/:id" element={<UserDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
