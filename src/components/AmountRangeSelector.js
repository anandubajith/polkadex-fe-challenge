import styled from "styled-components";

function Stepper() {
    return <h4>TODO</h4>
}
export default function AmountRangeSelector({ value, onChange }) {
    return (
        <>
            <div>
                Max amount <Stepper/>
            </div>
            <div>
                Min amount <Stepper/>
            </div>
        </>
    )
}
