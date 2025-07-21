<template>
  <div class="relative z-10 flex justify-center items-center w-full px-4">
    <!-- 퀴즈 카드 -->
    <div
      :class="[
        'relative z-20 max-w-6xl w-full rounded-2xl px-14 py-8 flex flex-col md:flex-row items-center gap-12 shadow-[0_8px_30px_rgba(0,0,0,0.4)] bg-gradient-to-tr from-neutral-900 to-zinc-800 border border-neutral-700',
        { 'animate-shake': isShaking },
      ]"
    >
      <!-- 좌측: 설명 -->
      <div class="flex-1 text-center md:text-left space-y-4">
        <p class="text-gray-400">
          아래 이모지가 어떤 영화를 의미하는지 맞혀보세요.
        </p>
        <div class="text-5xl mt-6 select-none">{{ currentQuiz.emojis }}</div>
        <p class="mt-4 text-sm font-semibold" :class="feedbackColor">
          {{ feedback }}
        </p>
      </div>

      <!-- 우측: 입력 폼 -->
      <div class="flex flex-col items-center gap-4 w-[500px]">
        <input
          v-model="userAnswer"
          @keydown.enter="checkAnswer"
          type="text"
          placeholder="영화 제목을 입력하세요"
          class="w-full text-sm px-5 py-2 rounded-lg bg-white/10 border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
        <div class="flex gap-4 w-full">
          <button
            @click="checkAnswer"
            class="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition"
          >
            정답 확인
          </button>
          <button
            @click="nextQuiz"
            class="flex-1 border border-gray-400 hover:bg-white/10 text-white font-semibold py-2 rounded-lg transition"
          >
            다음 퀴즈
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const quizzes = [
  { emojis: "🌀🧠💤🏙️💥", answer: "인셉션" },
  { emojis: "🌌🧝‍♂️🐉🌿", answer: "아바타" },
  { emojis: "❄️👸⛄🎶", answer: "겨울왕국" },
  { emojis: "🌌🛰️🕳️⏳", answer: "인터스텔라" },
  { emojis: "🛡️💥🧤🦸‍♂️", answer: "어벤져스" },
  { emojis: "🧛‍♂️🦇🏰🌃", answer: "드라큘라" },
  { emojis: "🚢🧊💔🌊", answer: "타이타닉" },
  { emojis: "🧙‍♂️🧝‍♂️💍🔥", answer: "반지의 제왕" },
  { emojis: "⚡🧙‍♂️🏰🦉", answer: "해리포터" },
  { emojis: "🦖🌴🚁🧬", answer: "쥬라기 공원" },
  { emojis: "👨‍🚀🌕🚀🇺🇸", answer: "퍼스트맨" },
  { emojis: "🤖👦🧠🚪", answer: "A.I." },
  { emojis: "👩‍🔬🧪🚬⚛️", answer: "오펜하이머" },
  { emojis: "🧔🐺❄️🩸", answer: "레버넌트" },
  { emojis: "🐼🥋🐉🍜", answer: "쿵푸팬더" },
  { emojis: "🧑‍🍳🐭🇫🇷🍝", answer: "라따뚜이" },
  { emojis: "👨‍👧🚗🏃‍♂️🧟", answer: "부산행" },
  { emojis: "🎈🏠👴🏻🌄", answer: "업" },
  { emojis: "👮‍♂️🤖🔫🌆", answer: "로보캅" },
  { emojis: "🧍‍♂️💊🔫🚨", answer: "매트릭스" },
  { emojis: "😈👗🔥🗽", answer: "악마는 프라다를 입는다" },
  { emojis: "🦊👨‍👦🌳🪤", answer: "판의 미로" },
  { emojis: "👨‍⚖️🧠⚖️👁️", answer: "정의는 없다" },
  { emojis: "🏎️🏁👨‍🔧🔥", answer: "포드 V 페라리" },
  { emojis: "👧🎭🚪👻", answer: "오펀" },
  { emojis: "😴🛏️🛌🔁", answer: "사랑의 블랙홀" },
  { emojis: "👨‍🏫🎹🎼👻", answer: "소울" },
  { emojis: "🤠🐍🏺🌍", answer: "인디아나 존스" },
  { emojis: "🎭🔪📞👻", answer: "스크림" },
  { emojis: "🚘👨‍👩‍👧‍👦🎉📆", answer: "패밀리맨" },
  { emojis: "🦸‍♀️🛡️🌆🚁", answer: "원더우먼" },
  { emojis: "🐧❄️🎤💃", answer: "해피피트" },
];

const currentIndex = ref(0);
const currentQuiz = ref(quizzes[currentIndex.value]);
const userAnswer = ref("");
const feedback = ref("");
const feedbackColor = ref("");
const isShaking = ref(false);

const checkAnswer = () => {
  const trimmed = userAnswer.value.trim().toLowerCase();
  const correct = currentQuiz.value.answer.toLowerCase();

  if (!trimmed) {
    feedback.value = "정답을 입력해주세요.";
    feedbackColor.value = "text-black";
    return;
  }

  if (trimmed === correct) {
    feedback.value = "정답입니다! 다음 퀴즈로 넘어가보세요!";
    feedbackColor.value = "text-green-400";
  } else {
    feedback.value = "틀렸어요! 다시 한 번 생각해보세요.";
    feedbackColor.value = "text-red-400";

    // 흔들림 애니메이션 트리거
    isShaking.value = true;
    setTimeout(() => {
      isShaking.value = false;
    }, 400); // 애니메이션 시간과 동일하게 맞춤
  }
};

const nextQuiz = () => {
  currentIndex.value = (currentIndex.value + 1) % quizzes.length;
  currentQuiz.value = quizzes[currentIndex.value];
  userAnswer.value = "";
  feedback.value = "";
};
</script>
