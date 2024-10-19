import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function WeeklyHabits() {
    const weeklyData = useSelector((state) => state.habit.weekly)

    const navigate = useNavigate()

    return (
        <div className='weeklydata-list'>
            {weeklyData.length <= 0 ? <h1>Please add Habit</h1> : 
            weeklyData.map((eachItem) => (
                <div className='weeklydata' key={eachItem.id} onClick={() => navigate(`/weeklyhabits/${eachItem.id}`)}>
                    <h2>{eachItem.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default WeeklyHabits
