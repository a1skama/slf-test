<template>
  <div class="bg-gray-400" id="certificates">
    <div
      class="_container flex flex-col gap-5 sm:gap-5 xl:gap-[30px] 2xl:gap-10 pb-[60px] sm:pb-20 xl:pb-[120px] 2xl:pb-[200px]"
    >
      <div
        class="pb-6 -mb-6 xl:m-0 xl:p-0 flex justify-between items-center gap-4 w-full"
      >
        <h2 ref="header" class="">Видео</h2>
        <div class="flex gap-10 items-center">
            <div class="videoPagination text-black"></div>
          <div class="flex items-center gap-4 justify-center">
            <button class="videoSwiperPrev text-white h-11 2xl:h-[52px] px-8 rounded-full bg-blue-200"><IconArrow class="scale-x-[-1]" /></button>
            <button class="videoSwiperNext text-white h-11 2xl:h-[52px] px-8 rounded-full bg-blue-200"><IconArrow /></button>
          </div>
        </div>
      </div>

      <swiper
        :slidesPerView="2"
        :spaceBetween="32"
        :pagination="{
          type: 'fraction',
          clickable: true,
          el:'.videoPagination'
        }"
        :navigation="{
          nextEl: '.videoSwiperNext',
          prevEl: '.videoSwiperPrev',
        }"
        :breakpoints="{
          0: { slidesPerView: 1, spaceBetween: 32 },
          768: { slidesPerView: 2, spaceBetween: 32 },
        }"
        :modules="modules"
        class="mySwiper w-full"
      >
        <swiper-slide class="w-full">
          <div class="flex flex-col gap-5">
            <iframe
              width="720"
              height="201"
              class="rounded-[20px] w-full h-[201px] md:h-[406px] xl:h-[360px] 2xl:h-[505px]"
              src="https://rutube.ru/play/embed/b87d7774c6aa8e2180bdf2a0f63262ac/?skinColor=041B44"
              allow="clipboard-write; autoplay"
              webkitAllowFullScreen
              mozallowfullscreen
              allowFullScreen
            ></iframe>
            <span class="font-medium text-lg text-black 2xl:text-[1.625rem]"
              >Название видео 1</span
            >
          </div>
        </swiper-slide>

        <swiper-slide class="w-full">
          <div class="flex flex-col gap-5">
            <iframe
              width="720"
              height="201"
              class="rounded-[20px] w-full h-[201px] md:h-[406px] xl:h-[360px] 2xl:h-[505px]"
              src="https://rutube.ru/play/embed/b87d7774c6aa8e2180bdf2a0f63262ac/?skinColor=041B44"
              allow="clipboard-write; autoplay"
              webkitAllowFullScreen
              mozallowfullscreen
              allowFullScreen
            ></iframe>
            <span class="font-medium text-lg text-black 2xl:text-[1.625rem]"
              >Название видео 1</span
            >
          </div>
        </swiper-slide>
        <swiper-slide class="w-full">
          <div class="flex flex-col gap-5">
            <iframe
              width="720"
              height="201"
              class="rounded-[20px] w-full h-[201px] md:h-[406px] xl:h-[360px] 2xl:h-[505px]"
              src="https://rutube.ru/play/embed/b87d7774c6aa8e2180bdf2a0f63262ac/?skinColor=041B44"
              allow="clipboard-write; autoplay"
              webkitAllowFullScreen
              mozallowfullscreen
              allowFullScreen
            ></iframe>
            <span class="font-medium text-lg text-black 2xl:text-[1.625rem]"
              >Название видео 1</span
            >
          </div>
        </swiper-slide>
        <swiper-slide class="w-full">
          <div class="flex flex-col gap-5">
            <iframe
              width="720"
              height="201"
              class="rounded-[20px] w-full h-[201px] md:h-[406px] xl:h-[360px] 2xl:h-[505px]"
              src="https://rutube.ru/play/embed/b87d7774c6aa8e2180bdf2a0f63262ac/?skinColor=041B44"
              allow="clipboard-write; autoplay"
              webkitAllowFullScreen
              mozallowfullscreen
              allowFullScreen
            ></iframe>
            <span class="font-medium text-lg text-black 2xl:text-[1.625rem]"
              >Название видео 1</span
            >
          </div>
        </swiper-slide>
        <swiper-slide class="w-full">
          <div class="flex flex-col gap-5">
            <iframe
              width="720"
              height="201"
              class="rounded-[20px] w-full h-[201px] md:h-[406px] xl:h-[360px] 2xl:h-[505px]"
              src="https://rutube.ru/play/embed/b87d7774c6aa8e2180bdf2a0f63262ac/?skinColor=041B44"
              allow="clipboard-write; autoplay"
              webkitAllowFullScreen
              mozallowfullscreen
              allowFullScreen
            ></iframe>
            <span class="font-medium text-lg text-black 2xl:text-[1.625rem]"
              >Название видео 1</span
            >
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const modules = [Pagination, Navigation];
</script>
