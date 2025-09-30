<template>
    <div class="grid xl:grid-cols-[1fr_2fr_1fr] gap-5 py-5 border-b border-gray-100 first:border-t">
        <div class="flex gap-1 xl:flex-col">
            <span class="text-black font-bold text-[2rem] leading-[100%]">01</span>
            <span class="text-sm text-blue-400 leading-[100%]">августа <br />2025</span>
            <span class="xl:hidden ml-5 text-sm 2xl:text-base text-black border border-gray-200 rounded-[10px] h-[34px] 2xl:h-[36px] px-5 w-fit flex items-center justify-center">ТАМОЖНЯ</span>

        </div>
        <div class="flex flex-col gap-5">
            <span class="hidden xl:flex text-sm 2xl:text-base text-black border border-gray-200 rounded-[10px] h-[34px] 2xl:h-[36px] px-5 w-fit items-center justify-center">ТАМОЖНЯ</span>
            <span class="text-black text-xl md:text-[1.625rem] xl:text-[2rem] 2xl:text-[2.875rem] font-medium">Как
                повышение госпошлин изменило таможенные споры?</span>
        </div>
        <NuxtLink to="/faq/_type" class="xl:ml-auto btn bg-blue-200 text-white h-11 2xl:h-[54px] w-fit">
            <IconArrow /> ОТВЕТ
        </NuxtLink>
    </div>
</template>
<script setup></script>
