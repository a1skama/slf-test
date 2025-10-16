<template>
  <div class="bg-gray-400">
    <div
      class="_container flex flex-col gap-5 sm:gap-6 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2 ref="header">{{ data.heading }}</h2>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:gap-6">
        <div
          class="rounded-[20px] flex flex-col overflow-hidden"
          v-for="(item, i) in data.team"
          :key="i"
        >
          <img
            :src="item.image.url"
            :width="item.image.width"
            :height="item.image.height"
            :alt="item.image.alt"
            class="object-contain w-full aspect-square"
          />

          <div class="bg-white p-5 2xl:px-[30px] flex flex-col gap-5">
            <div class="flex flex-col gap-[10px]">
              <span class="text-black text-lg 2xl:text-[1.625rem] font-medium">
                {{ item.name }}
              </span>

              <span class="text-sm text-black 2xl:text-base">{{ item.position }}</span>
            </div>

            <div class="flex items-center gap-5 py-[9px] border-y border-gray-100">
              <span class="text-sm text-gray-100 2xl:text-base">Эл. почта:</span>

              <NuxtLink
                :to="`mailto:${item.email}`"
                class="text-sm text-black 2xl:text-base"
              >
                {{ item.email }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Object,
    },
  });
</script>
