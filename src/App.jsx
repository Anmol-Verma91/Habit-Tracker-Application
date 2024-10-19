import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function App() {
  const weeklyDetails = useSelector((state) => state.habit.eachWeekData)
  const weeklyData = useSelector((state) => state.habit.weekly)
  const habits = useSelector((state)=> state.habit.habits)

  useEffect(()=>{
    localStorage.setItem("habits", JSON.stringify(habits))
  },[habits])

  useEffect(()=>{
    localStorage.setItem("weekly", JSON.stringify(weeklyData))
  },[weeklyData])

  useEffect(()=>{
    localStorage.setItem("eachWeekData", JSON.stringify(weeklyDetails))
  },[weeklyDetails])

  return (
    <div className="app">
      <header>
        <h1>Habit Tracker</h1>
      </header>
      <Outlet />
    </div>

  )
}


export default App
