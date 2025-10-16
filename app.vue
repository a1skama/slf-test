<template>
  <div class="flex flex-col">
    <!-- <LoadingComponent :is-loading="showLoading" /> -->

    <div
      v-if="!showLoading"
      class="overflow-hidden content"
    >
      <HeaderComponent
        v-if="data?.contacts"
        :contacts="data.contacts"
      />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <FormComponent
        v-if="data?.contacts"
        :practices="data.practices.practices"
        :contacts="data.contacts"
      />
      <FooterComponent
        v-if="data?.contacts"
        :data="data.contacts"
      />

      <CookiesComponent :contacts="data?.contacts" />

      <BackToTopButton />

      <FormModal
        v-if="isOpen('form')"
        :data="data?.practices"
        :contacts="data?.contacts"
      />
    </div>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();
  const { isOpen } = useModal();

  // Используем useFetch для правильного состояния загрузки
  const { data, pending, error } = await useFetch(`${config.public.strapi.url}/api/homepage`);

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
    console.error('Ошибка загрузки данных:', error.value);
  }

  useHead({
    title: 'Юридическая фирма Андрея Сёмина | Таможня, Налоги, Арбитраж',
    meta: [
      {
        name: 'description',
        content:
          'Юридическая фирма, специализирующаяся на таможенных вопросах, арбитражных спорах и налоговом праве. Более 15 лет успешной практики.',
      },
    ],
  });
</script>
