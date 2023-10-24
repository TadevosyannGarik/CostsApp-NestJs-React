import { useAppSelector } from "../store/hooks"

// Создание пользовательского хука useAuth, который проверяет, авторизован ли пользователь
export const useAuth = (): boolean => {
    // Использование хука useAppSelector для получения значения isAuth из хранилища Redux
    const isAuth = useAppSelector((state) => state.user.isAuth)
    // Возврат значения isAuth, указывающего на авторизацию пользователя
    return isAuth
}