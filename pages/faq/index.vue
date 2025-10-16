<template>
  <div
    class="2xl:pt-[9.375rem] md:pt-[7.5rem] pt-[6.25rem] bg-gray-400 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
  >
    <div class="_container">
      <NuxtLink
        to="/"
        class="flex gap-2 items-center text-blue-100 text-lg 2xl:text-[1.625rem] mb-5 md:mb-11 2xl:mb-[100px]"
      >
        <IconArrowThin />

        Главная
      </NuxtLink>

      <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-10">
        <div class="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <h1 class="fl-text-[1.625rem,5.125rem] leading-[120%] font-bold text-blue-100 uppercase">
            Отвечаем на ваши вопросы
          </h1>

          <div class="w-full sm:max-w-[240px] flex-shrink-0">
            <Listbox
              v-model="selectedCategory"
              v-slot="{ open }"
            >
              <div class="relative z-50">
                <ListboxButton
                  class="bg-transparent border-b h-[54px] text-sm 2xl:text-base border-blue-400 hover:border-blue-100 text-blue-100 w-full duration-500 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <span class="block truncate text-start">{{
                    selectedCategory ? selectedCategory?.label : 'Выберите категорию'
                  }}</span>

                  <IconArrowThin
                    class="flex-shrink-0 w-5 h-5 text-blue-100 transition-all duration-300 -rotate-90"
                    :class="{ 'rotate-90': open }"
                  />
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
                      v-for="cat in categories"
                      :key="cat.slug"
                      :value="cat"
                      as="template"
                      class="text-white transition-colors duration-500 hover:text-blue-300"
                    >
                      <li
                        :class="[
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 px-4',
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                          >{{ cat.label }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                        ></span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div class="flex flex-col">
          <FaqCard
            v-for="(item, i) in visibleItems"
            :key="item.slug || i"
            :index="i + 1"
            :date="item.date"
            :category="item.category?.title"
            :category-slug="item.category?.slug"
            :title="item.title"
            :slug="item.slug"
          />
        </div>

        <button
          v-if="hasMore"
          @click="loadMore"
          class="btn btn-main w-full md:w-[311px] mx-auto"
        >
          смотреть еще
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

  const config = useRuntimeConfig();

  const PAGE_SIZE = 8;

  const route = useRoute();
  const router = useRouter();
  const initialPage = Number(route.query.page) || 1;

  const currentPage = ref(initialPage);
  const allItems = ref([]);

  const categories = ref([{ label: 'Все категории', slug: null }]);
  const selectedCategory = ref(null);

  const { data, pending, error } = await useFetch(`${config.public.strapi.url}/api/faq-items`);

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

  if (error.value) {
    console.error('Ошибка загрузки данных:', error.value);
  }

  // Обработка ответа API и установка allItems
  watch(
    data,
    (newVal) => {
      if (!newVal) return;

      // Если API вернул уже массив нормализованных объектов
      if (Array.isArray(newVal)) {
        allItems.value = newVal.map((item) => ({
          id: item.id || item.slug,
          ...item,
          category: item.category ? { title: item.category.title, slug: item.category.slug } : null,
        }));
        return;
      }

      // Strapi-like формат { data: [...] }
      if (newVal.data && Array.isArray(newVal.data)) {
        allItems.value = newVal.data.map((raw) => {
          const attrs = raw.attributes || {};
          const catData = attrs.category && attrs.category.data && attrs.category.data.attributes;
          return {
            id: raw.id,
            ...attrs,
            category: catData ? { title: catData.title, slug: catData.slug } : null,
          };
        });
      }
    },
    { immediate: true },
  );

  const { data: categoriesData, error: categoriesError } = await useFetch(
    `${config.public.strapi.url}/api/faq-categories`,
  );

  watch(
    categoriesData,
    (newVal) => {
      if (newVal && Array.isArray(newVal.data)) {
        const mapped = newVal.data.map((c) => ({
          label: c.attributes.title,
          slug: c.attributes.slug,
        }));
        categories.value = [{ label: 'Все категории', slug: null }, ...mapped];

        const slugFromUrl = route.query.category || null;

        if (slugFromUrl) {
          const found = categories.value.find((x) => x.slug === slugFromUrl);
          selectedCategory.value = found || null;
        } else {
          selectedCategory.value = null;
        }
      }
    },
    { immediate: true },
  );

  if (categoriesError && categoriesError.value) {
    console.error('Ошибка загрузки категорий:', categoriesError.value);
  }

  const filteredItems = computed(() => {
    if (!selectedCategory.value || !selectedCategory.value.slug) return allItems.value;

    return allItems.value.filter(
      (item) => item.category && item.category.slug === selectedCategory.value.slug,
    );
  });

  const visibleItems = computed(() => {
    const end = currentPage.value * PAGE_SIZE;

    return filteredItems.value.slice(0, end);
  });

  const hasMore = computed(() => filteredItems.value.length > visibleItems.value.length);

  function updateUrl(params = {}) {
    const nextQuery = { ...route.query, ...params };
    if (nextQuery.category === null || nextQuery.category === undefined) delete nextQuery.category;
    if (nextQuery.page === null || nextQuery.page === undefined) delete nextQuery.page;
    router.replace({ query: nextQuery }).catch(() => {});
  }

  function loadMore() {
    currentPage.value += 1;
    updateUrl({ page: currentPage.value, category: selectedCategory.value?.slug });
  }
  watch(selectedCategory, (newVal) => {
    currentPage.value = 1;
    updateUrl({ page: 1, category: newVal && newVal.slug ? newVal.slug : undefined });
  });

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
