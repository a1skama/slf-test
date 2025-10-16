<template>
  <footer
    class="bg-gray-400"
    id="contacts"
  >
    <div
      class="_container flex flex-col gap-5 sm:gap-10 xl:gap-[60px] 2xl:gap-20 pt-[60px] sm:pt-20 xl:pt-[120px] 2xl:pt-[200px] pb-5"
    >
      <h2 ref="header">{{ data.heading }}</h2>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 xl:gap-6 2xl:gap-8">
        <div>
          <IconLogoBig
            class="w-[181px] h-[204px] sm:w-[356px] sm:h-[402px] xl:w-[391px] xl:h-[442px] 2xl:w-[460px] 2xl:h-[520px] mx-auto"
          />
        </div>

        <div class="flex flex-col gap-[34px] 2xl:gap-10">
          <span
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black hover:border-black transition-colors duration-500 group"
          >
            {{ data.name }}

            <span
              class="w-[6px] h-[6px] bg-black rounded-full group-hover:bg-[#C5C5C9] transition-colors duration-500"
            ></span>
          </span>

          <!-- TODO стандартизировать номера телефонов -->
          <NuxtLink
            v-for="(phone, phoneId) in data.phones"
            :key="phoneId"
            :to="formatPhoneNumber(phone.value)"
            target="_blank"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black hover:border-black transition-colors duration-500 group"
          >
            {{ phone.value }}

            <span
              class="w-[6px] h-[6px] bg-black rounded-full group-hover:bg-[#C5C5C9] transition-colors duration-500"
            ></span>
          </NuxtLink>

          <NuxtLink
            :to="'mailto:' + data.companyEmail"
            target="_blank"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black hover:border-black transition-colors duration-500 group"
          >
            Почта компании: {{ data.companyEmail }}

            <span
              class="w-[6px] h-[6px] bg-black rounded-full group-hover:bg-[#C5C5C9] transition-colors duration-500"
            ></span>
          </NuxtLink>

          <NuxtLink
            :to="'mailto:' + data.personalEmail"
            target="_blank"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black hover:border-black transition-colors duration-500 group"
          >
            Личная почта Андрея: {{ data.personalEmail }}

            <span
              class="w-[6px] h-[6px] bg-black rounded-full group-hover:bg-[#C5C5C9] transition-colors duration-500"
            ></span>
          </NuxtLink>

          <NuxtLink
            :to="data.whatsappLink"
            target="_blank"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black hover:border-black transition-colors duration-500 group"
          >
            WhatsApp: {{ data.whatsappText }}
            <span
              class="w-[6px] h-[6px] bg-black rounded-full group-hover:bg-[#C5C5C9] transition-colors duration-500"
            ></span>
          </NuxtLink>

          <NuxtLink
            :to="data.telegramLink"
            target="_blank"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black hover:border-black transition-colors duration-500 group"
          >
            Telegram: {{ data.telegramText }}
            <span
              class="w-[6px] h-[6px] bg-black rounded-full group-hover:bg-[#C5C5C9] transition-colors duration-500"
            ></span>
          </NuxtLink>
        </div>
      </div>

      <div
        class="flex flex-col gap-5 text-sm text-gray-600 sm:grid sm:grid-cols-2 sm:gap-4 xl:gap-6 2xl:gap-8 2xl:text-base sm:items-center"
      >
        <NuxtLink
          :to="data.policy.url"
          target="_blank"
          ref="footerLinks"
          class="text-gray-600 transition-colors duration-500 hover:text-black"
        >
          Политика конфиденциальности
        </NuxtLink>

        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <span ref="footerLinks">© {{ new Date().getFullYear() }} ИП Семин А. С.</span>

          <NuxtLink
            to="https://serptop.ru"
            target="_blank"
            ref="footerLinks"
          >
            Разработка: Serptop
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const props = defineProps({
    data: {
      type: Object,
    },
  });

  const header = ref(null);
  const listItems = ref([]);
  const footerLinks = ref([]);
  const logo = ref(null);
  const mediaQuery = ref(null);

  onMounted(() => {
    // Проверяем, что мы на клиенте
    if (process.client) {
      mediaQuery.value = window.matchMedia('(min-width: 1280px)');

      if (mediaQuery.value.matches) {
        // Анимация заголовка
        gsap.fromTo(
          header.value,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header.value,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              markers: false,
            },
          },
        );

        // Анимация логотипа
        gsap.fromTo(
          logo.value,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: logo.value,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              markers: false,
            },
          },
        );

        // Анимация элементов списка
        gsap.fromTo(
          listItems.value,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 4,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
              trigger: listItems.value[0],
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              markers: false,
            },
          },
        );

        // Анимация ссылок в нижней части
        gsap.fromTo(
          footerLinks.value,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 4,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
              trigger: footerLinks.value[0],
              start: 'top 75%',
              end: 'top 55%',
              scrub: true,
              markers: false,
            },
          },
        );
      }
    }
  });

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/[^+\d]/g, '');

    if (cleaned.length === 0 || (cleaned.includes('+') && cleaned[0] !== '+')) {
      return '';
    }

    return `tel:${cleaned}`;
  };
</script>
