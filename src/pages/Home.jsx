import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, addToWeekly } from "../redux/slices/habitSlice";
import HabitCard from "../components/HabitCard";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[input,setInput] = useState('')
    const habits = useSelector((state)=> state.habit.habits)
  
    const handleOnSubmit =(e) =>{
      const id = Date.now()
      e.preventDefault()
       dispatch(addHabit({name : input, id : id}))
       dispatch(addToWeekly({name : input, id : id}))
       setInput("")
    }

    return (
      <>
        
        <button type="button" className="add-btn" onClick={()=> navigate('/weeklyhabits')} >My weekly data</button>
          <div className="input-container">
        <label htmlFor="habit">Add Habit:</label>
        <form className="input-button-wrapper" onSubmit={handleOnSubmit}>
          <input type="text" id="habit" name="habit" required value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Enter a new habit" />
          <button type="submit" className="add-btn">Add</button>
        </form>
      </div>
      
        {/* Habit Cards */}
        <div className="habit-list">
          {habits.map((habit, index) => (
          <HabitCard key={habit.id} habit={habit} index={index} isWeeklyData={false}/>
          ))}
        </div>
      </>
    )
  }

export default Home
