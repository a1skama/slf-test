<template>
  <div
    v-if="!cookie"
    class="flex flex-col gap-4 p-5 bg-blue-100 rounded-2xl m-4 sm:m-5 sm:max-w-[356px] 2xl:max-w-[436px] fixed bottom-0 right-0"
  >
    <span class="text-sm font-bold text-white 2xl:text-base">
      Мы используем файлы Cookie
    </span>

    <span class="text-sm text-white 2xl:text-base">
      Наш сайт использует файлы cookie, чтобы сделать его более удобным для вас.
      Продолжая использовать сайт, вы соглашаетесь с
      <NuxtLink :to="contacts.policy?.url" target="_blank"
        >политикой использования файлов cookie </NuxtLink
      >.
    </span>
    <button @click="acceptCookies" class="btn btn-white">согласиться</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  contacts: {
    type: Object,
    required: true,
  },
});

const cookieName = "cookieConsent";
const cookie = ref(false);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const setCookie = (name, value, days) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

const acceptCookies = () => {
  setCookie(cookieName, "true", 100);
  cookie.value = true;
};

onMounted(() => {
  cookie.value = getCookie(cookieName) === "true";
});
</script>
