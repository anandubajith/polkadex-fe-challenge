import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useEffect, useRef, useState } from 'react';
import TokenCardList from '../TokenCardList';
import ChainSelectList from '../ChainSelectList';
import AmountRangeSelector from '../AmountRangeSelector'
import SearchButton from "./SearchButton";

const SearchBarWrapper = styled(motion.div)`
    width: clamp(50%, 740px, 90%);
    cursor: pointer;
    height: 90px;
    box-sizing: border-box;
    margin:auto;
    color:#fff;
    text-align: left;
    z-index: 1000;
    background: #000;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-radius: 24px;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
`;

const ButtonWrapper = styled(motion.div)`
    flex: 1;
    box-sizing: border-box;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    border:0;
    background: inherit;
    color: #fff;
    padding: 12px;
    background-clip: padding-box;
    border-top: 2px solid transparent;
    border-right: 2px solid rgba(139, 161, 190, 0.2) ;
    border-radius: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: #000;
    z-index: 4;
    text-align: left;
    align-items: flex-start;
    ${({ active }) => !active && `border-radius: 0;`}
    ${({ active }) => !active && `&:nth-child(2) { border-top-left-radius: 24px;border-bottom-left-radius: 24px;}`}
    ${({ active }) => !active && `&:last-of-type { border-top-right-radius: 24px;border-bottom-right-radius: 24px;}`}
`;

const MovingBorder = styled(motion.div)`
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(to right, #E6007A, #6745D2);
`

const FloatingCard = styled(motion.div)`
    background: white;
    position: absolute;
    overflow:hidden;
    top:0;
    left:0;
    border-radius: 24px;
    padding: 24px;
    color: #000;
`;
const FloatingCardHeader = styled.h1`
    font-weight: 450;
    margin: 0;
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 24px;
`


export default function SearchBar() {
    const amountRef = useRef();
    const chainRef = useRef();
    const tokenRef = useRef();
    const searchBarRef = useRef();
    const floatingCardRef = useRef();

    const [currentButton, setCurrentButton] = useState('')
    const [translation, setTranslation] = useState({ x: 0, y: 0, scale: 0 })
    const [movingBorderPos, setMovingBorderPos] = useState({ x: 0 })

    const [selectedToken, setSelectedToken] = useState('')
    const [selectedChain, setSelectedChain] = useState('')
    const [amount, setAmount] = useState({ min: 0, max: 10 })

    const isActive = currentButton !== ''

    useEffect(() => {
        const element = searchBarRef.current;
        console.log(element.offsetLeft);
        console.log(element.offsetTop);
        setTranslation({ ...translation, x: element.offsetLeft, y: element.offsetTop - 300 })

    }, [searchBarRef])


    const getTargetNode = (button) => {
        if (button == 'token') return tokenRef.current;
        if (button == 'chain') return chainRef.current;
        if (button == 'amount') return amountRef.current;
    }
    const handleClick = (button) => () => {
        if (currentButton == button) {
            setCurrentButton('');
            return;
        }
        setCurrentButton(button)
    }

    useEffect(() => {
        if (currentButton == '') {
            const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = searchBarRef.current;
            setTranslation({ scale: 0, x: offsetLeft + (offsetWidth / 2), y: offsetTop - (offsetHeight / 2) })
            setMovingBorderPos({ x: 0, width: 'calc(100% + 4px)' })
            return;
        };
        // todo: consider cardWidth?
        const { offsetHeight: cardHeight } = floatingCardRef.current;
        const targetNode = getTargetNode(currentButton)
        setTranslation({ ...translation, x: searchBarRef.current.offsetLeft + targetNode.offsetLeft, y: searchBarRef.current.offsetTop - cardHeight - 90, scale: 1 })
        setMovingBorderPos({ x: targetNode.offsetLeft, width: targetNode.offsetWidth + 4 })
    }, [currentButton])


    const handleTokenSelect = (ticker) => {
        setSelectedToken(ticker)
        handleClick('chain')(chainRef)
    }
    const handleChainSelect = (chain) => {
        setSelectedChain(chain);
        handleClick('amount')(amountRef)
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
                    <AmountRangeSelector value={amount} onChange={setAmount} />
                </>
            )
        }
        return <h1>{currentButton}</h1>
    }

    return (
        <>
            <AnimatePresence>
                <FloatingCard animate={translation} transition={{ bounce: 0 }}>
                    <motion.div layoutId="card-content" ref={floatingCardRef}>{renderContent()}</motion.div>
                </FloatingCard>
            </AnimatePresence>
            <SearchBarWrapper active={isActive} ref={searchBarRef}>
                <MovingBorder layoutId="border" animate={movingBorderPos} transition={{ bounce: 0 }} />
                <ButtonWrapper onClick={handleClick('token')} active={currentButton === 'token'} ref={tokenRef} >
                    <motion.div animate={{ opacity: isActive ? '0.5' : '1', fontSize: '20px' }}>Any token</motion.div>
                    {isActive && <motion.div animate={{ display: 'block', fontSize: '18px' }}>{selectedToken === '' ? 'Select token' : selectedToken}</motion.div>}
                </ButtonWrapper>
                <ButtonWrapper onClick={handleClick('chain')} active={currentButton === 'chain'} ref={chainRef} animate={{ margin: isActive ? '0 2px' : 0 }}>
                    <motion.div animate={{ opacity: isActive ? '0.5' : '1', fontSize: '20px' }}>Any Chain</motion.div>
                    {isActive && <motion.div animate={{ display: 'block', fontSize: '18px' }}>{selectedChain === '' ? 'Select Chain' : selectedChain}</motion.div>}
                </ButtonWrapper>
                <ButtonWrapper style={{ flex: 2, width: '100%', flexDirection: 'row' }} active={currentButton === 'amount'} onClick={handleClick('amount')} ref={amountRef}>
                    <motion.div animate={{ flex: '1', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <motion.div style={{ opacity: isActive ? '0.5' : '1', fontSize: '20px' }}>Any amount</motion.div>
                        {isActive && <motion.div animate={{ fontSize: '18px' }}>Filter by amount</motion.div>}
                    </motion.div>
                    <SearchButton active={isActive} />
                </ButtonWrapper>
            </SearchBarWrapper>
        </>
    )

}

