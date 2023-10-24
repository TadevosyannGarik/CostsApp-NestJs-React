// Функция для извлечения токена из локального хранилища
export function getTokenFromLocalStorage(): string {
    // Извлекаем данные по ключу "token" из локального хранилища
    const data = localStorage.getItem("token")
    // Пытаемся распарсить полученные данные в строку, если данные существуют, иначе пустая строка
    const token: string = data ? JSON.parse(data): ""
    // Возвращаем токен
    return token
}

// Функция для сохранения токена в локальном хранилище
export function setTokenToLocalStorage(key: string, token:string): void {
    // Сохраняем токен в локальном хранилище по указанному ключу
    localStorage.setItem(key, JSON.stringify(token))
}

// Функция для удаления токена из локального хранилища
export function removeTokenFromLocalStorage(key: string): void {
    // Удаляем данные по указанному ключу из локального хранилища
    localStorage.removeItem(key)
}

