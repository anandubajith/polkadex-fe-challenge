import styled from "styled-components";

const CHAINS = [
    'Ethereum Mainnet',
    'Ropsten'
]

const ChainSelectButton = styled.div`
    ${({ active }) => `border: 1px solid  ${active ? '#000' : '#ccc'};`}
`

export default function ChainSelectList({ selectedChain, onChange }) {
    return (
        <div style={{ display: 'flex' }}>
            {
                CHAINS.map(chain => (
                    <ChainSelectButton active={selectedChain == chain} onClick={() => onChange(chain)}>
                        {chain}
                    </ChainSelectButton>
                ))
            }
        </div>
    )
}
