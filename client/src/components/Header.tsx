import { FC } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaBtc, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"
import { useAppDispatch } from "../store/hooks"
import { logout } from "../store/user/userSlice"
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper"
import { toast } from "react-toastify"

const Header: FC = () => {
    // Получаем информацию об аутентификации пользователя
    const isAuth = useAuth()
    // Получаем доступ к диспетчеру Redux
    const dispatch = useAppDispatch()
    // Используем хук для навигации
    const navigate = useNavigate()

    // Обработчик выхода из учетной записи
    const logoutHandler = () => {
        // Диспетчер Redux для выхода из учетной записи
        dispatch(logout())
        // Удаляем токен из локального хранилища
        removeTokenFromLocalStorage("token")
        // Показываем уведомление об успешном выходе
        toast.success("You logged out.")
        // Перенаправляем пользователя на главную страницу
        navigate("/")
    }

    return (
        <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
            <Link to="/">
                <FaBtc size={20} />
            </Link>  
            
            {isAuth && (
                <nav className="ml-auto mr-10">
                    <ul className=" flex items-center gap-5">
                        <li>
                            <NavLink to={"/"} className={({isActive}) => isActive? "text-white": "text-white/50"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/transactions"} className={({isActive}) => isActive? "text-white": "text-white/50"}>Transactions</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/categories"} className={({isActive}) => isActive? "text-white": "text-white/50"}>Categories</NavLink>
                        </li>
                    </ul>
                </nav>
            )}     
            {
                isAuth? (
                    <button className="btn btn-red" onClick={logoutHandler}>
                        <span>Log Out</span>
                        <FaSignOutAlt />
                    </button>
                ) : (
                    <Link className="py-2 text-white/50 hover:text-white ml-auto" to={"auth"}>
                        Log In / Sign In
                    </Link>
                )
            }
        </header>

    )
}

export default Header