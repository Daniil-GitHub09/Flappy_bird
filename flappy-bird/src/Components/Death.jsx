import React from 'react'

function Death({isSecond}) {
  return (
    <>
      {isSecond ? <div></div> : <div>Game Over</div>}
    </>
  )
}

export default Death