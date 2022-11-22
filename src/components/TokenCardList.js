import styled from "styled-components";
import EthereumLogo from '../assets/ethereum.svg'
import CardanoLogo from '../assets/cardano.svg'

const TOKENS = [
    {
        name: 'Ethereum',
        ticker: 'ETH',
        image: EthereumLogo
    },
    {
        name: 'Cardano',
        ticker: 'ADA',
        image: CardanoLogo
    }
]

const TokenCard = styled.div`
    width: 160px;
    height: 200px;
    box-sizing: border-box;
    cursor: pointer;
    ${({ active }) => `border: 1px solid  ${active ? '#000' : '#ccc'};`}
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    text-align: center;
    & img {
        width: 64px;
        height: 64px;
        flex: 1;
        margin:auto;
    }
    & h5, & h4 {
        font-weight: 400;
    }
    & h5 {
        color: #666;
    }
`
export default function TokenCardList({ selectedToken, onChange }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '160px 160px', gridGap: '16px' }}>
            {
                TOKENS.map((token) => (
                    <TokenCard active={selectedToken === token.ticker} key={token.ticker} onClick={() => onChange(token.ticker)}>
                        <img src={token.image} alt={`${token.name} logo`}/>
                        <h4 style={{ margin: 0 }}>{token.name}</h4>
                        <h5 style={{ margin: 0 }}>{token.ticker}</h5>
                    </TokenCard>
                ))
            }
        </div>
    )
}
