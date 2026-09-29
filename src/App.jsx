import { Die } from "./Die";
import React from "react";
import {nanoid} from "nanoid"

export function App(){

  let gameWon = false;

  React.useEffect(()=>{
    if(gameWon){
      wonDom.current.focus()
    }
  },[gameWon])

  function getDieValues(){
    return (Array(10).fill(0).map(()=>({
      value: Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    })))
  }


  const [diceArray,setDiceArray] = React.useState(()=>getDieValues());
  //Now the above function is carried out once before it was carried everytime but discarded as state changes
  const diceElements = diceArray.map((el)=> <Die num = {el.value} key={el.id} isHeld={el.isHeld} onClick={()=>hold(el.id)} />)

  function changeDice(){
    setDiceArray(oldDice => 
      oldDice.map(obj=> 
        obj.isHeld? obj:
        {
          ...obj,
          value:Math.ceil(Math.random()*6),
        }
      )
    )
  }

  function hold(id) {
    setDiceArray(oldDice =>
      oldDice.map(die =>
        die.id === id
          ? { ...die, isHeld: !die.isHeld } // toggle isHeld
          : die
      )
    );
  }

  function checkWon(){
    let count = 1
    diceArray.forEach((obj,index)=>{
      if(index !==0){
        count = (obj.isHeld && obj.value === diceArray[index -1].value)? count+1: count +0;
      }
    })
    gameWon = (count === diceArray.length)? true: false;
  }

  checkWon();

  function newGame(){
    setDiceArray(getDieValues())
  }
  
  const wonDom = React.useRef(null)

  return (
    <main>
      <section className="dice-button-container">
        {diceElements}
      </section>
      <button className="generate-button" onClick={gameWon? newGame:changeDice} ref={wonDom}>{gameWon?"New Game":"Roll"}</button>
    </main>
  )
} 
