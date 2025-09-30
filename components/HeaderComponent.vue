<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 z-30 w-full transition-transform duration-300 bg-blue-100"
    :class="
      isHeaderHidden ? '!-translate-y-[calc(100%+1px)]' : 'transform-none'
    "
  >
    <div
      class="relative flex items-center justify-between gap-4 py-4 _container"
    >
      <NuxtLink to="/">
        <IconLogo />
      </NuxtLink>
      <div
        class="gap-[30px] bg-white-o2 rounded-full xl:py-5 xl:px-8 hidden xl:flex"
      >
        <button
          v-for="(link, linkId) in headerLinks"
          :key="linkId"
          class="text-xs text-white uppercase 2xl:text-sm hover:text-[#A3B8D0] transition-colors duration-500"
          @click="scrollToSection(link.link)"
        >
          {{ link.title }}
        </button>
      </div>

      <div class="flex items-center gap-5 shrink-0">
        <div class="hidden gap-5 sm:flex h-11 xl:h-fit">
            <NuxtLink
            to="/faq"
            class="btn btn-white-02"
          >
            Вопрос-ответ
          </NuxtLink>
          <NuxtLink
            :to="formatPhoneNumber(contacts.phones[0].value)"
            class="btn btn-white-02"
          >
            {{ contacts.phones[0].value }}
          </NuxtLink>

          <button @click="openModal('form')" class="btn btn-white">
            <IconArrow />

            <span>Решить проблему</span>
          </button>
        </div>

        <div
          @click="isOpen('menu') ? closeModal('menu') : openModal('menu')"
          class="flex items-center justify-center px-6 py-4 rounded-full bg-white-o2 h-11 xl:hidden"
        >
          <IconBurger v-if="!isOpen('menu')" />

          <IconCross v-if="isOpen('menu')" />
        </div>
      </div>

      <MainMenu
        v-if="isOpen('menu')"
        :header-links="headerLinks"
        :contacts="contacts"
      />
    </div>
  </header>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowScroll } from "@vueuse/core";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  contacts: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

const { openModal, closeModal, isOpen } = useModal();

const headerLinks = [
  {
    title: "Практики",
    link: "practices",
  },
  {
    title: "Цифры",
    link: "numbers",
  },
  {
    title: "Кейсы",
    link: "cases",
  },
  {
    title: "О нас",
    link: "about",
  },
  {
    title: "Сертификаты",
    link: "certificates",
  },
  {
    title: "Контакты",
    link: "contacts",
  },
];

const headerRef = ref(null);

onMounted(() => {
  gsap.fromTo(
    headerRef.value,
    { y: -100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    }
  );
});

let lastScroll = 0;
const { x, y } = useWindowScroll();
const isHeaderHidden = ref(false);

watch(y, (currentY) => {
  if (currentY === 0) {
    headerRef.value.classList.remove("transform-none");
    return;
  }

  if (currentY > lastScroll) {
    // down
    isHeaderHidden.value = true;
    closeModal("menu");
  } else if (currentY < lastScroll) {
    // up
    isHeaderHidden.value = false;
  }

  lastScroll = currentY;
});

watch(
  route,
  () => {
    isHeaderHidden.value = false;
  },
  { deep: true }
);

const scrollToSection = (id, offset = 0) => {
  const element = document.getElementById(id);
  if (element) {
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // Плавный скролл
    });
  }
};

const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/[^+\d]/g, "");

  if (cleaned.length === 0 || (cleaned.includes("+") && cleaned[0] !== "+")) {
    return "";
  }

  return `tel:${cleaned}`;
};
</script>
