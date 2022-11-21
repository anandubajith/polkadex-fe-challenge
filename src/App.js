import './App.css';
import SearchBar from './components/SearchBar';

function App() {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
            <div style={{ flex: '1' }} />
            <SearchBar />
        </div>
    );
}

export default App;
