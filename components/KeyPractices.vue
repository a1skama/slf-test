<template>
  <div class="bg-gray-400" id="practices">
    <div
      class="_container flex flex-col gap-5 sm:gap-6 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2 ref="header">{{ data.heading }}</h2>

      <div class="w-full h-px bg-gray-100"></div>

      <div
        v-for="(practic, practicIndex) in data.practices"
        :key="practicIndex"
        ref="blocks"
        class="grid grid-cols-1 gap-5 pb-10 border-b border-gray-100 xl:grid-cols-2 xl:gap-0"
      >
        <div class="flex h-fit gap-2.5 sm:gap-4 xl:gap-[190px] 2xl:gap-[250px]">
          <span
            class="bg-white rounded-full flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] 2xl:h-[60px] 2xl:w-[60px] flex-shrink-0"
          >
            <img
              :src="practic.icon.url"
              :width="practic.icon.width"
              :height="practic.icon.height"
              :alt="practic.icon.alt"
            />
          </span>

          <h3 class="xl:max-w-[470px] 2xl:max-w-[570px]">
            {{ practic.title }}
          </h3>
        </div>

        <div
          class="flex items-start flex-col gap-5 xl:gap-[30px] 2xl:gap-10 sm:border-l sm:border-gray-100 sm:pl-10"
        >
          <ul class="flex flex-col gap-4 list-disc list-inside">
            <li
              v-for="(work, workIndex) in practic.works"
              :key="workIndex"
              class="text-xs text-black 2xl:text-base"
            >
              {{ work }}
            </li>
          </ul>

          <button
            @click="
              openModal('form');
              activePracticeId = practicIndex + 1;
            "
            class="btn btn-main"
          >
            <IconArrow />

            <span>Решить проблему</span>
          </button>
        </div>
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

const { openModal } = useModal();

const { activePracticeId } = usePractices();

const header = ref(null);
const blocks = ref([]);
const blocksArray = ref([]);
const mediaQuery = ref(null);

onMounted(() => {
  // Проверяем, что мы на клиенте
  if (process.client) {
    mediaQuery.value = window.matchMedia("(min-width: 1280px)");

    if (mediaQuery.value.matches) {
      gsap.fromTo(
        header.value,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header.value,
            start: "top 90%",
            end: "top 90%",
            scrub: true,
            markers: false,
          },
        }
      );

      blocks.value.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 95%",
              end: "top 90%",
              scrub: true,
              markers: false,
            },

            // stagger: 0.3,
          }
        );
      });
    }
  }
});
</script>
