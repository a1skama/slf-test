<template>
  <div class="fixed top-0 left-0 w-full h-full z-[999] overflow-auto">
    <div class="relative flex flex-col items-center justify-center min-h-full md:p-10">
      <div
        class="absolute inset-0 z-20 cursor-pointer bg-white/20 backdrop-blur-2xl"
        @click="closeModal('pay')"
      ></div>

      <div
        class="relative bg-blue-100 p-5 xl:p-[30px] 2xl:p-10 z-30 w-full md:w-fit md:rounded-[20px] flex flex-col gap-5 xl:gap-[30px] xl:w-[800px] 2xl:w-[900px] m-auto"
      >
        <div class="flex items-center justify-between gap-8">
          <span
            class="text-white text-lg font-medium md:text-[1.625rem] xl:text-[2rem] 2xl:text-[2.875rem]"
          >
            Оплата тарифного плана
          </span>

          <div
            class="flex justify-center items-center rounded-full border border-blue-400 h-11 w-11 2xl:h-[54px] 2xl:w-[54px] cursor-pointer shrink-0"
            @click="closeModal('pay')"
          >
            <IconCross class="w-5 h-5 text-white" />
          </div>
        </div>

        <div v-show="!isSubmitSuccess && !isSubmitError">
          <div
            class="inset-0 bg-white/20 backdrop-blur-2xl p-4 md:p-5 2xl:p-[30px] rounded-[20px] flex md:items-center gap-5"
          >
            <div class="flex items-center justify-center w-10 h-10 bg-white rounded-full shrink-0">
              <img
                v-if="serviceData?.icon"
                :src="serviceData?.icon?.url"
                :width="serviceData?.icon?.width"
                :height="serviceData?.icon?.height"
                :alt="serviceData?.title"
                class="object-cover w-5 h-5"
              />
            </div>

            <div class="flex flex-col justify-between w-full gap-4 md:flex-row md:items-center">
              <span class="text-white font-medium text-lg 2xl:text-[1.625rem]">
                {{ serviceData?.title }}
              </span>

              <span
                v-if="serviceData?.price"
                class="text-white font-medium text-lg 2xl:text-[1.625rem]"
              >
                {{ formatPrice(serviceData?.price) }} ₽
              </span>
            </div>
          </div>

          <form
            ref="formElement"
            class="grid grid-cols-1 xl:grid-cols-2 gap-[30px] items-end mt-8"
            autocomplete="off"
            novalidate
            @submit.prevent="onSubmitForm"
          >
            <BaseInput
              v-model="form.name"
              :errors="v$.name.$errors"
              type="text"
              required
              placeholder="Имя*"
              class="w-full h-full"
            />

            <BaseInput
              v-model="form.phone"
              :errors="v$.phone.$errors"
              type="tel"
              required
              maska="+7 (###) ###-##-##"
              placeholder="Телефон*"
              class="w-full h-full"
            />

            <BaseInput
              v-model="form.email"
              :errors="v$.email.$errors"
              type="email"
              label="Почта"
              placeholder="E-mail"
              class="w-full h-full"
            />

            <Listbox
              v-if="experts && experts.length > 0"
              v-model="selectedExpert"
            >
              <div class="relative z-50">
                <ListboxButton
                  class="bg-transparent border-b h-[54px] text-sm 2xl:text-base border-blue-400 hover:border-white text-white w-full duration-500 cursor-pointer transition-colors"
                >
                  <span class="block truncate text-start">{{
                    selectedExpert || 'Выберите специалиста'
                  }}</span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#00113A] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="(expert, expertId) in experts"
                      :key="expertId"
                      :value="expert"
                      as="template"
                    >
                      <li
                        :class="[
                          active ? 'bg-blue-500 text-white' : 'text-white',
                          'relative cursor-pointer select-none py-2 pl-4 pr-4 transition-colors duration-200 hover:bg-blue-500',
                        ]"
                      >
                        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                          {{ expert }}
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>

            <div
              class="relative w-full"
              :class="{ 'xl:col-span-2': experts && experts.length > 0 }"
            >
              <BaseInput
                type="text"
                v-model="form.date"
                :errors="v$.date.$errors"
                label="Дата"
                required
                placeholder="Выберите дату и время*"
                class="w-full h-full cursor-pointer xl:col-span-2"
                readonly
                @click="openDatePicker"
              >
                <template #icon>
                  <IconCalendar class="absolute top-0 right-0 w-5 h-full text-white" />
                </template>
              </BaseInput>

              <div
                v-if="dateOpen"
                class="absolute z-50 flex flex-col gap-3 w-full bg-[#00113A] text-white p-5 cursor-pointer"
                ref="datePickerRef"
              >
                <span class="block w-full text-sm text-center text-white uppercase">
                  Выберите дату и время
                </span>

                <!-- Даты -->
                <div class="flex items-center gap-1">
                  <div
                    class="flex items-center justify-center bg-white cursor-pointer dateSwiperPrev h-7 w-7"
                  >
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.75 11.5L1.25 6L6.75 0.5"
                        stroke="#1F1F1F"
                      />
                    </svg>
                  </div>
                  <swiper
                    :slidesPerView="4"
                    :spaceBetween="0"
                    :navigation="{
                      nextEl: '.dateSwiperNext',
                      prevEl: '.dateSwiperPrev',
                    }"
                    :modules="modules"
                    class="w-full dateSwiper"
                  >
                    <swiper-slide
                      v-for="(day, i) in dates"
                      :key="i"
                      @click="selectedDate = day.date"
                      :class="[
                        'text-xs whitespace-nowrap transition-all duration-200 cursor-pointer !flex justify-center items-center text-white !h-7',
                        selectedDate === day.date
                          ? ' bg-blue-200 border border-blue-200'
                          : ' bg-transparent border border-white',
                      ]"
                    >
                      <span>
                        {{ day.label }}
                      </span>
                    </swiper-slide>
                  </swiper>
                  <div
                    class="flex items-center justify-center bg-white cursor-pointer dateSwiperNext h-7 w-7"
                  >
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.25 0.5L6.75 6L1.25 11.5"
                        stroke="#1F1F1F"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Время -->
                <div class="grid grid-cols-4 gap-[10px] max-h-[100px] overflow-auto">
                  <button
                    v-for="(time, i) in times"
                    :key="i"
                    type="button"
                    :class="[
                      'text-xs whitespace-nowrap transition-all duration-200 cursor-pointer !flex justify-center items-center text-white rounded-[8px] h-7 border border-white',
                      selectedTime === time ? 'bg-blue-200 border border-blue-200' : '',
                    ]"
                    @click="selectDateTime(time)"
                  >
                    {{ time }}
                  </button>
                </div>

                <button
                  class="btn btn-white h-11"
                  @click="applyDateTime"
                >
                  Применить
                </button>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-5 col-span-full">
              <div
                v-if="form.files.length > 0"
                class="flex flex-wrap items-center gap-5"
              >
                <div
                  v-for="(file, fileId) in form.files"
                  :key="fileId"
                  class="flex items-center gap-2.5 cursor-pointer"
                  @click="resetFile(fileId)"
                >
                  <IconCrossCircle class="w-[54px] h-[54px] flex-shrink-0" />

                  <div class="flex flex-col gap-1">
                    <span class="text-sm text-blue-300 2xl:text-base">
                      {{ file.name }}
                    </span>

                    <span class="text-sm text-blue-400 2xl:text-base">
                      [{{ Math.round((file.size / 1000000) * 100) / 100 }} MB]
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="flex items-center gap-2.5"
                @click="open"
              >
                <div class="h-11 w-11 bg-blue-500 2xl:w-[54px] 2xl:h-[54px] rounded-full">
                  <IconFileCircle class="flex-shrink-0 w-full h-auto" />
                </div>

                <div class="flex flex-col items-start">
                  <span class="text-sm text-blue-300 2xl:text-base"> Подгрузить документ </span>

                  <span class="text-sm text-blue-400 2xl:text-base"> Не более [20 MB] </span>
                </div>
              </button>
            </div>

            <label class="flex justify-center gap-2 text-sm 2xl:text-base xl:col-span-2">
              <div class="relative w-5 h-5">
                <input
                  type="checkbox"
                  class="h-5 w-5 cursor-pointer appearance-none border border-[#68768F] hover:border-[#A3B8D0] transition-colors duration-500 checked:border-white peer"
                  v-model="form.privacy"
                />

                <IconCheck
                  class="absolute hidden -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 peer-checked:block w-4 h-2.5"
                />
              </div>

              <span class="text-white">
                Я согласен на обработку
                <NuxtLink
                  to=""
                  target="_blank"
                  class="text-blue-300"
                >
                  Персональных данных.
                </NuxtLink></span
              >
            </label>

            <div class="flex justify-center w-full xl:col-span-2">
              <button
                type="submit"
                class="btn btn-white xl:max-w-[436px] w-full"
                :disabled="!form.privacy"
              >
                Оплатить
                <span v-if="serviceData?.price"> {{ formatPrice(serviceData.price) }} ₽ </span>
              </button>
            </div>
          </form>
        </div>

        <div
          class="flex flex-col items-center gap-4"
          v-show="isSubmitSuccess"
        >
          <div class="flex items-center justify-center w-10 h-10 bg-white rounded-full shrink-0">
            <IconQR class="w-5 h-5 text-black" />
          </div>

          <div class="flex flex-col items-center gap-[6px]">
            <span class="text-white text-lg 2xl:text-[1.625rem] font-medium">
              Оплата по QR-коду
            </span>

            <span class="text-sm text-gray-300">
              Пожалуйста, отсканируйте QR-код в приложении вашего банка
            </span>
          </div>
          <IconCode />

          <div class="flex items-center w-full gap-4">
            <div class="bg-blue-400 w-full h-[1px]"></div>

            <span class="text-sm text-white uppercase">или </span>

            <div class="bg-blue-400 w-full h-[1px]"></div>
          </div>

          <button
            class="btn btn-white"
            @click="generatePdf"
          >
            <IconArrow /> выставить счет
          </button>
        </div>
      </div>
    </div>

    <div class="hidden">
      <PayFile
        ref="payFileComponent"
        :invoiceData="invoiceData"
      />
    </div>
  </div>
</template>
<script setup>
  import { useVuelidate } from '@vuelidate/core';
  import { required, minLength, email } from '@vuelidate/validators';
  import { useFileDialog } from '@vueuse/core';
  import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

  const { closeModal, getModalData } = useModal();

  const serviceData = computed(() => getModalData('pay'));

  const formatPrice = (price) => {
    return Number(price).toLocaleString('ru-RU');
  };

  // Список специалистов из данных услуги
  const experts = computed(() => {
    if (!serviceData.value?.experts || !Array.isArray(serviceData.value.experts)) {
      return [];
    }

    return serviceData.value.experts;
  });

  const selectedExpert = ref(null);

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import { Navigation } from 'swiper/modules';
  const modules = [Navigation];
  import PayFile from '~/components/PayFile.vue';
  import { onClickOutside } from '@vueuse/core';
  import { getCurrentInvoiceDate } from '~/utils/invoiceUtilsWithLibraryNew';

  let html2pdf;
  onMounted(async () => {
    html2pdf = (await import('html2pdf.js')).default;
  });

  const payFileComponent = ref(null);

  // Данные для счета
  const invoiceData = ref({
    invoiceNumber: 'С-00001',
    invoiceDate: getCurrentInvoiceDate(),
    serviceName: '',
    servicePrice: 0,
    clientName: '',
    expertName: '',
  });

  const generatePdf = async () => {
    try {
      // Получаем следующий номер счета
      const { data: invoiceNumberData } = await useFetch('/api/get-invoice-number');

      if (invoiceNumberData.value?.success) {
        // Обновляем данные счета
        invoiceData.value.invoiceNumber = invoiceNumberData.value.data.formattedNumber;
        invoiceData.value.invoiceDate = getCurrentInvoiceDate();
        invoiceData.value.serviceName = serviceData.value?.title || '';
        invoiceData.value.servicePrice = serviceData.value?.price || 0;
        invoiceData.value.clientName = form.name || '';
        invoiceData.value.expertName = selectedExpert.value || '';
      }

      const element = payFileComponent.value?.payFile;
      if (!element || !html2pdf) return;

      const opt = {
        margin: 0,
        filename: `invoice-${invoiceData.value.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // одна генерация — получаем blob
      const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');

      const pdfUrl = URL.createObjectURL(pdfBlob);

      // инициируем скачивание
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `invoice-${invoiceData.value.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // и/или открываем в новой вкладке
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Ошибка при генерации PDF:', error);
      // Fallback: генерируем PDF без обновления номера
      const element = payFileComponent.value?.payFile;
      if (!element || !html2pdf) return;

      const opt = {
        margin: 0,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'invoice.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.open(pdfUrl, '_blank');
    }
  };

  const dateOpen = ref(false);
  const selectedDate = ref(null);
  const selectedTime = ref(null);
  const datePickerRef = ref(null);

  const WEEK_DAYS_RU = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  function generateDates(days = 8) {
    const result = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const weekday = WEEK_DAYS_RU[d.getDay()];
      result.push({
        date: d.toISOString().split('T')[0],
        label: `${day}.${month}, ${weekday}`,
      });
    }
    return result;
  }

  const dates = generateDates(8);

  const times = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];

  // --- Открытие и автоматическая подстановка первой даты/времени ---
  function openDatePicker() {
    dateOpen.value = true;
    if (!selectedDate.value) selectedDate.value = dates[0].date;
    if (!selectedTime.value) selectedTime.value = times[0];
  }

  // --- Выбор времени ---
  function selectDateTime(time) {
    selectedTime.value = time;
  }

  // --- Применение выбора ---
  function applyDateTime() {
    if (selectedDate.value && selectedTime.value) {
      form.date = `${selectedDate.value} ${selectedTime.value}`;
      dateOpen.value = false;
    }
  }

  // --- Клик вне блока для закрытия ---
  onClickOutside(datePickerRef, () => {
    dateOpen.value = false;
  });

  const props = defineProps({
    modal: {
      type: Boolean,
      default: false,
    },
    contacts: {
      type: Object,
      required: true,
    },
  });

  const form = reactive({
    name: '',
    phone: '',
    email: '',
    date: '',
    privacy: false,
    files: [],
  });

  const rules = {
    name: { required },
    phone: { required, minLength: minLength(18) },
    email: { email },
    date: { required },
  };

  const v$ = useVuelidate(rules, form);

  const isSubmit = ref(false);
  const isSubmitSuccess = ref(false);
  const isSubmitError = ref(false);

  const { open, onChange } = useFileDialog({});

  const filesArray = ref([]);

  onChange((files) => {
    filesArray.value = Array.from(files);

    for (let i = 0; i < filesArray.value.length; i++) {
      const file = filesArray.value[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        form.files.push({
          name: file.name,
          size: file.size,
          content: e.target.result.split(',')[1], // берем только base64 часть
        });
      };

      reader.readAsDataURL(file);
    }
  });

  const resetFile = (fileId) => {
    filesArray.value.splice(fileId, 1);
    form.files.splice(fileId, 1);
  };

  const onSubmitForm = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    isSubmit.value = true;

    const { data } = await useFetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        date: form.date,
        service: serviceData.value?.title || '',
        expert: selectedExpert.value || '',
        price: serviceData.value?.price || 0,
        files: form.files,
        invoiceNumber: invoiceData.value.invoiceNumber || '',
      },
    });

    if (data.value.status === 'success') {
      isSubmitSuccess.value = true;
    } else if (data.value.status === 'error') {
      isSubmitError.value = true;
    }

    form.name = '';
    form.phone = '';
    form.email = '';
    form.privacy = false;
    form.files = [];
    selectedExpert.value = null;

    v$.value.$reset();

    isSubmit.value = false;
  };
</script>
