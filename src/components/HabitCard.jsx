import { useDispatch } from "react-redux";
import { addStreak, addToEachWeekData, removeHabit, resetProgress } from "../redux/slices/habitSlice";

function HabitCard({ habit, index, isWeeklyData }) {

    const dispatch = useDispatch()
    const disableButtons = habit.disableButtons

    const handleStreak = (index, i) => {
        if (i == 0) {
            dispatch(addStreak({ index, i, progress: 14.28571428571429, streak: habit.streak + 1 }))
        } else {
            dispatch(addStreak({ index, i, progress: 14.28571428571429, streak: 1 }))
        }
    }

    const handleNextWeekBtn = () => {
        dispatch(addToEachWeekData(habit))
        dispatch(resetProgress(habit.id))
    }

    const handleRemoveBtn = () => {
        dispatch(removeHabit(habit.id))
    }

    console.log(disableButtons)


    return (
        <div key={habit.id} className="habit-card">
            {!isWeeklyData &&
                <h2>{habit.name}</h2>
            }
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${habit.progress}%` }}></div>
            </div>
            <div className="day-tracker">
                {habit.daysCompleted.map((completed, i) => (
                    <button key={i} className={completed ? 'day-completed' : 'day-incomplete'} disabled={isWeeklyData ? true : disableButtons[i]} onClick={() => handleStreak(index, i)}>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </button>
                ))}
            </div>
            {!isWeeklyData && <p>Streak: {habit.streak} {habit.streak == 1 ? "day" : "days"}</p>}
            <p>Week: {habit.week}</p>
            {
                !isWeeklyData && <>
                    <button type="button" className="add-btn" onClick={handleNextWeekBtn}>Start Next Week</button>
                    <button type="button" className="remove-btn" onClick={handleRemoveBtn}>Remove Habit</button>
                </>
            }
        </div>
    )
}

export default HabitCard
