<script setup>
import { getMovieDetail } from "../api/movieApi";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movieData = ref();
const movieId = route.params.id;
const embedUrl = ref("");

onMounted(() => {
  getMovieById();
});

const getMovieById = async () => {
  const res = await getMovieDetail(movieId);
  movieData.value = res.data;
  console.log(movieData);

  const videoPath = movieData.value.video_path;
  // const videoId = "2vCBuo0AESI";
  const videoId = new URL(videoPath).searchParams.get("v");
  embedUrl.value = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&modestbranding=1`;
};
</script>

<template>
  <div
    class="bg-[url('../../assets/images/backgroundImg.png')] bg-cover bg-center mt-16"
  >
    <div class="relative w-full h-full overflow-hidden">
      <div
        class="relative z-10 flex flex-col items-center justify-center text-white"
        v-if="movieData"
      >
        <div class="absolute left-1/2 top-0 transform -translate-x-1/2 -z-10">
          <iframe
            class="w-[64vw] h-[50vh] w"
            :src="embedUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
          <div
            class="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          ></div>
        </div>
        <div class="w-[70%]">
          <div class="text-white min-h-screen p-10">
            <div class="flex gap-10 mt-[25%]">
              <!-- 왼쪽: 포스터 및 정보 -->
              <div class="w-1/3 space-y-6">
                <!-- 포스터 -->
                <img :src="movieData.posterPath" class="rounded-lg shadow-lg" />

                <!-- 조회수 및 좋아요 -->
                <div class="flex flex-col gap-2">
                  <div
                    class="bg-neutral-800 text-white rounded px-4 py-2 flex items-center justify-between"
                  >
                    👁️ <span>32,423,212 명</span>
                  </div>
                  <div
                    class="bg-neutral-800 text-white rounded px-4 py-2 flex items-center justify-between"
                  >
                    ❤️ <span>23,423 명</span>
                  </div>
                </div>

                <!-- OTT 로고 -->
                <div class="flex gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    class="w-6 h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    class="w-6 h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    class="w-6 h-6"
                  />
                </div>
              </div>

              <!-- 오른쪽: 상세 정보 -->
              <div class="w-2/3 space-y-6">
                <!-- 제목 -->
                <!-- class="bg-black bg-opacity-50 p-4" -->
                <div>
                  <h1 class="text-3xl font-bold">{{ movieData.title }}</h1>
                  <p class="text-sm mt-2">
                    <span>기획: 액션/판타지/모험</span> <br />
                    <span>개봉: 2022.12.14</span> <br />
                    <span>평점: 8.83</span> <br />
                    <span>관객수: +1,800만명</span>
                  </p>
                  <p class="mt-4 text-sm text-gray-300 leading-relaxed">
                    아바타: 물의 길은 판도라 행성에서 제이크 설리와 그의 가족이
                    겪게 되는 모험과 위협을 그린 서사적 이야기이다. 그들의
                    생존과 희생, 그리고 연대의 이야기를 통해 인간과 자연, 기술
                    간의 갈등을 그리고 있다.
                  </p>
                </div>

                <!-- 탭 메뉴 (예시) -->
                <div class="flex border-b border-amber-400 text-sm gap-6 mt-6">
                  <button
                    class="pb-2 border-b-2 border-amber-400 font-semibold"
                  >
                    영화 상세정보
                  </button>
                  <button class="pb-2 text-gray-400">영화 리뷰</button>
                </div>

                <!-- 세부 정보 카드 -->
                <div class="bg-neutral-900 rounded-xl p-6 space-y-4">
                  <div class="text-sm">
                    <span class="text-gray-400">📅 Released Year</span>
                    <p>2022</p>
                  </div>

                  <div class="text-sm">
                    <span class="text-gray-400">🌐 Available Languages</span>
                    <div class="flex gap-2 mt-1">
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >English</span
                      >
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >Hindi</span
                      >
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >Tamil</span
                      >
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >Telegu</span
                      >
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >Kannada</span
                      >
                    </div>
                  </div>

                  <div class="text-sm">
                    <span class="text-gray-400">⭐ Ratings</span>
                    <div class="flex gap-4 mt-1">
                      <div class="bg-black p-2 rounded text-center">
                        <p class="text-xs">IMDb</p>
                        <p class="text-red-500 font-bold">★★★★½</p>
                        <p class="text-xs">4.5</p>
                      </div>
                      <div class="bg-black p-2 rounded text-center">
                        <p class="text-xs">Streamvibe</p>
                        <p class="text-red-500 font-bold">★★★★</p>
                        <p class="text-xs">4.0</p>
                      </div>
                    </div>
                  </div>

                  <div class="text-sm">
                    <span class="text-gray-400">🎬 Genres</span>
                    <div class="flex gap-2 mt-1">
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >Action</span
                      >
                      <span class="bg-gray-700 px-2 py-0.5 rounded text-xs"
                        >Adventure</span
                      >
                    </div>
                  </div>

                  <div class="text-sm">
                    <span class="text-gray-400">🎥 Director</span>
                    <div
                      class="mt-1 flex items-center gap-3 bg-black rounded p-2"
                    >
                      <img
                        src="https://randomuser.me/api/portraits/men/40.jpg"
                        class="w-8 h-8 rounded-full"
                        alt="Director"
                      />
                      <div>
                        <p class="text-sm">Rishab Shetty</p>
                        <p class="text-xs text-gray-400">From India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Cast -->
                <div class="bg-neutral-900 rounded-xl p-6 mt-4">
                  <span class="text-gray-400 text-sm block mb-2">🎭 Cast</span>
                  <div class="flex gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/11.jpg"
                      class="w-10 h-10 rounded-full"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/12.jpg"
                      class="w-10 h-10 rounded-full"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/13.jpg"
                      class="w-10 h-10 rounded-full"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/14.jpg"
                      class="w-10 h-10 rounded-full"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/15.jpg"
                      class="w-10 h-10 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
