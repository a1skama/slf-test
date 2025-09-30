<template>
  <div class="bg-gray-400" id="cases">
    <div
      class="_container bg-gray-400 flex flex-col gap-4 sm:gap-5 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2 ref="title">{{ data.heading }}</h2>

      <div
        ref="casesContainer"
        class="grid grid-cols-1 gap-5 xl:grid-cols-2 sm:gap-6 2xl:gap-8"
      >
        <div
          v-for="(caseItem, caseIndex) in visibleCases"
          :key="caseIndex"
          class="relative"
        >
          <p
            v-if="caseItem.label"
            class="z-10 mb-5 text-sm text-gray-300 sm:mb-0 sm:top-0 sm:right-0 sm:absolute 2xl:text-base"
          >
            {{ caseItem.label }}
          </p>

          <div
            class="p-4 sm:p-5 2xl:p-[30px] rounded-xl gap-4 sm:gap-5 flex flex-col items-start min-h-[427px] sm:min-h-[420px] 2xl:min-h-[540px] relative case-item bg-white"
          >
            <span
              class="text-black text-sm 2xl:text-base py-2 px-4 rounded-[10px] border-gray-200 border 2xl:py-[10px] 2xl:px-5"
            >
              {{ formatDate(caseItem.date) }}
            </span>

            <span class="-mb-2 text-sm text-black 2xl:text-base">
              {{ caseItem.name }}
            </span>

            <h4 class="text-black">{{ caseItem.title }}</h4>

            <div
              class="flex flex-col sm:flex-row gap-2 sm:gap-[30px] 2xl:gap-10"
            >
              <span class="text-sm text-gray-200 2xl:text-base">
                (Ситуация)
              </span>

              <span class="text-sm text-black 2xl:text-base text-clamp">
                {{ caseItem.situation }}
              </span>
            </div>

            <div
              class="flex flex-col sm:flex-row gap-2 sm:gap-[30px] 2xl:gap-10"
            >
              <span class="text-sm text-gray-200 2xl:text-base">
                (Результат)
              </span>

              <span class="text-sm text-black 2xl:text-base text-clamp">
                {{ caseItem.result }}
              </span>
            </div>

            <NuxtLink
              :to="caseItem.link"
              target="_blank"
              class="mt-auto btn btn-blue"
            >
              <IconArrow />

              Посмотреть решение
            </NuxtLink>
          </div>
        </div>
      </div>

      <button class="mx-auto btn btn-main xl:w-1/4" @click="toggleShowAll">
        {{ showAll ? "свернуть" : "смотреть еще" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDateFormat } from "@vueuse/core";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showAll = ref(false);

const visibleCases = computed(() => {
  return showAll.value ? props.data.cases : props.data.cases.slice(0, 4);
});

function toggleShowAll() {
  showAll.value = !showAll.value;
}

const title = ref(null);
const casesContainer = ref(null);
const mediaQuery = ref(null);

onMounted(() => {
  // Проверяем, что мы на клиенте
  if (process.client) {
    mediaQuery.value = window.matchMedia("(min-width: 1280px)");

    if (mediaQuery.value.matches) {
      gsap.fromTo(
        title.value,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title.value,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
            markers: false,
          },
        }
      );
      gsap.utils
        .toArray(casesContainer.value.children)
        .forEach((caseItem, i) => {
          gsap.fromTo(
            caseItem,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: caseItem,
                start: "top 90%",
                end: "top 70%",
                scrub: true,
                markers: false,
                start: `top ${100 - i * 10}%`,
                end: `top ${90 - i * 10}%`,
              },
            }
          );
        });
    }
  }
});

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
};
</script>
