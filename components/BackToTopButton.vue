<template>
    <button v-if="isVisible" @click="scrollToTop"
        class="fixed bottom-4 right-4 flex items-center justify-center bg-blue-100 rounded-full h-11 w-11 2xl:h-[54px] 2xl:w-[54px]">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.0625 15.5L4.0625 13.625L4.0625 4.875L0.9375 4.875L5 0.5L9.0625 4.875L5.9375 4.875L5.9375 15.5L4.0625 15.5Z"
                fill="white" />
        </svg>


    </button>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const checkVisibility = () => {
    isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll', checkVisibility);
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkVisibility);
});
</script>
  