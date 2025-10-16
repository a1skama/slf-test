<template>
  <div
    class="bg-gray-400"
    id="services"
  >
    <div
      class="_container flex flex-col gap-5 sm:gap-6 xl:gap-[30px] 2xl:gap-10 pb-[60px] sm:pb-20 xl:pb-[120px] 2xl:pb-[200px]"
    >
      <h2 ref="header">{{ data.heading }}</h2>

      <div class="w-full h-px bg-gray-100"></div>

      <div
        class="grid grid-cols-1 gap-5 pb-10 border-b border-gray-100 xl:grid-cols-2 xl:gap-8"
        v-for="(service, i) in data.services"
        :key="i"
      >
        <div class="flex flex-col gap-5">
          <div class="flex items-center xl:items-start xl:flex-col gap-4 xl:gap-[30px]">
            <span
              class="bg-white rounded-full flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] 2xl:h-[60px] 2xl:w-[60px] flex-shrink-0"
            >
              <img
                :src="service.icon.url"
                :width="service.icon.width"
                :height="service.icon.height"
                :alt="service.title"
                class="object-cover w-5 h-5 sm:w-6 sm:h-6"
              />
            </span>

            <h3 class="xl:max-w-[470px] 2xl:max-w-[570px]">{{ service.title }}</h3>
          </div>

          <span class="text-sm text-black 2xl:text-base text-clamp xl:max-w-[80%]">
            {{ service.description }}
          </span>
        </div>

        <div class="flex flex-col xl:flex-row justify-between gap-[30px] xl:items-center mt-auto">
          <h3 class="font-bold">{{ formatPrice(service.price) }} ₽</h3>

          <button
            @click="openModal('pay', service)"
            class="btn btn-main w-fit"
          >
            <IconArrow />Заказать
          </button>
        </div>
      </div>
    </div>

    <PayModal v-if="isOpen('pay')" />
  </div>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  });

  const { openModal, isOpen } = useModal();

  const formatPrice = (price) => {
    return Number(price).toLocaleString('ru-RU');
  };
</script>
