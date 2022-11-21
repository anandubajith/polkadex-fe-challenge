import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from 'react';
import TokenCardList from './TokenCardList';
import ChainSelectList from './ChainSelectList';
import AmountRangeSelector from './AmountRangeSelector'

const SearchBarWrapper = styled(motion.div)`
    width: clamp(50%, 700px, 90%);
    height: 90px;
    box-sizing: border-box;
    margin:auto;
    background: #000;
    color:#fff;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-radius: 24px;
    padding: 12px;
    position: relative;
    display: flex;
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
    align-items: center;
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
`;
const SearchButton = styled(motion.div)`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    outline: 0;
    border:0;
    background: rgba(139, 161, 190, 0.2);
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
    const [currentButton, setCurrentButton] = useState('')
    const [translation, setTranslation] = useState({ x: 0, y: 0, scale: 0 })
    const [selectedToken, setSelectedToken] = useState('')
    const [selectedChain, setSelectedChain] = useState('')
    const isActive = currentButton !== ''



    const handleClick = (button) => (e) => {
        console.log()
        const targetNode = e.target;
        const { top, left, bottom, right } = targetNode.getBoundingClientRect();
        const xCenter = (left + right) / 2
        const yCenter = (top + bottom) / 2
        setTranslation({ x: xCenter - 200, y: yCenter - 410 })
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
                <FloatingCard animate={translation} > {renderContent()} </FloatingCard>
            </AnimatePresence>
            <SearchBarWrapper active={isActive}>
                <ButtonWrapper onClick={handleClick('token')} active={currentButton === 'token'}>
                    Any token {selectedToken}
                </ButtonWrapper>
                <ButtonWrapper onClick={handleClick('chain')} active={currentButton === 'chain'}>
                    Any chain
                </ButtonWrapper>
                <ButtonWrapper style={{ flex: 2, width: '100%', borderRight: 0 }} onClick={handleClick('amount')} >
                    <span style={{ paddingLeft: '24px', flex: 1 }}>Any amount</span>
                    <SearchButton>
                    </SearchButton>
                </ButtonWrapper>
            </SearchBarWrapper>
        </>
    )

}

