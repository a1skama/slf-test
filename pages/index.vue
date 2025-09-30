<template>
  <div class="flex flex-col">
    <div v-if="!showLoading" class="overflow-hidden content">
      <MainBlock v-if="data?.hero" :data="data.hero" />

      <KeyPractices v-if="data?.practices" :data="data.practices" />

      <NumbersComponent v-if="data?.numbers" :data="data.numbers" />

      <CasesBlock v-if="data?.cases" :data="data.cases" />
      <ServiceOrder />

      <InfoBlock v-if="data?.info" :data="data.info" />
      <OurTeam />

      <CertificatesBlock v-if="data?.documents" :data="data.documents" />

      <VideoSlider />

      <!-- <FormComponent
        v-if="data?.contacts"
        :practices="data.practices.practices"
        :contacts="data.contacts"
      /> -->
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
