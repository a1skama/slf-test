<template>
  <div
    id="numbers"
    class="relative bg-blue-100 bg-center bg-no-repeat bg-[length:362px_410px] 2xl:bg-[length:538px_610px] bg-[url('assets/icons/logo-big.svg')] xl:bg-none"
  >
    <div
      ref="container"
      class="_container overflow-hidden xl:h-[120vh] xl:bg-center xl:bg-no-repeat xl:bg-[length:500px_600px] xl:bg-opacity-20 xl:bg-[url('assets/icons/logo-big.svg')] pt-[60px] xl:pt-20 2xl:pt-[120px]"
    >
      <h2 class="text-center text-white">{{ data.heading }}</h2>
    </div>

    <div
      class="_container xl:absolute xl:inset-0 mt-10 sm:mt-[3.75rem] xl:mt-20 2xl:mt-[7.5rem] pb-[60px] xl:pb-20 2xl:pb-[120px]"
    >
      <div
        ref="grid"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6 2xl:gap-8"
      >
        <div class="order-1 xl:order-none">
          <div
            :data-speed="data.numbers[0].speed"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[500px]"
          >
            <span class="number_1">{{ data.numbers[0].number }}</span>

            <span
              class="fl-text-[0.875rem,1.25rem] leading-[130%] text-gray-300"
            >
              {{ data.numbers[0].description }}
            </span>
          </div>
        </div>

        <div
          class="order-4 row-start-4 sm:col-start-2 xl:order-none xl:row-start-auto xl:col-start-auto"
        >
          <div
            :data-speed="data.numbers[1].speed"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[1600px]"
          >
            <span class="number_1">{{ data.numbers[1].number }}</span>

            <span
              class="fl-text-[0.875rem,1.25rem] leading-[130%] text-gray-300"
            >
              {{ data.numbers[1].description }}
            </span>
          </div>
        </div>

        <div class="flex-col gap-6 contents xl:flex 2xl:gap-8">
          <div class="order-3 row-start-3 xl:order-none xl:row-start-auto">
            <div
              :data-speed="data.numbers[2].speed"
              class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[1200px]"
            >
              <span class="number_1">{{ data.numbers[2].number }}</span>

              <span
                class="fl-text-[0.875rem,1.25rem] leading-[130%] text-gray-300"
              >
                {{ data.numbers[2].description }}
              </span>
            </div>
          </div>

          <div class="order-5 row-start-5 xl:order-none xl:row-start-auto">
            <div
              :data-speed="data.numbers[3].speed"
              class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[1200px]"
            >
              <span class="number_1">{{ data.numbers[3].number }}</span>

              <span
                class="fl-text-[0.875rem,1.25rem] leading-[130%] text-gray-300"
              >
                {{ data.numbers[3].description }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="order-2 row-start-2 sm:col-start-2 xl:order-none xl:row-start-auto xl:col-start-auto"
        >
          <div
            :data-speed="data.numbers[4].speed"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[800px]"
          >
            <span class="number_1">{{ data.numbers[4].number }}</span>

            <span
              class="fl-text-[0.875rem,1.25rem] leading-[130%] text-gray-300"
            >
              {{ data.numbers[4].description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const container = ref(null);
const grid = ref(null);
const mediaQuery = ref(null);

const initializeAnimations = () => {
  if (process.client && mediaQuery.value && mediaQuery.value.matches) {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        pin: true,
        trigger: container.value,
        start: "top top",
        // endTrigger: "#pin-windmill-wrap",
        end: "+=1500",
        markers: false,
      },
    });
    const innerDivs = grid.value.querySelectorAll("[data-speed]");

    innerDivs.forEach((div) => {
      const speed = parseFloat(div.getAttribute("data-speed")); // Преобразование в число
      tl.to(div, {
        y: `-${speed * 100}px`, // Корректное смещение
        ease: "none",
        scrollTrigger: {
          trigger: div,
          start: "top bottom", // Начало анимации, когда нижняя часть блока доходит до нижней части экрана
          end: "+=1500", // Конец анимации, когда верхняя часть блока доходит до верхней части экрана
          scrub: true,
          smooth: 2,
          markers: false, // Для отладки, можно убрать в финальной версии
        },
      });
    });
  } else {
    // Отключить анимации для мобильных экранов
    if (process.client) {
      gsap.killTweensOf("[data-speed]");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }
};

onMounted(() => {
  // Проверяем, что мы на клиенте
  if (process.client) {
    mediaQuery.value = window.matchMedia("(min-width: 1280px)");
    initializeAnimations();
    mediaQuery.value.addEventListener("change", initializeAnimations);
  }
});

onUnmounted(() => {
  if (process.client && mediaQuery.value) {
    mediaQuery.value.removeEventListener("change", initializeAnimations);
  }
});
</script>
