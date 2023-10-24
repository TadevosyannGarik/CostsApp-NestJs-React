// Функция для форматирования даты из строки в формат "месяц день, год" (например, "Январь 1, 2023")
export const formatDate = (dateString: string): string => {
    // Создаем объект Date, используя переданную строку
    const date = new Date(dateString);
    // Опции форматирования даты, указывающие на вывод года, месяца и дня
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        // Полное название месяца (например, "Январь")
        month: "long",
        // День месяца (например, "1")
        day: "numeric",
    };
    // Преобразуем дату в строку в заданном формате, используя опции
    return date.toLocaleDateString("us-US", options);
}
