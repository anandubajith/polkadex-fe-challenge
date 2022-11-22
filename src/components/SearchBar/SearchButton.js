import { motion } from "framer-motion";
import styled from "styled-components";
import SearchIcon from '../../assets/search.svg'

const SearchButtonWrapper = styled(motion.button)`
    box-sizing: border-box;
    min-width: 58px;
    height: 58px;
    border-radius: 16px;
    outline: 0;
    color:#fff;
    border:0;
    background: rgba(139, 161, 190, 0.2);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 20px;
    ${({ active }) => `img { margin-right: ${active ? '8px' : '0px'}; }`}
`;

export default function SearchButton({ active }) {
    return (
        <SearchButtonWrapper
            active={active}
            animate={active ? { background: '#e6007a', width: '120px' } : { background: 'rgba(139, 161, 190, 0.2)', width: '58px' }}
        >
            <img src={SearchIcon} /> {active ? 'Search' : null}
        </SearchButtonWrapper>
    )
}
