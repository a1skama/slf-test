<template>
  <div class="flex flex-col">
    <div
      v-if="!showLoading"
      class="overflow-hidden content"
    >
      <MainBlock
        v-if="data?.hero"
        :data="data.hero"
      />

      <KeyPractices
        v-if="data?.practices"
        :data="data.practices"
      />

      <NumbersComponent
        v-if="data?.numbers"
        :data="data.numbers"
      />

      <CasesBlock
        v-if="data?.cases"
        :data="data.cases"
      />

      <ServiceOrder
        v-if="data?.services"
        :data="data.services"
      />

      <InfoBlock
        v-if="data?.info"
        :data="data.info"
      />

      <OurTeam
        v-if="data?.team"
        :data="data.team"
      />

      <CertificatesBlock
        v-if="data?.documents"
        :data="data.documents"
      />

      <VideoSlider
        v-if="data?.videos"
        :data="data.videos"
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
