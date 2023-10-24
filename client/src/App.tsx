import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { useAppDispatch } from "./store/hooks"
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper"
import { AuthService } from "./services/auth.service"
import { login, logout } from "./store/user/userSlice"
import { useEffect } from "react"

// Определение основного компонента приложения
function App() {
    // Использование пользовательского хука "useAppDispatch" для получения диспетчера Redux
    const dispatch = useAppDispatch()
    // Определение асинхронной функции для проверки аутентификации пользователя
    const checkAuth = async () =>{
        // Получение токена из локального хранилища браузера
        const token = getTokenFromLocalStorage()
        try {
            // Проверка наличия токена
            if(token) {
                // Запрос на сервер для получения профиля пользователя
                const data = await AuthService.getProfile()
                // Если данные о пользователе получены
                if(data) {
                    // Диспетчеризация действия Redux для входа пользователя
                    dispatch(login(data))
                } else {
                    // Диспетчеризация действия Redux для выхода пользователя
                    dispatch(logout())
                }
            }
        // Обработка возможных ошибок
        } catch (error) {
            
        }
    }
    useEffect(() => {
        // Запуск функции проверки аутентификации при инициализации компонента
        checkAuth()
        // Пустой массив зависимостей, чтобы функция выполнилась один раз
    }, [])

    // Возвращение компонента "RouterProvider" с заданными маршрутами
    return <RouterProvider router={router} />
}

// Экспорт компонента "App" по умолчанию
export default App
