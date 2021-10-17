import React from 'react'
import CalendarPicker from '../Components/CalendarPicker'

function myTest() {
  const today=new Date();

  return (
    <div>
      <CalendarPicker
      duration={2}    
      year={today.getFullYear()}
      month={today.getMonth()}  
      onSelectCallback={(e)=>console.log(e)}  
      ></CalendarPicker>  
    </div>
  )
}

export default myTest
  