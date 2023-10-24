import { FC } from "react"
import img from "../assets/error-404.jpg"
import { Link} from "react-router-dom"

const ErrorPage: FC = () => {
    return (
    <div style={{ backgroundColor: '#131e3a' }} className="flex min-h-screen flex-col items-center justify-center gap-10 font-roboto text-white">
        <img src={img} alt="" />
        <Link to={"/"} className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
            Back
        </Link>
    </div>
  )
}

export default ErrorPage