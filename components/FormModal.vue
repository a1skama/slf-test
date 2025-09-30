<template>
  <div
    class="fixed inset-0 xl:left-auto right-0 w-full overflow-auto xl:max-w-[696px] 2xl:max-w-[984px] xl:h-screen z-[999] flex flex-col"
  >
    <div
      @click="closeModal('form')"
      class="absolute flex items-center justify-center ml-auto border rounded-full cursor-pointer border-blue-40 w-11 h-11 hover:border-white top-4 right-4 sm:top-14 sm:right-5 xl:right-6 2xl:top-16 2xl:right-10"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10L15 15M10 10L5 5M10 10L5 15M10 10L15 5"
          stroke="white"
          stroke-width="1.7"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <FormComponent
      :select-option="selectedOption"
      :modal="true"
      :practices="data.practices"
      :contacts="contacts"
      class="flex-grow"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  selectedOption: {
    type: Number,
    default: 0,
  },
  data: {
    type: Object,
    required: true,
  },
  contacts: {
    type: Object,
    required: true,
  },
});

const { closeModal } = useModal();
</script>
