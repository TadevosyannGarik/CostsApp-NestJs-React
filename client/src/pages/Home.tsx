import { FC, useEffect } from "react";
import {TbUserCheck, TbCategory} from "react-icons/tb"
import {AiOutlineTransaction} from "react-icons/ai"
import {GiExpense} from "react-icons/gi"
import './style.css';
import { useAuth } from "../hooks/useAuth";
import img from "../assets/Mobile login-amico.png"
import img2 from "../assets/Add notes-bro.png"
import img3 from "../assets/Online transactions-pana.png"
import img4 from "../assets/Analytics-amico.png"
import { NavLink } from "react-router-dom"

// Объявление компонента "Home"
const Home: FC = () => {
    // Получение статуса аутентификации пользователя
    const isAuth = useAuth();
    
    useEffect(() => {
        // Получение всех ссылок и вкладок
        const allLinks = document.querySelectorAll(".tabs a");
        const allTabs = document.querySelectorAll(".tab-content");

        // Функция для сдвига вкладок
        const shiftTabs = (linkId: string) => {
            allTabs.forEach((tab, i) => {
                if (tab.id.includes(linkId)) {
                    allTabs.forEach((tabItem) => {
                        (tabItem as HTMLElement).style.transform = `translateY(-${i * 540}px)`;
                    });
                }
            });
        };

// Добавление обработчика события для каждой ссылки
allLinks.forEach((elem) => {
    elem.addEventListener("click", function () {
        const linkId = elem.id;
        const hrefLinkClick = elem.getAttribute("href");

        // Переключение активной ссылки
        allLinks.forEach((link) => {
            if (link.getAttribute("href") === hrefLinkClick) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
            shiftTabs(linkId);
        });
        });

        // Получение текущего хэша URL
        const currentHash = window.location.hash;
        let activeLink = document.querySelector(".tabs a");

        if (currentHash) {
            const visibleHash = document.getElementById(currentHash.replace("#", ""));

        if (visibleHash) {
            activeLink = visibleHash;
        }
    }

        activeLink?.classList.toggle("active");
        shiftTabs(activeLink?.id || "");
    }, []);
    // Возвращение JSX-разметки компонента
    return (
        <div className="container">
            <div className="tabs-container  mt-10">
                {isAuth ? (
                <div className="welcome-container">
                    <h1 className="welcome-heading">Welcome</h1>
                        <p className="welcome-message">You are now logged in and can start managing your transactions and categories.</p>
                        <button>
                            <NavLink to={"/transactions"} className="btn btn-green mt-10">Get started</NavLink>
                        </button>          
                </div>
                ) : (
                <>
                <ul className="tabs">
                    <li>
                        <a id="tab1" title="Register and Log In" href="#tab1"><TbUserCheck />Register and Log In</a>
                    </li>
                    <li>
                        <a id="tab2" title="Create Categories" href="#tab2"><TbCategory />Create Categories</a>
                    </li>
                    <li>
                        <a id="tab3" title="Add Transactions" href="#tab3"><AiOutlineTransaction />Add Transactions</a>
                    </li>
                    <li>
                        <a id="tab4" title="View Your Expenses" href="#tab4"><GiExpense />View Your Expenses</a>
                    </li>
                
                    </ul>
                        <div className="tab-content-wrapper">
                            <section id="tab1-content" className="tab-content">
                                <h2>Register and Log In</h2>
                                <p>
                                    The first step is to create an account with us. Registration is quick and easy. Once you're registered, simply log in to your account using your credentials.
                                </p>
                                <img src={img} alt="idea" />
                            </section>
                            <section id="tab2-content" className="tab-content">
                                <h2>Create Categories</h2>
                                <p>To effectively track your expenses, create different spending categories. This allows you to organize your transactions. </p>
                                <img src={img2} alt="product" />
                            </section>
                            <section id="tab3-content" className="tab-content">
                                <h2>Add Transactions</h2>
                                <p>Start adding your daily expenses and income transactions. Be diligent in recording your financial activities.</p>
                                <img src={img3} alt="product" />
                            </section>
                            <section id="tab4-content" className="tab-content">
                                <h2>View Your Expenses</h2>
                                <p>Once you've added transactions, you can view your expenses in a clear and concise manner</p>
                                <img src={img4} alt="product" />
                            </section>
                
                        </div>
                    </>
                )}
            </div>
        </div>
        );
    };

    export default Home;
