/**
 * Утилиты для работы со счетами (версия с библиотекой number-to-words-ru)
 */

import pkg from "number-to-words-ru";
const { convert: convertNumberToWordsRu } = pkg;

/**
 * Преобразует число в сумму прописью на русском языке с правильными склонениями
 * @param {number} amount - Сумма в рублях
 * @returns {string} Сумма прописью
 */
export function numberToWords(amount) {
  if (amount === 0) {
    return "Ноль рублей";
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
 */
export function formatInvoiceDate(date) {
  const d = new Date(date);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} г.`;
}

/**
 * Форматирует цену с разделителями тысяч
 */
export function formatPrice(price) {
  return Number(price).toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Генерирует текущую дату в формате для счета
 */
export function getCurrentInvoiceDate() {
  return formatInvoiceDate(new Date());
}
