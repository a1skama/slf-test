/**
 * Утилиты для работы со счетами (версия с библиотекой number-to-words-ru)
 */

import { convert as convertNumberToWordsRu } from "number-to-words-ru";

/**
 * Преобразует число в сумму прописью на русском языке с правильными склонениями
 * @param {number} amount - Сумма в рублях
 * @returns {string} Сумма прописью
 */
export function numberToWords(amount) {
  if (amount === 0) {
    return "ноль рублей";
  }

  try {
    const options = {
      currency: "rub",
      convertNumberToWords: {
        integer: true,
        fractional: true,
      },
    };

    const result = convertNumberToWordsRu(amount, options);

    // Убираем лишние пробелы и приводим к правильному формату
    return result.trim().charAt(0).toUpperCase() + result.trim().slice(1);
  } catch (error) {
    console.error("Ошибка при преобразовании числа в слова:", error);
    // Fallback к простому формату
    return `${amount.toFixed(2)} рублей`;
  }
}

/**
 * Форматирует дату в нужном формате для счета
 * @param {Date|string} date - Дата
 * @returns {string} Отформатированная дата
 */
export function formatInvoiceDate(date) {
  const d = new Date(date);

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year} г.`;
}

/**
 * Форматирует цену с разделителями тысяч
 * @param {number} price - Цена
 * @returns {string} Отформатированная цена
 */
export function formatPrice(price) {
  return Number(price).toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Генерирует текущую дату в формате для счета
 * @returns {string} Текущая дата
 */
export function getCurrentInvoiceDate() {
  return formatInvoiceDate(new Date());
}
