import { instance } from "../api/axios.api"
import {IUserData, IResponseUserData, IUser} from "../types/types"

// Экспорт объекта AuthService, предоставляющего функции для взаимодействия с API
export const AuthService = {
    // Асинхронная функция "registration", принимающая данные пользователя для регистрации
    async registration (userData: IUserData): Promise<IResponseUserData | undefined> {
        // Выполнение POST-запроса к эндпоинту "user" с переданными данными пользователя
        const {data} = await instance.post<IResponseUserData >("user", userData)
        // Возврат полученных данных (результат запроса)
        return data
    },
        
    // Асинхронная функция "login", принимающая данные пользователя для входа
    async login (userData: IUserData): Promise<IUser | undefined> {
        // Выполнение POST-запроса к эндпоинту "auth/login" с переданными данными пользователя
        const {data} = await instance.post<IUser>('auth/login', userData)
        // Возврат полученных данных (результат запроса)
        return data
    },
        
    // Асинхронная функция "getProfile", получающая данные профиля пользователя
    async getProfile(): Promise<IUser | undefined> {
        // Выполнение GET-запроса к эндпоинту "auth/profile" для получения данных профиля
        const {data} = await instance.get<IUser>("auth/profile")
        // Возврат полученных данных (результат запроса), если они существуют
        if(data) return data
    },
}