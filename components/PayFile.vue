<template>
  <div ref="payFile" class="a4 bg-white shadow-md p-8 text-black">
    <div class="flex items-start justify-between mb-6">
      <IconLogoFile class="h-[50px] w-fit" />

      <div class="text-right text-sm text-black">
        <div>ИП Андрей Семин </div>
        <div>603022,г. Нижний Новгород, ул. Оранжерейная 1-я, д. 44, кв. 10</div>

        <div>Телефон: 8 (800) 600 04 62</div>

      </div>
    </div>

    <span class="text-2xl text-center font-bold mb-10 text-black w-full block">
      Образец заполнения платежного поручения
    </span>

    <section>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>

            <tr class="border-t">
              <td class="p-2 text-sm"> Получатель <br>ИНН 525714971677
                ИП Семин А.С.</td>
              <td class="p-2 text-sm text-left">Сч №</td>
              <td class="p-2 text-sm text-left">40802810071210001271</td>
            </tr>

            <tr class="border-t">
              <td class="p-2 text-sm"> Банк получателя
                <br>Московский филиал АО КБ «Модульбанк»
                ИП Семин А.С.
              </td>
              <td class="p-2 text-sm text-left">БИК
                <br>Сч №
              </td>
              <td class="p-2 text-sm text-left">044525092 <br>30101810645250000092</td>
            </tr>
          </tbody>
        </table>
        <span class="text-2xl  font-bold mt-6 text-black w-full block">
          Условия для расчетов:
        </span>
        <p>1. Счет действителен в течение 5 (пяти) банковских дней.</p>
        <p>2. В назначении платежа, пожалуйста, указывайте номер счета.</p>

        <span class="text-2xl text-center font-bold mt-6 text-black w-full block">
          Счёт № С-00001 от 21 августа 2025 г.
        </span>
        <span class="text-2xl font-bold mt-6 text-black w-full block">
          Основание:
        </span>
        <span>Оферта/Условия оказания услуг</span>
        <table class="w-full border-collapse">
          <tbody>

            <tr class="border-t">
              <td class="p-2 text-sm">№</td>
              <td class="p-2 text-sm text-left">Наименование товара, работы, услуги</td>
              <td class="p-2 text-sm text-left">Сумма, рубли РФ</td>
            </tr>

            <tr class="border-t">
              <td class="p-2 text-sm"> 1
              </td>
              <td class="p-2 text-sm text-left">Консультация управляющего партнера
              </td>
              <td class="p-2 text-sm text-left">18 428,00</td>
            </tr>

            <tr class="border-t">
              <td class="!border-0"></td>
              <td class="p-2 text-sm text-end font-bold !border-0">Всего к оплате, рубли РФ
              </td>
              <td class="p-2 text-sm text-left font-bold">18 428,00</td>
            </tr>
          </tbody>
        </table>
        <span class="text-lg pt-6 block font-bold">К оплате: Восемнадцать тысяч четыреста двадцать восемь 00
          копеек</span>
        <div class="text-black flex justify-between text-sm mt-10 mb-20">
          <span>Предприниматель</span>
          <span>А.С. Семин</span>
        </div>
      </div>
    </section>

    <div class="mt-4 border-t pt-4 text-sm text-gray-600">
      <p>
        Внимание! <br>
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
const payFile = ref(null)
defineExpose({ payFile }) 
</script>
