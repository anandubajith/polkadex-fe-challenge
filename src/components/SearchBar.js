import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from '../assets/search.svg'
import styled from "styled-components";
import { useRef, useState } from 'react';
import TokenCardList from './TokenCardList';
import ChainSelectList from './ChainSelectList';
import AmountRangeSelector from './AmountRangeSelector'

const SearchBarWrapper = styled(motion.div)`
    width: clamp(50%, 700px, 90%);
    cursor: pointer;
    height: 90px;
    box-sizing: border-box;
    margin:auto;
    background: #000;
    color:#fff;
text-align: left;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-radius: 24px;
    padding: 12px;
    position: relative;
display: grid;
grid-template-columns: 1fr 1fr 2fr;
      &:before {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          z-index: -1;
          margin: -2px; /* !important */
              border-radius: inherit; /* !important */
              background: linear-gradient(to right, #E6007A, #6745D2);
      }
`;

const ButtonWrapper = styled(motion.button)`
    flex: 1;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    border-right: 1px solid rgba(139, 161, 190, 0.2) ;
    background: inherit;
    color: #fff;
    border:0;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-radius: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
`;
const SearchButton = styled(motion.div)`
    box-sizing: border-box;
    min-width: 64px;
    height: 64px;
    border-radius: 16px;
    outline: 0;
    border:0;
    ${({ active }) => `background: ${active ? '#E6007A' : 'rgba(139, 161, 190, 0.2)'};`}
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 20px;
    img {
        ${({ active }) => `margin-right: ${active ? '8px' : '0px'};`}
    }
`;

const FloatingCard = styled(motion.div)`
    width: 400px;
    min-height: 300px;
    background: white;
    position: absolute;
    border-radius: 24px;
    padding: 24px;
`;
const FloatingCardHeader = styled.h1`
    font-weight: 450;
    font-family:CircularStd;
    margin: 0;
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 24px;
`


export default function SearchBar() {
    const amountRef = useRef();
    const chainRef = useRef();
    const tokenRef = useRef();
    const floatingCardRef = useRef();
    const [currentButton, setCurrentButton] = useState('')
    const [translation, setTranslation] = useState({ x: 0, y: 0, scale: 0 })
    const [selectedToken, setSelectedToken] = useState('')
    const [selectedChain, setSelectedChain] = useState('')
    const isActive = currentButton !== ''

    const getTargetNode = (button) => {
        if (button == 'token') return tokenRef.current;
        if (button == 'chain') return chainRef.current;
        if (button == 'amount') return amountRef.current;
    }
    const handleClick = (button) => (e) => {
        console.log(e)
        const targetNode = getTargetNode(button)
        const { top, left, bottom, right } = targetNode.getBoundingClientRect();
        const xCenter = (left + right) / 2
        const yCenter = (top + bottom) / 2
        const {offsetWidth, offsetHeight} = floatingCardRef.current;
        setTranslation({ x: xCenter - (offsetWidth/2), y: yCenter - (offsetHeight + 64)})
        if (currentButton == button) {
            setCurrentButton('')
            setTranslation({ scale: 0, x: xCenter - 200, y: yCenter - 150 })
            return;
        }
        setCurrentButton(button)
    }

    const handleTokenSelect = (ticker) => {
        setSelectedToken(ticker)
        // navigate to next page
    }
    const handleChainSelect = (chain) => {
        setSelectedChain(chain);
        // navigate to next page
    }

    const renderContent = () => {
        if (currentButton === 'token') {
            return (
                <>
                    <FloatingCardHeader>Choose token</FloatingCardHeader>
                    <TokenCardList selectedToken={selectedToken} onChange={handleTokenSelect} />
                </>
            );
        } else if (currentButton === 'chain') {
            return (
                <>
                    <FloatingCardHeader>Select chain</FloatingCardHeader>
                    <ChainSelectList selectedChain={selectedChain} onChange={handleChainSelect} />
                </>
            )
        } else if (currentButton === 'amount') {
            return (
                <>
                    <FloatingCardHeader>Filter by amount</FloatingCardHeader>
                    <AmountRangeSelector />
                </>
            )
        }
        return <h1>{currentButton}</h1>
    }

    return (
        <>
            <AnimatePresence>
                <FloatingCard ref={floatingCardRef} animate={translation} > {renderContent()} </FloatingCard>
            </AnimatePresence>
            <SearchBarWrapper active={isActive}>
                <ButtonWrapper onClick={handleClick('token')} active={currentButton === 'token'} ref={tokenRef}>
                    <div style={{ opacity: isActive ? '0.5' : '1', fontSize: '20px' }}>Any token</div>
                    <div style={{ display: 'block', fontSize: '18px' }}>{selectedToken === '' ? 'Select token' : selectedToken}</div>
                </ButtonWrapper>
                <ButtonWrapper onClick={handleClick('chain')} active={currentButton === 'chain'} ref={chainRef}>
                    <div style={{ opacity: isActive ? '0.5' : '1', fontSize: '20px' }}>Any Chain</div>
                    <div style={{ display: 'block', fontSize: '18px' }}>{selectedChain === '' ? 'Select Chain' : selectedChain}</div>
                </ButtonWrapper>
                <ButtonWrapper style={{ flex: 2, width: '100%', borderRight: 0, flexDirection: 'row' }} onClick={handleClick('amount')} ref={amountRef}>
                    <div style={{ flex: '1', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <div style={{ opacity: isActive ? '0.5' : '1', fontSize: '20px' }}>Any amount</div>
                        <div style={{ fontSize: '18px' }}>Filter by amount</div>
                    </div>
                    <SearchButton active={isActive}>
                        <img src={SearchIcon} />
                        {isActive ? 'Search' : null}
                    </SearchButton>
                </ButtonWrapper>
            </SearchBarWrapper>
        </>
    )

}

