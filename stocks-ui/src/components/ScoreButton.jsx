import React, { useState } from 'react'
// import styles from '../styles/ScoreButton.module.css'

function ScoreButton() {
    const [ flag, setFlag ] = useState(false)
    let scoreData = {"total":30,"value":13}

    const handleClick = () => {
        setFlag(true)
    }
    return (
        <div>
            {
                flag ? (
                    <div  style = {{borderRadius: '5px', padding: '10px', backgroundColor: 'grey', width: '200px', textAlign: 'center'}}>
                            Score: {scoreData.value}/{scoreData.total}
                    </div>
                    
                ) : (
                    <div onClick={handleClick} style = {{cursor: 'pointer', borderRadius: '5px', padding: '10px', backgroundColor: 'grey', width: '200px', textAlign: 'center'}} variant="extended">
                        Check Score
                    </div>
                )
            }
        </div>
    )
}

export default ScoreButton
