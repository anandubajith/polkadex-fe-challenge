import styled from "styled-components";

const CHAINS = [
    'Ethereum Mainnet',
    'Ropsten',
]

const ChainSelectButton = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-width: 400px;
    border-radius: 20px;
    margin-bottom: 12px;
    cursor: pointer;
    padding: 24px;
    display: flex;
    ${({ active }) => `border: 1px solid  ${active ? '#000' : '#ccc'};`}
`
const Dot = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    margin-right: 16px;
    ${({ active }) => `background-color: ${active ? '#E6007A' : '#eee'}`}
`

export default function ChainSelectList({ selectedChain, onChange }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                CHAINS.map(chain => (
                    <ChainSelectButton active={selectedChain == chain} onClick={() => onChange(chain)}>
                        <Dot active={selectedChain === chain} /> {chain}
                    </ChainSelectButton>
                ))
            }
        </div>
    )
}
