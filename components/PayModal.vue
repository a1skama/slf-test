<template>
    <div class="fixed top-0 left-0 w-full h-full z-[999] md:p-10 overflow-scroll flex">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-2xl z-20 cursor-pointer w-full h-full"
            @click="closeModal('pay')">
        </div>

        <div
            class="bg-blue-100 p-5 xl:p-[30px] 2xl:p-10 z-30 w-full md:w-fit md:rounded-[20px] flex flex-col gap-5 xl:gap-[30px] xl:w-[800px] 2xl:w-[900px] overflow-auto max-h-fit m-auto">
            <div class="flex items-center justify-between gap-8">
                <span
                    class="text-white text-lg font-medium md:text-[1.625rem] xl:text-[2rem] 2xl:text-[2.875rem]">Оплата
                    тарифного плана</span>
                <div class="flex justify-center items-center rounded-full border border-blue-400 h-11 w-11 2xl:h-[54px] 2xl:w-[54px] cursor-pointer shrink-0"
                    @click="closeModal('pay')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10L15 15M10 10L5 5M10 10L5 15M10 10L15 5" stroke="white" stroke-width="1.7"
                            stroke-linecap="round" />
                    </svg>

                </div>
            </div>

            <div class="" v-show="!isSubmitSuccess && !isSubmitError">
                <div
                    class="inset-0 bg-white/20 backdrop-blur-2xl p-4 md:p-5 2xl:p-[30px] rounded-[20px] flex md:items-center gap-5">
                    <div class="bg-white h-10 w-10 rounded-full flex items-center justify-center shrink-0"></div>
                    <div class="flex flex-col gap-4 md:flex-row md:items-center justify-between w-full">
                        <span class="text-white font-medium text-lg 2xl:text-[1.625rem]">Консультация
                            управляющего
                            партнера</span>
                        <span class="text-white font-medium text-lg 2xl:text-[1.625rem]">18 428 ₽</span>
                    </div>


                </div>
                <form ref="formElement" class="grid grid-cols-1 xl:grid-cols-2 gap-[30px] items-end mt-8"
                    autocomplete="off" novalidate @submit.prevent="onSubmitForm">
                    <BaseInput v-model="form.name" :errors="v$.name.$errors" type="text" required placeholder="Имя*"
                        class="w-full h-full" />

                    <BaseInput v-model="form.phone" :errors="v$.phone.$errors" type="tel" required
                        maska="+7 (###) ###-##-##" placeholder="Телефон*" class="w-full h-full" />

                    <BaseInput v-model="form.email" :errors="v$.email.$errors" type="email" label="Почта"
                        placeholder="E-mail" class="w-full h-full" />

                    <!-- <BaseInput type="text"  v-model="form.date" :errors="v$.date.$errors" label="Дата"
                        required placeholder="Выберите дату и время*"class="w-full h-full"/> -->
                    <div class="relative w-full">
                        <BaseInput type="text" v-model="form.date" :errors="v$.date.$errors" label="Дата" required
                            placeholder="Выберите дату и время*" class="w-full h-full cursor-pointer" readonly
                            @click="openDatePicker" />

                        <div v-if="dateOpen"
                            class="absolute z-50  flex flex-col gap-3 w-full bg-[#00113A] text-white p-5"
                            ref="datePickerRef">
                            <span class="text-sm uppercase text-center text-white w-full block">
                                ВЫБЕРИТЕ ДАТУ И ВРЕМЯ
                            </span>

                            <!-- Даты -->
                            <div class="flex items-center gap-1">
                                <div
                                    class="dateSwiperPrev h-7 w-7 bg-white flex items-center justify-center cursor-pointer">
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.75 11.5L1.25 6L6.75 0.5" stroke="#1F1F1F" />
                                    </svg>
                                </div>
                                <swiper :slidesPerView="4" :spaceBetween="0" :navigation="{
                                    nextEl: '.dateSwiperNext',
                                    prevEl: '.dateSwiperPrev',
                                }" :modules="modules" class="dateSwiper w-full">
                                    <swiper-slide v-for="(day, i) in dates" :key="i" @click="selectedDate = day.date"
                                        :class="[
                                            'text-xs whitespace-nowrap transition-all duration-200 cursor-pointer !flex justify-center items-center text-white !h-7',
                                            selectedDate === day.date
                                                ? ' bg-blue-200 border border-blue-200'
                                                : ' bg-transparent border border-white',
                                        ]">
                                        <span>
                                            {{ day.label }}

                                        </span>
                                    </swiper-slide>

                                </swiper>
                                <div
                                    class=" dateSwiperNext h-7 w-7 bg-white flex items-center justify-center cursor-pointer">
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.25 0.5L6.75 6L1.25 11.5" stroke="#1F1F1F" />
                                    </svg>

                                </div>
                            </div>

                            <!-- Время -->
                            <div class="grid grid-cols-4 gap-[10px] max-h-[100px] overflow-auto">
                                <button v-for="(time, i) in times" :key="i" @click="selectDateTime(time)" :class="[
                                    'text-xs whitespace-nowrap transition-all duration-200 cursor-pointer !flex justify-center items-center text-white rounded-[8px] h-7 border border-white',
                                    selectedTime === time ? 'bg-blue-200 border border-blue-200' : '',
                                ]">
                                    {{ time }}
                                </button>
                            </div>

                            <button class="btn btn-white h-11" @click="applyDateTime">
                                ПРИМЕНИТЬ
                            </button>
                        </div>
                    </div>


                    <div class="flex flex-wrap items-center justify-center gap-5 col-span-full">
                        <div v-if="form.files" class="flex flex-wrap items-center gap-5">
                            <div v-for="(file, fileId) in form.files" class="flex items-center gap-2.5 cursor-pointer"
                                @click="resetFile">
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

                        <button type="button" class="flex items-center gap-2.5" @click="open">
                            <div class="h-11 w-11 bg-blue-500 2xl:w-[54px] 2xl:h-[54px] rounded-full">
                                <IconFileCircle class="flex-shrink-0 w-full h-auto" />
                            </div>

                            <div class="flex flex-col items-start">
                                <span class="text-sm text-blue-300 2xl:text-base">
                                    Подгрузить документ
                                </span>

                                <span class="text-sm text-blue-400 2xl:text-base">
                                    Не более [20 MB]
                                </span>
                            </div>
                        </button>
                    </div>

                    <label class="flex  justify-center gap-2 text-sm 2xl:text-base xl:col-span-2">
                        <div class="relative w-5 h-5">
                            <input type="checkbox"
                                class="h-5 w-5 cursor-pointer appearance-none border border-[#68768F] hover:border-[#A3B8D0] transition-colors duration-500 checked:border-white peer"
                                v-model="form.privacy" />

                            <IconCheck
                                class="absolute hidden -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 peer-checked:block w-4 h-2.5" />
                        </div>

                        <span class="text-white"> Я согласен на обработку  <NuxtLink to="" target="_blank" class="text-blue-300">
                            Персональных данных.
                        </NuxtLink></span>

                       
                    </label>

                    <div class="flex justify-center w-full xl:col-span-2">
                        <button type="submit" class="btn btn-white xl:max-w-[436px] w-full" :disabled="!form.privacy">
                            Отправить
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex flex-col items-center gap-4 " v-show="isSubmitSuccess">
                <div class="bg-white h-10 w-10 rounded-full flex items-center justify-center shrink-0"></div>
                <div class="flex flex-col items-center gap-[6px]">
                    <span class="text-white text-lg 2xl:text-[1.625rem] font-medium">Оплата по QR-коду</span>
                    <span class="text-gray-300 text-sm">Пожалуйста, отсканируйте QR-код в приложении вашего банка</span>
                </div>
                <IconCode />

                <div class="flex items-center w-full gap-4">
                    <div class="bg-blue-400 w-full h-[1px]"></div>
                    <span class="text-white uppercase text-sm">или </span>
                    <div class="bg-blue-400 w-full h-[1px]"></div>


                </div>
                <button class="btn btn-white" @click="generatePdf">
                    <IconArrow /> выставить счет
                </button>
            </div>
        </div>


        <div class="hidden">
            <PayFile ref="payFileComponent" />
        </div>


    </div>
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import { useFileDialog } from "@vueuse/core";
const { closeModal } = useModal();

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const modules = [Navigation];
import { ref, onMounted } from 'vue';
import PayFile from '~/components/PayFile.vue';
import { reactive, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

let html2pdf
onMounted(async () => {
    html2pdf = (await import('html2pdf.js')).default
})

const payFileComponent = ref(null)

const generatePdf = async () => {
    const element = payFileComponent.value?.payFile
    if (!element || !html2pdf) return

    const opt = {
        margin: 0.5,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save()
    const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
}


const dateOpen = ref(false);
const selectedDate = ref(null);
const selectedTime = ref(null);
const datePickerRef = ref(null);

const dates = [
    { date: "2025-09-21", label: "21.09, ПН" },
    { date: "2025-09-22", label: "22.09, ВТ" },
    { date: "2025-09-23", label: "23.09, СР" },
    { date: "2025-09-24", label: "24.09, ЧТ" },
    { date: "2025-09-25", label: "25.09, ПН" },
    { date: "2025-09-26", label: "26.09, ВТ" },
    { date: "2025-09-27", label: "27.09, СР" },
    { date: "2025-09-28", label: "28.09, ЧТ" },
];

const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
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
    practices: {
        type: Array,
        default: [],
    },
    contacts: {
        type: Object,
        required: true,
    },
});

const form = reactive({
    name: "",
    phone: "",
    email: "",
    comment: "",
    date: "",
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

const { data } = await useFetch("/api/send-email", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        files: form.files,
    },
});

const isSubmit = ref(false);
const isSubmitSuccess = ref(false);
const isSubmitError = ref(false);




const { activePracticeId } = usePractices();

const practics = ref([
    { id: 0, value: "Практика не выбрана", label: "Выберите практику" },
]);

props.practices.forEach((practic, practicId) => {
    practics.value.push({
        id: practicId + 1,
        value: practic.title,
        label: practic.title,
    });
});

watch(props.practices, (newPractices) => {
    newPractices.forEach((practic, practicId) => {
        practics.value.push({
            id: practicId + 1,
            value: practic.title,
            label: practic.title,
        });
    });
});

const activePractic = ref(practics.value[activePracticeId.value]);

const { files, open, reset, onChange } = useFileDialog({});

const filesArray = ref([]);

const previewFiles = (event) => {
    form.files = files;
};

onChange((files) => {
    filesArray.value = Array.from(files);

    for (let i = 0; i < filesArray.value.length; i++) {
        const file = filesArray.value[i];
        const reader = new FileReader();

        reader.onload = (e) => {
            form.files.push({
                name: file.name,
                size: file.size,
                content: e.target.result.split(",")[1], // берем только base64 часть
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

    const { data } = await useFetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            comment: form.comment,
            practic: activePractic.value.value,
            files: form.files,
        },
    });

    if (data.value.status === "success") {
        isSubmitSuccess.value = true;
    } else if (data.value.status === "error") {
        isSubmitError.value = true;
    }

    form.name = "";
    form.phone = "";
    form.email = "";
    form.comment = "";
    activePractic.value = practics.value[0];
    form.privacy = false;
    form.files = [];

    v$.value.$reset();

    isSubmit.value = false;
};
</script>
