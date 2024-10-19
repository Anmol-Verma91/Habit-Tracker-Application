import { useSelector } from "react-redux"
import HabitCard from "../components/HabitCard"
import { useParams } from "react-router-dom"


function HabitWeeklyDetails() {
  const weeklyDetails = useSelector((state) => state.habit.eachWeekData)
  const params = useParams()
  const eachWeekData = weeklyDetails.filter((eachItem) => eachItem.id == params.id)
   
  if(eachWeekData.length <= 0){
    return (
      <h1>Please Complete atleast one week</h1>
    )
  }

  return (
    <>
      <div>
        <h1>{eachWeekData[eachWeekData.length - 1].name}</h1>
        <h1>Streak :{eachWeekData[eachWeekData.length - 1].streak} days</h1>
      </div>
      <div className="habit-list">
        {eachWeekData.map((habit, index) => (
          <HabitCard key={index} habit={habit} index={index} isWeeklyData={true} />
        ))}
      </div>
    </>

  )
}

export default HabitWeeklyDetails
