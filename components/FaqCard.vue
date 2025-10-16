<template>
  <div
    class="grid xl:grid-cols-[1fr_2fr_1fr] gap-5 py-5 sm:py-6 xl:py-8 2xl:py-10 border-b border-gray-100 first:border-t"
  >
    <div class="flex gap-1 xl:flex-col">
      <span class="text-black font-bold text-[2rem] leading-[100%]">{{ dayText }}</span>

      <span class="text-sm text-blue-400 leading-[100%]"
        >{{ formattedDate.line1 }} <br />{{ formattedDate.line2 }}</span
      >

      <span
        class="xl:hidden ml-5 text-sm 2xl:text-base text-black border border-gray-200 rounded-[10px] h-[34px] 2xl:h-[36px] px-5 w-fit flex items-center justify-center uppercase"
      >
        {{ category || '—' }}
      </span>
    </div>

    <div class="flex flex-col gap-5">
      <span
        class="hidden xl:flex text-sm 2xl:text-base text-black border border-gray-200 rounded-[10px] h-[34px] 2xl:h-[36px] px-5 w-fit items-center justify-center uppercase"
      >
        {{ category }}
      </span>

      <span
        class="text-black text-xl md:text-[1.625rem] xl:text-[2rem] 2xl:text-[2.875rem] font-medium !leading-none"
      >
        {{ title }}
      </span>
    </div>

    <NuxtLink
      :to="`/faq/${slug}`"
      class="xl:ml-auto btn btn-blue h-11 2xl:h-[54px] w-fit"
    >
      <IconArrow /> Ответ
    </NuxtLink>
  </div>
</template>
<script setup>
  const props = defineProps({
    index: { type: Number, default: 1 },
    date: { type: String, default: '' },
    category: { type: String, default: '' },
    categorySlug: { type: String, default: '' },
    title: { type: String, default: '' },
    slug: { type: String, default: '' },
  });

  // Форматируем дату через VueUse с русской локалью (исправляет смещения таймзоны)
  const dateValue = computed(() => (props.date ? new Date(props.date + 'T00:00:00') : null));
  const dayText = useDateFormat(dateValue, 'DD', { locales: 'ru-RU' });
  const monthText = useDateFormat(dateValue, 'MMMM', { locales: 'ru-RU' });
  const yearText = useDateFormat(dateValue, 'YYYY', { locales: 'ru-RU' });
  const formattedDate = computed(() => ({
    line1: monthText.value || '',
    line2: yearText.value || '',
  }));
</script>
