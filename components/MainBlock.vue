<template>
  <div class="bg-blue-100 2xl:pt-[9.375rem] md:pt-[7.5rem] pt-[6.25rem]">
    <div
      ref="container"
      class="_container xl:h-screen bg-contain sm:bg-bottom xl:max-h-[950px] pb-6 sm:pb-5 xl:pb-6 2xl:pb-10 bg-no-repeat"
    >
      <div class="absolute top-0 right-0 sm:top-auto sm:bottom-0">
        <picture>
          <source
            :srcset="data.bgMobile.url"
            media="(max-width: 639px)"
            :width="data.bgMobile.width"
            :height="data.bgMobile.height"
          />
          <source
            :srcset="data.bgTablet.url"
            media="(max-width: 1279px)"
            :width="data.bgTablet.width"
            :height="data.bgTablet.height"
          />
          <img
            :src="data.bgDesktop.url"
            :alt="data.bgDesktop.alt"
            :width="data.bgDesktop.width"
            :height="data.bgDesktop.height"
          />
        </picture>
      </div>

      <div ref="content" class="max-w-[1100px]">
        <h1
          class="fl-text-[1.625rem,5.125rem] leading-[120%] font-bold text-white uppercase"
        >
          <span v-html="data.titleTop"></span>
          {{ " " }}
          <span v-html="data.titleBottom" class="text-blue-300"> </span>
        </h1>
      </div>

      <button
        @click="openModal('form')"
        ref="button"
        class="mt-3 btn btn-white sm:mt-4 2xl:mt-5"
      >
        <IconArrow />

        {{ data.button }}
      </button>

      <div
        ref="grid"
        class="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-4 max-w-[290px] xl:max-w-[1015px] mt-[387px] sm:mt-[118px] xl:mt-[250px] 2xl:mt-[55px]"
      >
        <div
          v-for="(item, i) in data.numbers"
          :key="i"
          class="flex flex-col rounded-[20px] justify-between gap-4 2xl:gap-5 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl"
        >
          <span class="number_2">{{ item.key }}</span>
          <span class="text-base text-gray-300">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { openModal } = useModal();

const container = ref(null);
const content = ref(null);
const button = ref(null);
const grid = ref(null);

onMounted(() => {
  // Анимация контейнера
  gsap.fromTo(
    container.value,
    { x: "100%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 1, // Задержка для последовательности анимаций
    }
  );

  // Анимация контента
  gsap.fromTo(
    content.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 1, // Задержка для последовательности анимаций
      stagger: 0.5,
    }
  );

  // Анимация кнопки и грида
  gsap.fromTo(
    [button.value, grid.value],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 2.5,
      ease: "power3.out",
      delay: 1, // Задержка для последовательности анимаций
      stagger: 0.5, // Задержка между анимациями элементов
    }
  );
});
</script>
