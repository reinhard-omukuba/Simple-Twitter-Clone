import React, { useRef } from 'react'

function PageTests() {

    const nameInput = useRef();

    function submitdata(){
        const name = nameInput.current.value;

    }

  return (
    <div>

        <input type="text" placeholder='enter your name' ref={nameInput} />
        <button onClick={submitdata}>Submit</button>
    </div>
  )
}

export default PageTests