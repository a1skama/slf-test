<template>
  <div class="bg-gray-400" id="certificates">
    <div
      class="_container flex flex-col gap-5 sm:gap-5 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2
        ref="header"
        class="pb-6 -mb-6 border-b border-gray-100 xl:border-0 xl:m-0 xl:p-0"
      >
        {{ data.heading }}
      </h2>

      <div
        ref="certificateBlocks"
        class="grid xl:grid-cols-[418fr_1372fr] items-start xl:border-t border-gray-100"
      >
        <span
          class="flex items-center pt-4 text-sm font-semibold text-black 2xl:text-base xl:pt-5"
        >
          <span class="w-2 h-2 mr-2 font-bold bg-black rounded-full"></span>

          Дипломы
        </span>

        <ul>
          <li
            v-for="(diplom, diplomId) in data.diploms"
            :key="diplomId"
            class="relative flex items-center justify-between w-full gap-4 py-3 text-sm text-black transition duration-500 border-b border-gray-100 2xl:text-base sm:py-4 2xl:gap-5 hover:border-black active:border-black"
          >
            <NuxtLink
              :to="diplom.file.url"
              target="_blank"
              class="before:absolute before:inset-0"
            >
              {{ diplom.title }}
            </NuxtLink>

            <div
              class="flex items-center flex-shrink-0 ml-auto xl:gap-40 2xl:gap-64"
            >
              <span class="uppercase">{{ diplom.file.format }}</span>

              <span class="hidden xl:block">
                [{{ Math.round((diplom.file.size / 1000) * 100) / 100 }} MB]
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div
        ref="certificateBlocks"
        class="grid xl:grid-cols-[418fr_1372fr] items-start xl:border-t border-gray-100"
      >
        <span
          class="flex items-center pt-4 text-sm font-semibold text-black 2xl:text-base xl:pt-5"
        >
          <span class="w-2 h-2 mr-2 font-bold bg-black rounded-full"></span>

          Сертификаты
        </span>

        <ul>
          <li
            v-for="(certificate, certificateId) in data.certificates"
            :key="certificateId"
            class="relative flex items-center justify-between w-full gap-4 py-3 text-sm text-black transition duration-500 border-b border-gray-100 2xl:text-base sm:py-4 2xl:gap-5 hover:border-black active:border-black"
          >
            <NuxtLink
              :to="certificate.file.url"
              target="_blank"
              class="before:absolute before:inset-0"
            >
              {{ certificate.title }}
            </NuxtLink>

            <div
              class="flex items-center flex-shrink-0 ml-auto xl:gap-40 2xl:gap-64"
            >
              <span class="uppercase">{{ certificate.file.format }}</span>

              <span class="hidden xl:block">
                [{{ Math.round((certificate.file.size / 1000) * 100) / 100 }}
                MB]
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const header = ref(null);
const certificateBlocks = ref([]);
const mediaQuery = ref(null);

onMounted(() => {
  // Проверяем, что мы на клиенте
  if (process.client) {
    mediaQuery.value = window.matchMedia("(min-width: 1280px)");

    if (mediaQuery.value.matches) {
      // Анимация заголовка
      gsap.fromTo(
        header.value,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header.value,
            start: "top 75%",
            end: "top 55%",
            scrub: true,
            markers: false,
          },
        }
      );

      // Анимация блоков сертификатов
      gsap.utils.toArray(certificateBlocks.value).forEach((block, index) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
              markers: false,
              delay: index * 0.3,
            },
          }
        );
      });
    }
  }
});
</script>
