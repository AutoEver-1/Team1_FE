<template>
  <div
    class="w-full flex flex-col items-center justify-center text-center mt-24"
  >
    <h1 class="text-5xl md:text-6xl font-extrabold leading-tight">
      보고싶은 영화를<br />
      검색해보세요
    </h1>

    <div class="flex mt-12 w-[90%] max-w-3xl">
      <div
        class="flex items-center w-full border border-yellow-400 rounded-full px-4 py-3 bg-[#12100E]"
      >
        <span class="mr-2 text-yellow-400 text-xl">🔍</span>
        <input
          type="text"
          placeholder="보고싶은 영화의 제목이나 배우를 검색해보세요"
          class="bg-transparent w-full outline-none text-sm text-white placeholder:text-gray-300"
        />
      </div>
      <button
        class="ml-3 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition"
      >
        검색
      </button>
    </div>
  </div>
</template>
