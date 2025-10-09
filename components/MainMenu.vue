<template>
  <div
    class="absolute left-0 z-10 flex flex-col w-full gap-4 px-4 py-6 overflow-scroll bg-blue-100 top-20 sm:px-5 xl:hidden">
    <div class="flex flex-col gap-4">
      <button v-for="(item, i) in headerLinks" :key="i"
        class="flex items-center justify-between px-6 text-white rounded-full h-11 bg-white-o2" @click="
          closeModal('menu');
        scrollToSection(item.link);
        ">
        <span class="uppercase">{{ item.title }}</span>

        <IconArrow />
      </button>
      <NuxtLink to="/faq" @click="
        closeModal('menu')"
        class="flex items-center justify-between px-6 text-white rounded-full h-11 bg-white-o2 uppercase">Вопрос-ответ

        <IconArrow />

      </NuxtLink>
    </div>

    <span class="text-base text-white 2xl:text-xl">
      Если у вас срочный вопрос вы можете связаться с нами прямо сейчас
      по контактам ниже:
    </span>

    <div class="grid grid-cols-2 sm:grid-cols-4 w-full gap-[9px] sm:gap-4 xl:gap-6 2xl:gap-8">
      <NuxtLink :to="formatPhoneNumber(contacts.phones[0].value)" target="_blank"
        class="text-white text-sm 2xl:text-base w-full h-11 sm:h-[54px] 2xl:h-[64px] border-white border rounded-full flex items-center justify-center">
        {{ contacts.phones[0].value }}
      </NuxtLink>

      <NuxtLink :to="formatPhoneNumber(contacts.phones[1].value)" target="_blank"
        class="text-white text-sm 2xl:text-base w-full h-11 sm:h-[54px] 2xl:h-[64px] border-white border rounded-full flex items-center justify-center">
        {{ contacts.phones[1].value }}
      </NuxtLink>

      <NuxtLink :to="contacts.whatsappLink" target="_blank"
        class="text-white text-sm 2xl:text-base w-full h-11 sm:h-[54px] 2xl:h-[64px] border-white border rounded-full flex items-center justify-center space-x-2">
        <IconWhatsapp class="w-[23px] h-[22px] flex-shrink-0" />

        <span class="uppercase">slf.expert</span>
      </NuxtLink>

      <NuxtLink :to="contacts.telegramLink" target="_blank"
        class="text-white text-sm 2xl:text-base w-full h-11 sm:h-[54px] 2xl:h-[64px] border-white border rounded-full flex items-center justify-center space-x-2">
        <IconTelegram class="w-[23px] h-[22px] flex-shrink-0" />

        <span class="uppercase">slf.expert</span>
      </NuxtLink>
    </div>

    <button class="mt-3 btn btn-white sm:mt-4 2xl:mt-5" @click="openModal('form')">
      <IconArrow />

      <span>Записаться на консультацию</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  headerLinks: {
    type: Array,
    required: true,
  },
  contacts: {
    type: Object,
    required: true,
  },
});

const { openModal, closeModal } = useModal();

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
