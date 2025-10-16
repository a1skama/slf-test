<template>
  <div
    ref="payFile"
    class="p-8 text-black bg-white shadow-md a4"
  >
    <div class="flex items-start justify-between mb-6">
      <IconLogoFile class="h-[50px] w-fit" />

      <div class="text-xs text-right text-black">
        <div>ИП Андрей Семин</div>
        <div>
          603022,г. Нижний Новгород, <br />
          ул. Оранжерейная 1-я, д. 44, кв. 10
        </div>

        <div>Телефон: 8 (800) 600 04 62</div>
      </div>
    </div>

    <section>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <tr class="border-t">
              <td class="p-2 text-sm">Получатель <br />ИНН 525714971677 ИП Семин А.С.</td>
              <td class="p-2 text-sm text-left whitespace-pre">Сч №</td>
              <td class="p-2 text-sm text-left">40802810071210001271</td>
            </tr>

            <tr class="border-t">
              <td class="p-2 text-sm">
                Банк получателя <br />Московский филиал АО КБ «Модульбанк» ИП Семин А.С.
              </td>
              <td class="p-2 text-sm text-left">БИК <br />Сч №</td>
              <td class="p-2 text-sm text-left">044525092 <br />30101810645250000092</td>
            </tr>
          </tbody>
        </table>
        <span class="block w-full mt-6 text-2xl font-bold text-black"> Условия для расчетов: </span>
        <p>1. Счет действителен в течение 5 (пяти) банковских дней.</p>
        <p>2. В назначении платежа, пожалуйста, указывайте номер счета.</p>

        <span class="block w-full mt-6 text-2xl font-bold text-center text-black">
          Счёт № {{ invoiceData.invoiceNumber }} от
          {{ invoiceData.invoiceDate }}
        </span>
        <span class="block w-full mt-6 text-2xl font-bold text-black"> Основание: </span>
        <span>Оферта/Условия оказания услуг</span>
        <table class="w-full mt-4 border-collapse">
          <tbody>
            <tr class="border-t">
              <td class="p-2 text-sm">№</td>
              <td class="p-2 text-sm text-left">Наименование товара, работы, услуги</td>
              <td class="p-2 text-sm text-left">Сумма, рубли РФ</td>
            </tr>

            <tr class="border-t">
              <td class="p-2 text-sm">1</td>
              <td class="p-2 text-sm text-left">
                {{ invoiceData.serviceName || 'Консультация управляющего партнера' }}
              </td>
              <td class="p-2 text-sm text-left">
                {{ formatPrice(invoiceData.servicePrice) }}
              </td>
            </tr>

            <tr class="border-t">
              <td class="!border-0"></td>
              <td class="p-2 text-sm text-end font-bold !border-0">Всего к оплате, рубли РФ</td>
              <td class="p-2 text-sm font-bold text-left">
                {{ formatPrice(invoiceData.servicePrice) }}
              </td>
            </tr>
          </tbody>
        </table>
        <span class="block pt-6 text-lg font-bold"
          >К оплате: {{ numberToWords(invoiceData.servicePrice) }}</span
        >
        <div class="flex justify-between mt-10 mb-20 text-sm text-black">
          <span>Предприниматель</span>
          <span>А.С. Семин</span>
        </div>
      </div>
    </section>

    <div class="pt-4 mt-4 text-sm text-gray-600 border-t">
      <p>
        Внимание! <br />
        Оплата данного счета означает согласие с условиями поставки товара.
      </p>
    </div>
  </div>
</template>

<style scoped>
  .a4 {
    width: 210mm;
    max-width: 100%;
    box-sizing: border-box;
  }

  table td {
    border: 1px solid #d1d5db;
  }

  @media print {
    body {
      background: white;
    }

    .a4 {
      box-shadow: none;
    }

    .a4 {
      page-break-inside: avoid;
    }
  }
</style>

<script setup>
  import { numberToWords, formatPrice } from '~/utils/invoiceUtilsWithLibraryNew';

  // Props для получения данных счета
  const props = defineProps({
    invoiceData: {
      type: Object,
    },
  });

  const payFile = ref(null);
  defineExpose({ payFile });
</script>
