/* eslint-disable react/prop-types */
import './css/Button.css'

const body=document.querySelector('body')

function Button({color}){
    function clicked(){
        body.style.backgroundColor=color;
    }

    return (
        <button className='m-3 p-3 rounded-lg font-bold' onClick={clicked} style={{background: color}}>{color}</button>
      )
}

export default Button