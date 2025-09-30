<template>
    <div
        class="2xl:pt-[9.375rem] md:pt-[7.5rem] pt-[6.25rem] bg-gray-400 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]">
        <div class="_container">
            <NuxtLink to="/faq"
                class="flex gap-2 items-center text-blue-100 text-lg 2xl:text-[1.625rem] mb-5 md:mb-11 2xl:mb-[100px]">
                <IconArrowThin />
                Все вопросы
            </NuxtLink>
            <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-10">
                <h1
                    class="text-center fl-text-[1.5rem,4.25rem] leading-[120%] font-bold text-blue-100 uppercase pb-5 md:pb-6  xl:pb-[30px] 2xl:pb-10 border-b border-gray-100">
                    Как повышение госпошлин изменило таможенные споры?</h1>
                <div class="grid xl:grid-cols-[1fr_2fr_1fr] gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-8">
                    <div class="grid md:grid-cols-2 xl:grid-cols-1 gap-4 xl:gap-5">
                        <div class="bg-white p-5 2xl:p-[30px] flex flex-col gap-3 xl:gap-4 rounded-[20px]">
                            <span
                                class="border-b border-gray-100 pb-3 xl:pb-4 text-gray-500 text-sm 2xl:text-base">Подробнее</span>
                            <div class="flex justify-between gap-1 xl:flex-col 2xl:flex-row">
                                <span class="text-sm 2xl:text-base text-black">Дата:</span>
                                <span class="text-base 2xl:text-xl text-black">01 августа 2025</span>
                            </div>
                            <div class="flex justify-between gap-1 xl:flex-col 2xl:flex-row">
                                <span class="text-sm 2xl:text-base text-black">Категория:</span>
                                <span class="text-base 2xl:text-xl text-black">Аудит бизнес-процессов</span>
                            </div>
                        </div>
                        <div class="bg-white p-5 2xl:p-[30px] flex flex-col gap-3 xl:gap-4 rounded-[20px]">
                            <span
                                class="border-b border-gray-100 pb-3 xl:pb-4 text-gray-500 text-sm 2xl:text-base">Автор</span>
                            <div
                                class="flex gap-[10px] items-center xl:flex-col xl:items-start 2xl:flex-row 2xl:items-center">
                                <div class="bg-blue-100 h-[46px] w-[46px] rounded-full overflow-hidden">
                                    <img src="/images/avatar.png" alt="">
                                </div>
                                <div class="flex flex-col gap-1">
                                    <span class="text-base 2xl:text-xl text-black">Семин Андрей Сергеевич</span>
                                    <span class=" text-gray-500 text-sm 2xl:text-base">Управляющий партнер</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-[32px]">
                        <img src="/images/faq.jpg" alt="" class="w-full h-[350px] object-cover rounded-[20px]">
                        <p class="text-black text-lg 2xl:text-[1.625rem]">
                            Большинство юристов, работающих с судебными спорами, знают: с августа 2024 года в России
                            резко выросла государственная пошлина.

                            Это касается и подачи заявлений о признании незаконными решений государственных органов.
                            Теперь за каждое обжалуемое решение (действие или бездействие) нужно заплатить 50 000 рублей
                            вместо прежних 3 000 рублей.

                            Прошел почти год, и стало очевидно: нововведение особенно больно ударило по компаниям,
                            занимающимся внешнеэкономической деятельностью (ВЭД). Почему и как изменились таможенные
                            споры, а также какие варианты решения возникшей ситуации доступны — разбираем в статье.
                        </p>
                    </div>
                    <div class="flex flex-col gap-3 xl:gap-4">
                        <span
                            class="border-b border-gray-100 pb-3 xl:pb-4 text-gray-500 text-sm 2xl:text-base w-full">Приложенные
                            материалы:</span>
                        <div class="flex flex-wrap xl:flex-nowrap xl:flex-col gap-3 xl:gap-4">
                            <NuxtLink to="" class="flex gap-[10px] items-center cursor-pointer" v-for="(item, i) in [1, 2, 3]"
                                :key="i">
                                <div class="bg-blue-100 h-[46px] w-[46px] rounded-full overflow-hidden">
                                    <IconFileCircle />

                                </div>
                                <div class="flex flex-col gap-1">
                                    <span class="text-blue-300 text-sm 2xl:text-base">Документ 1</span>
                                    <span class="text-blue-400 text-xs 2xl:text-sm">[20 MB]</span>
                                </div>
                            </NuxtLink>
                        </div>

                    </div>
                </div>
                <button class="btn btn-main w-fit mx-auto">СМОТРЕТЬ СЛЕДУЮЩИЙ ВОПРОС</button>
            </div>
        </div>

    </div>
</template>
<script setup>
const config = useRuntimeConfig();
const { isOpen } = useModal();

// Используем useFetch для правильного состояния загрузки
const { data, pending, error } = await useFetch(
    `${config.public.strapi.url}/api/homepage`
);

// Состояние для плавного перехода
const showLoading = ref(true);

// Показываем LoadingComponent при первой загрузке
onMounted(() => {
    // Если данные уже загружены (SSR), показываем LoadingComponent на короткое время
    if (!pending.value && data.value) {
        setTimeout(() => {
            showLoading.value = false;
        }, 800); // 800ms для плавного перехода
    } else {
        // Если данные еще загружаются, ждем их
        watch(pending, (newPending) => {
            if (!newPending) {
                setTimeout(() => {
                    showLoading.value = false;
                }, 800);
            }
        });
    }
});

// Обработка ошибок
if (error.value) {
    console.error("Ошибка загрузки данных:", error.value);
}

useHead({
    title: "Юридическая фирма Андрея Сёмина | Таможня, Налоги, Арбитраж",
    meta: [
        {
            name: "description",
            content:
                "Юридическая фирма, специализирующаяся на таможенных вопросах, арбитражных спорах и налоговом праве. Более 15 лет успешной практики.",
        },
    ],
    script: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(98293834, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });`,
    noscript: `<div><img src="https://mc.yandex.ru/watch/98293834" style="position:absolute; left:-9999px;" alt="" /></div>`,
});
</script>
