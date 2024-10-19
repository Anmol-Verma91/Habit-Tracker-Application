import { createSlice } from "@reduxjs/toolkit";

const habits = localStorage.getItem("habits") === null ? [] : JSON.parse(localStorage.getItem("habits"))
const weekly = localStorage.getItem("weekly") === null ? [] : JSON.parse(localStorage.getItem("weekly"))
const eachWeekData = localStorage.getItem("eachWeekData") === null ? [] : JSON.parse(localStorage.getItem("eachWeekData"))

const initialState = {
    habits: habits,
    weekly: weekly,
    eachWeekData: eachWeekData
}

const habitSlice = createSlice({
    name: "habit",
    initialState,
    reducers: {
        addHabit: (state, action) => {
            let newHabit = {
                id: action.payload.id,
                name: action.payload.name,
                progress: 0,
                streak: 0,
                daysCompleted: [false, false, false, false, false, false, false],
                disableButtons: [false, false, false, false, false, false, false],
                week: 1
            }
            state.habits.push(newHabit)

        },
        removeHabit: (state, action) => {
            const filterHabit = state.habits.filter((eachItem) => eachItem.id != action.payload)
            const filterWeekly = state.weekly.filter((eachItem) => eachItem.id != action.payload)
            const filterEachWeekData = state.eachWeekData.filter((eachItem) => eachItem.id != action.payload)

            state.habits = filterHabit
            state.weekly = filterWeekly
            state.eachWeekData = filterEachWeekData
        },

        addStreak: (state, action) => {

            for (let i = 0; i <= action.payload.i; i++) {
                state.habits[action.payload.index].disableButtons[i] = true;
            }

            if (state.habits[action.payload.index].daysCompleted[action.payload.i - 1] == true) {
                state.habits[action.payload.index].daysCompleted[action.payload.i] = true;
                state.habits[action.payload.index].progress += action.payload.progress;
                state.habits[action.payload.index].streak += 1;
            } else {
                state.habits[action.payload.index].daysCompleted[action.payload.i] = true;
                state.habits[action.payload.index].progress = action.payload.progress;
                state.habits[action.payload.index].streak = action.payload.streak;
            }

        },

        resetProgress: (state, action) => {
            state.habits.map((eachItem, index) => {
                if (eachItem.id == action.payload) {
                    state.habits[index].progress = 0;
                    state.habits[index].week += 1;

                    if(state.habits[index].daysCompleted[6] == false){
                        state.habits[index].streak = 0
                    }

                    eachItem.daysCompleted.map((eachItem, i) => {
                        state.habits[index].daysCompleted[i] = false
                    })

                    eachItem.disableButtons.map((_, i) => {
                        state.habits[index].disableButtons[i] = false
                    })
                }
            })
        },

        addToWeekly: (state, action) => {
            let weeklyData = {
                name: action.payload.name,
                id: action.payload.id
            }
            state.weekly.push(weeklyData)
        },

        addToEachWeekData: (state, action) => {
            let weeklyDetails = action.payload
            state.eachWeekData.push(weeklyDetails)
        }
    }
})

export const { addHabit, addStreak, resetProgress, addToWeekly, addToEachWeekData, removeHabit } = habitSlice.actions

export default habitSlice.reducer