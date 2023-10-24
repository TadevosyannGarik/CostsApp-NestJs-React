import { FC, useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { Form, useLoaderData } from "react-router-dom"
import { IResponseTransactionLoader, ITransaction } from "../types/types"
import { formatDate } from "../helpers/date.helper"
import { formatToUSD } from "../helpers/currency.helper"
import { instance } from "../api/axios.api"
import ReactPaginate from "react-paginate"

interface ITransactionTable {
    limit: number
}

const TransactionTable: FC<ITransactionTable> = ({limit = 3}) => {
    // Загрузка данных о транзакциях из контекста роутера
    const { transactions } = useLoaderData() as IResponseTransactionLoader
  
    // Состояние для хранения отображаемых данных
    const [data, setDate] = useState<ITransaction[]>([])
    // Состояние для хранения текущей страницы
    const [currentPage, setCurrentPage] = useState<number>(1)
    // Состояние для хранения общего количества страниц
    const [totalPages, setTotalPages] = useState<number>(0) 

    // Функция для загрузки данных о транзакциях с сервера
    const fetchTransactions = async (page: number) => {
        const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`);
        setDate(response.data)
        setTotalPages(Math.ceil(transactions.length / limit))
    }
    
    // Функция для обработки смены страницы
    const handlePageChange = (selectedItem: {selected: number}) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {
        fetchTransactions(currentPage)
    }, [currentPage, transactions])
    return (<>
        <ReactPaginate 
            className="flex gap-3 justify-end mt-4 items-center"
            activeClassName="bg-blue-600 rounded-sm"
            pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
            previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
            nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
            disabledClassName="text-white/50"
            disabledLinkClassName="text-slate-600"
            pageCount={totalPages}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
        />
        <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="font-bold">#</th>
                        <th className="font-bold">Title</th>
                        <th className="font-bold">Amount</th>
                        <th className="font-bold">Category</th>
                        <th className="font-bold">Date</th>
                        <th className="font-bold">Type</th>
                        <th className="font-bold text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((transaction: ITransaction, idx: number) => (
                        <tr key={idx} className="text-center">
                            <td> {idx + 1} </td>
                            <td> {transaction.title} </td>
                            <td 
                                className={transaction.type === "income" ? "text-green-500" : "text-red-500"}> 
                                {transaction.type === "income" ? `+ ${formatToUSD.format(transaction.amount)}` : 
                                `- ${formatToUSD.format(transaction.amount)}`} 
                            </td>
                            <td> {transaction.category?.title || "Other"} </td>
                            <td> {formatDate(transaction.createdAt)} </td>
                            <td className={transaction.type === "income" ? "text-green-500" : "text-red-500"}> {transaction.type} </td>
                            <td className="text-right">
                                <Form method="delete" action="/transactions">
                                    <input type="hidden" name="id" value={transaction.id} />
                                    <button className="btn hover:btn-red ml-auto ">
                                        <FaTrash />
                                    </button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default TransactionTable
