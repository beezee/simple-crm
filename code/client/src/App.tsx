import { Users } from "./users";

export const App: React.FC = () => {
    return (
        <div className="p-4 space-y-8">
            <h1 className="text-xl">SimpleCrm</h1>
            <Users />
        </div>
    );
};

export default App;
