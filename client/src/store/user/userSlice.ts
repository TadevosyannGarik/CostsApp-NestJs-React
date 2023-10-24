import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../types/types'

// Определение типа состояния для среза (slice)
interface UserState {
    // Поле user хранит данные о пользователе или null, если пользователь не аутентифицирован
    user: IUser | null
    // Поле isAuth указывает, аутентифицирован ли пользователь
    isAuth: boolean
}

// Определение начального состояния с использованием определенного типа
const initialState: UserState = {
    user: null,
    isAuth: false,
}

// Создание среза (slice) состояния приложения с использованием createSlice
export const userSlice = createSlice({
    // Название среза
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    // Начальное состояние
    initialState,
    reducers: {
        // Определение действия (action) "login", которое устанавливает данные пользователя и флаг аутентификации
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        // Определение действия (action) "logout", которое сбрасывает флаг аутентификации и данные пользователя
        logout: (state) => {
            state.isAuth = false
            state.user = null
        }
    },
})
// Экспорт созданных действий (actions) "login" и "logout"
export const { login, logout } = userSlice.actions
    
// Other code such as selectors can use the imported `RootState` type
// Другой код, такой как селекторы (selectors), может использовать тип RootState из файла store
export const selectCount = (state: RootState) => state.user

// Экспорт редюсера (reducer) среза состояния
export default userSlice.reducer