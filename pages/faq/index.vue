<template>
  <div class="2xl:pt-[9.375rem] md:pt-[7.5rem] pt-[6.25rem] bg-gray-400 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]">
    <div class="_container">
      <NuxtLink
        to="/"
        class="flex gap-2 items-center text-blue-100 text-lg 2xl:text-[1.625rem] mb-5 md:mb-11 2xl:mb-[100px]"
      >
        <IconArrowThin />
        Главная
      </NuxtLink>
      <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-10">
        <div
          class="flex justify-between gap-5 flex-col xl:flex-row xl:items-center"
        >
          <h1
            class="fl-text-[1.625rem,5.125rem] leading-[120%] font-bold text-blue-100 uppercase"
          >
            отвечаем на ваши вопросы
          </h1>
        </div>
        <div class="flex flex-col">
          <FaqCard v-for="(item, i) in [1, 2, 3, 4, 5, 6]" :key="i" />
        </div>
        <button class="btn btn-main w-full md:w-[311px] mx-auto">смотреть еще</button>
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
