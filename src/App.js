import styled from 'styled-components';
import './App.css';
import SearchBar from './components/SearchBar';

const Header = styled.h1`
    font-size: 70px;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    margin-bottom: 25px;
`;
const SubHeader = styled.h2`
    font-size: 25px;
    line-height: 1.25;
    font-weight: 400;
    line-height: 1;
    margin: 0;
`;

function Logo() {
    return ( <h1>Challenge <span style={{color: "#e6007a"}}>.</span> </h1>)
}

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Logo/>
            <div style={{maxWidth: '860px', margin:'auto'}}>
                <Header> What are you capable of?</Header>
                <div style={{maxWidth: '640px', margin: 'auto', textAlign:'center'}}>
                    <SubHeader> Do not underestimate yourselves. You are more capable than what you think your are capable of.</SubHeader>
                </div>
            </div>
            <SearchBar />
        </div>
    );
}

export default App;
