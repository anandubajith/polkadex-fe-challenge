import styled from "styled-components";

const StepperWrapper = styled.div`
    display: flex;
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        background:#8BA1BE1A;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        text-align:center;
        line-height: 36px;
        font-size: 16px;
    }
    div {
        padding:8px;
    }

`

function Stepper({ value, onChange, minValue, maxValue }) {
    return (
        <StepperWrapper>
            <button onClick={() => onChange(Math.min(value + 1, maxValue))}>+</button>
            <div>{value}</div>
            <button onClick={() => onChange(Math.max(minValue, value - 1))}>-</button>
        </StepperWrapper>
    )
}
export default function AmountRangeSelector({ value, onChange }) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 300 }}>
                <div style={{ flex: '1' }}>Max amount</div><Stepper value={value.max} minValue={0} maxValue={Infinity} onChange={max => onChange({ ...value, max })} />
            </div>
            <div style={{ background: '#eee', height: '1px', width: '100%', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: '1' }}>Min amount</div> <Stepper value={value.min} minValue={0} maxValue={Infinity} onChange={min => onChange({ ...value, min })} />
            </div>
        </>
    )
}
