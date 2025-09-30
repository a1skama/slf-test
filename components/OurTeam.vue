<template>
  <div class="bg-gray-400">
    <div
      class="_container flex flex-col gap-5 sm:gap-6 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2 ref="header">Для вас работает команда профессионалов</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 2xl:gap-6">
        <div
          class="bg-blue-100 rounded-[20px] flex flex-col overflow-hidden"
          v-for="(item, i) in [1, 2, 3, 4]"
          :key="i"
        >
          <img src="public/images/avatar.png" alt="" class="max-h-[360px] object-contain"/>
          <div class="bg-white p-5 2xl:px-[30px] flex flex-col gap-5">
            <div class="flex flex-col gap-[10px]">
              <span class="text-black text-lg 2xl:text-[1.625rem] font-medium">Семин Андрей Сергеевич</span>
              <span class="text-sm 2xl:text-base text-black">Управляющий партнер</span>
            </div>
            <div class="flex items-center gap-5 py-[9px] border-y border-gray-100">
              <span class="text-sm 2xl:text-base text-gray-100">Эл. почта:</span>
              <a href="" class="text-sm 2xl:text-base text-black">mail@mail.ru</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
