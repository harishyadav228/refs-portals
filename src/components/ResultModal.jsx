import {forwardRef, useImperativeHandle , useRef} from 'react';
import { createPortal } from 'react-dom';


const ResultModal = forwardRef (function ResultModal({ targetTime, remainingTime, onReset }, ref){
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemaining = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);


    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal();
            }
        };
    });

    return createPortal (
        <dialog ref={dialog} className="result-modal">
        {userLost &&  <h2>you lost</h2>}
        {!userLost && <h2> Your Score {score}</h2>}
        <p>The target time was <strong>{targetTime} second. </strong></p>
        <p> You stopped the timer with {''}<strong>{formattedRemaining} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
        </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal;