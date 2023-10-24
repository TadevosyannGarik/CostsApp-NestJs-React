import { FC, useState } from "react"
import { RiFileEditLine, RiAddFill } from "react-icons/ri"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { Form, useLoaderData } from "react-router-dom"
import CategoryModal from "../components/CategoryModal"
import { instance } from "../api/axios.api"
import { ICategory } from "../types/types"

// Определение функции "categoriesAction" для обработки действий с категориями
export const categoriesAction = async ({ request }: any) => {
    switch (request.method) {
        case "POST": {
            const formData = await request.formData()
            const title = {
                title: formData.get("title")
            }
            // Отправка POST-запроса для создания категории
            await instance.post("/categories", title)
            return null
        }
        
        case "PATCH": {
            const formData = await request.formData()
            const category = {
                id: formData.get("id"),
                title: formData.get("title"),    
            }
            // Отправка PATCH-запроса для обновления категории
            await instance.patch(`categories/category/${category.id}`, category)
            return null
        }

        case "DELETE": {
            const formData = await request.formData()
            const categoryId = formData.get("id")
            // Отправка DELETE-запроса для удаления категории
            await instance.delete(`/categories/category/${categoryId}`)
            return null
        }
    }
}

// Определение функции "categoryLoader" для загрузки данных о категориях
export const categoryLoader = async () => {
    // Отправка GET-запроса для получения списка категорий
    const { data } = await instance.get<ICategory>("/categories")
    return data
}

// Объявление компонента "Categories"
const Categories: FC = () => {
    // Загрузка данных о категориях с помощью "useLoaderData"
    const categories = useLoaderData() as ICategory[]
    // Состояние для идентификатора категории
    const [categoryId, setCategoryId] = useState<number>(0)
    // Состояние для режима редактирования
    const [isEdit, setIsEdit] = useState<boolean>(false)
    // Состояние видимости модального окна
    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    return (
        <>
            <div className="mt-10 p-4 rounded-md bg-slate-800">
                <h1>Your category list:</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {categories.map((category, idx) => (
                        <div key={idx} className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2">
                            {category.title}
                            <div className="absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
                                <button onClick={() => {
                                    setCategoryId(category.id)
                                    setVisibleModal(true)
                                    setIsEdit(true)
                                }}>
                                    <RiFileEditLine />
                                </button>

                                <Form className="flex" method="delete" action="/categories">
                                    <input type="hidden" name="id" value={category.id} />
                                    <button type="submit">
                                        <AiOutlineCloseCircle />
                                    </button>
                                </Form>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setVisibleModal(true)} className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white">
                    <RiAddFill />
                    <span>Create a new category</span>
                </button>
            </div>

            {visibleModal && (
                <CategoryModal type="post" setVisibleModal={setVisibleModal} />
            )}

            {visibleModal && isEdit && (
                <CategoryModal
                    type="patch"
                    id={categoryId}
                    setVisibleModal={setVisibleModal} />
            )}
        </>
    )
}

export default Categories
