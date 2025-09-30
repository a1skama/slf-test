<template>
  <div class="bg-blue-100" id="about">
    <div
      ref="container"
      class="_container xl:h-screen max-h-[950px] pt-[60px] pb-[380px] sm:pb-[564px] xl:py-[71px] 2xl:py-[140px] flex xl:grid xl:grid-cols-2 relative"
    >
      <div class="absolute bottom-0 right-0">
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

      <div class="relative xl:col-start-2 _container">
        <h2
          ref="title"
          class="mb-3 text-white sm:mb-4 2xl:mb-5 leading-23 lg:max-w-xs 2xl:max-w-md"
        >
          {{ data.heading }}
        </h2>

        <span ref="subtitle" class="text-sm text-blue-300 2xl:text-base">
          {{ data.position }}
        </span>

        <ul
          ref="infoList"
          class="list-disc list-inside flex flex-col gap-4 2xl:gap-5 py-4 sm:py-6 xl:py-[30px] 2xl:py-10"
        >
          <li
            v-for="(honor, honorId) in data.honors"
            :key="honorId"
            class="text-sm text-white 2xl:text-base"
          >
            {{ honor }}
          </li>
        </ul>

        <button
          @click="openModal('form')"
          ref="ctaButton"
          class="btn btn-white"
        >
          <IconArrow />

          Записаться на консультацию
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const isFormOpen = ref(false);
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { openModal } = useModal();

const container = ref(null);
const title = ref(null);
const subtitle = ref(null);
const infoList = ref(null);
const ctaButton = ref(null);

onMounted(() => {
  // Анимация блока _container
  // gsap.fromTo(
  //   container.value,
  //   { x: "100%", opacity: 0 },
  //   {
  //     x: "0%",
  //     opacity: 1,
  //     duration: 3,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: container.value,
  //       start: "top 80%",
  //       end: "top 60%",
  //       scrub: true,
  //       markers: false,
  //       onEnter: () => {
  //         animateElements();
  //       },
  //     },
  //   }
  // );
});

function animateElements() {
  // Анимация заголовка
  gsap.fromTo(
    title.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title.value,
        start: "top 75%",
        end: "top 55%",
        scrub: true,
        markers: false,
      },
    }
  );

  // Анимация подзаголовка
  gsap.fromTo(
    subtitle.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: subtitle.value,
        start: "top 70%",
        end: "top 50%",
        scrub: true,
        markers: false,
      },
    }
  );

  // Анимация списка
  gsap.fromTo(
    infoList.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: infoList.value,
        start: "top 65%",
        end: "top 45%",
        scrub: true,
        markers: false,
        stagger: 0.1,
      },
    }
  );

  // Анимация кнопки
  gsap.fromTo(
    ctaButton.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaButton.value,
        start: "top 75%",
        end: "top 55%",
        scrub: true,
        markers: false,
      },
    }
  );
}
function updateIsFormOpen(value) {
  isFormOpen.value = value;
}
</script>
