import { FC, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

// Объявление функционального компонента "Auth"
const Auth: FC = () => {
    // Использование хука "useState" для управления состоянием компонента
    // Состояние для хранения email
    const [email, setEmail] = useState<string>('')
    // Состояние для хранения пароля
    const [password, setPassword] = useState<string>('')
    // Состояние для управления режимом входа/регистрации
    const [isLogin, setIsLogin] = useState<boolean>(false);
    // Получение диспетчера Redux
    const dispatch = useAppDispatch()
    // Хук для навигации
    const navigate = useNavigate()
    
    // Функция для обработки входа
    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            // Вызов функции AuthService.login для входа
            const data = await AuthService.login({email, password})

            if(data) {
                // Сохранение токена в локальное хранилище
                setTokenToLocalStorage("token", data.token)
                // Диспетчеризация Redux action "login" с данными пользователя
                dispatch(login(data))
                // Вывод уведомления об успешном входе
                toast.success("You logged in")
                // Переход на главную страницу
                navigate("/")
            }
        } catch (err: any) {
            const error = err.resposne?.data.message
            // Вывод уведомления об ошибке
            toast.error(error?.toString() || "An error occurred");
        }
    }

    // Функция для обработки регистрации
    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            // Вызов функции AuthService.registration для регистрации
            const data = await AuthService.registration({email, password})
            if(data) {
                // Вывод уведомления об успешной регистрации
                toast.success("Account has been created.")
                // Смена режима на "вход"
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            // Вывод уведомления об ошибке
            const error = err.resposne?.data.message
            toast.error(error?.toString() || "An error occurred");
        }
    }

    return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 className="text-center text-xl mb-10">
            {isLogin ? "Login" : "Registration"}
        </h1>

        <form onSubmit={isLogin ? loginHandler: registrationHandler} className="flex w-1/3 flex-col mx-auto gap-5">
            <input type="text" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className="input" placeholder="Password"onChange={(e) => setPassword(e.target.value)}/>
            <button className="btn btn-green mx-auto">Submit</button>
        </form>

        <div className="mt-5 flex justify-center">
            {isLogin ?(
            <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
                Don`t have an account ?
            </button>
            ) : (
            <button onClick={() => setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
                Already have an account ?
            </button>
        )}
    </div>
</div>
    );
};

export default Auth;