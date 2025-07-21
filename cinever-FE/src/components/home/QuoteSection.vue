<template>
  <div class="relative w-full bg-amber-500 text-black py-6 shadow-lg">
    <div
      class="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0"
    >
      <!-- 왼쪽 인용문 -->
      <div class="text-center md:text-left flex-1">
        <p class="text-xs md:text-sm text-black/70 mb-1 tracking-wide">
          이 대사 기억나?
        </p>
        <blockquote
          class="text-lg md:text-2xl font-bold text-black leading-snug break-words"
        >
          “{{ famous.content }}”
        </blockquote>
      </div>

      <!-- 오른쪽 버튼 -->
      <div class="shrink-0">
        <RouterLink
          :to="`/movie/${famous}`"
          class="inline-block border border-black text-black hover:bg-black hover:text-amber-400 text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition duration-200"
        >
          영화 보러 가기 →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const famous = ref({});

const Quotes = [
  { movieId: 0, content: "사랑은 돌아오는 거야." }, // 봄날은 간다
  { movieId: 1, content: "니가 가라 하와이." }, // 친구
  { movieId: 2, content: "이게 다 계획이 있었구나." }, // 기생충
  { movieId: 3, content: "밥은 먹고 다니냐?" }, // 살인의 추억
  { movieId: 4, content: "나, 지금 떨고 있니?" }, // 쉬리
  { movieId: 5, content: "어차피 인생은 실전이야." }, // 범죄와의 전쟁
  { movieId: 6, content: "지금 아니면 언제 살겠노!" }, // 국제시장
  { movieId: 7, content: "오늘만 산다." }, // 신세계
  { movieId: 8, content: "너는 계획이 다 있구나." }, // 기생충
  { movieId: 9, content: "살아있네!" }, // 친구
  { movieId: 10, content: "우리는 한 팀이다." }, // 국가대표
  { movieId: 11, content: "끝날 때까지 끝난 게 아니다." }, // 미생
  { movieId: 12, content: "피할 수 없으면 즐겨라." }, // 무한도전 명언
  { movieId: 13, content: "진짜 사나이는 울지 않아." }, // 태극기 휘날리며
  { movieId: 14, content: "그 사람 또 울고 있네." }, // 클래식
  { movieId: 15, content: "그만해라, 이쯤에서." }, // 베테랑
  { movieId: 16, content: "인생은 속도가 아니라 방향이다." }, // 명언으로 유명
  { movieId: 17, content: "희망은 있어. 단, 싸워야 얻을 수 있지." }, // 부산행
  { movieId: 18, content: "우리가 돈이 없지, 가오가 없냐!" }, // 풍문으로 들었소
  { movieId: 19, content: "거기 아무도 없어요?" }, // 곡성
  { movieId: 20, content: "I'm gonna make him an offer he can't refuse." }, // The Godfather
  { movieId: 21, content: "May the Force be with you." }, // Star Wars
  { movieId: 22, content: "You talking to me?" }, // Taxi Driver
  { movieId: 23, content: "I’ll be back." }, // The Terminator
  { movieId: 24, content: "Why so serious?" }, // The Dark Knight
  { movieId: 25, content: "My precious..." }, // The Lord of the Rings
  { movieId: 26, content: "Life is like a box of chocolates." }, // Forrest Gump
  { movieId: 27, content: "With great power comes great responsibility." }, // Spider-Man
  { movieId: 28, content: "I am Iron Man." }, // Avengers: Endgame
  { movieId: 29, content: "You shall not pass!" }, // The Lord of the Rings
];

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * Quotes.length);
  famous.value = Quotes[randomIndex];
});
</script>
