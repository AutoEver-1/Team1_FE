<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMoviesBySearch, getTopRated } from "../../api/movieApi";
import { debounce } from "../../services/debounce";
// import { debounce } from "lodash";

const props = defineProps({
  modelValue: String, // 검색 input의 값
  placeholder: { type: String, default: "검색어 입력" },
  icon: [Object, Function], // 컴포넌트
  color: { type: String, default: "white" }, // 아이콘 색상
  hoverBg: { type: String, default: "bg-gray-800" }, // hover 배경색
  borderColor: { type: String, default: "border-2 border-white" }, // 아이콘 테두리 색상
});

const emit = defineEmits(["update:modelValue"]);

const route = useRoute(); // 현재 라우트 객체
const router = useRouter(); // 페이지 이동

// ======= 상태 변수 =======
const isOpen = ref(false); // 검색창 열림 여부
const inputRef = ref(null); // 검색 input 요소 참조
const results = ref([]); // 자동완성 결과 리스트
const resultList = ref([]); // 자동완성 객체 리스트
const keyword = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    keyword.value = newVal;
  }
);
const isResultOpen = ref(false); // 추천 검색어 UI 열림 여부
const preventResultOpen = ref(false); // 추천 검색어 차단 여부

// ======= 함수 정의 =======
// 인기 영화 가져오기
const getRecommendedMovieList = async () => {
  if (preventResultOpen.value) return; // 추천 검색어 차단 시 즉시 종료

  try {
    const res = await getMoviesBySearch({
      searchType: "TITLE",
      content: keyword.value,
    });

    // 키워드 영화 검색 미리보기
    resultList.value = res.movieList?.content || [];
    console.log(resultList.value);

    // 초기 상태에 전체 영화 데이터를 results에 넣음
    results.value = resultList.value.map((movie) => movie.title);

    isResultOpen.value = results.value.length > 0; // 추천 목록 열기
  } catch (error) {
    console.error("영화 키워드 검색 실패:", error);
    isResultOpen.value = false; // 추천 목록 닫기
  }
};

// debounce 적용 (lodash)

// const getTopRatedMovieList = debounce(async () => {
//   try {
//     const res = await getTopRated();
//     topRatedMovieList.value = res.data.movieList || [];
//     console.log(res);

//     // 초기 상태에 전체 영화 데이터를 results에 넣음
//     results.value = topRatedMovieList.value.map((movie) => movie.title);
//   } catch (error) {
//     console.error("인기 영화 불러오기 실패:", error);
//   }
// }, 500);

// debounce 적용 (사용자 정의)
const debouncedSearch = debounce(getRecommendedMovieList, 500);

// 검색어 변경될 때마다 data fetch
const updateValue = (event) => {
  keyword.value = event.target.value;

  preventResultOpen.value = false; // 검색어 다시 입력하면 추천 검색어 허용

  emit("update:modelValue", keyword.value);
  debouncedSearch();
};

// 검색어 선택 시
const selectKeyword = (item) => {
  preventResultOpen.value = true; // 추천 검색어 차단

  emit("update:modelValue", item);
  results.value = [];
  isResultOpen.value = false; // 추천창 닫기

  router.push({
    path: "/search",
    query: { keyword: item },
  });
};

// 검색창 열기/닫기 토글
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      inputRef.value?.focus();
      setTimeout(() => {
        getRecommendedMovieList();
      }, 500); // 슬라이드 애니메이션 duration(ms)에 맞춤
    });
  }
};

// 외부 클릭 시 닫기
const handleClickOutside = (event) => {
  if (!event.target.closest(".slide-search-input")) {
    if (props.modelValue?.trim()) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }
};

// 엔터키로 검색 실행
const handleEnter = (event) => {
  if (event.key === "Enter" && props.modelValue.trim()) {
    preventResultOpen.value = true; // 추천 검색어 차단

    router.push({
      path: "/search",
      query: { keyword: props.modelValue.trim() },
    });
  }
  isResultOpen.value = false; // 추천 목록 닫기
};

// ======= 생명주기 & watch =======

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  if (props.modelValue?.trim()) {
    isOpen.value = true;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 라우트 변경 시 검색창 닫기
watch(
  () => route.fullPath,
  (newPath) => {
    if (!newPath.startsWith("/search")) {
      isOpen.value = false;
      // emit("update:modelValue", ""); // 값 초기화
    }
  }
);

// 검색창 닫힐 때 입력값 초기화
watch(isOpen, (newVal) => {
  if (!newVal) {
    emit("update:modelValue", "");
  }
});
</script>

<template>
  <div
    class="slide-search-input relative flex items-center select-none transition-all duration-300 rounded-full cursor-pointer"
    :class="[
      isOpen
        ? ` w-60 md:w-72 px-2 border-2 border-amber-600`
        : 'w-9 bg-transparent',
    ]"
  >
    <!-- 돋보기 버튼 -->
    <div
      class="w-9 h-9 rounded-full flex items-center justify-center"
      :class="[hoverBg]"
      @click="toggleOpen"
    >
      <component :is="icon" class="w-5 h-5" :class="`text-${color}`" />
    </div>

    <!-- 돋보기와 입력창 사이 작은 구분선 -->
    <div v-if="isOpen" class="relative pl-4">
      <div
        class="absolute left-1 top-1/2 -translate-y-1/2 h-3 border-l border-amber-500"
      ></div>
    </div>

    <!-- 검색 input -->
    <input
      v-if="isOpen"
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="updateValue"
      @keydown.enter="handleEnter"
      :placeholder="placeholder"
      class="ml-1 w-5/6 bg-transparent text-sm font-light text-white placeholder-white/40 outline-none"
    />

    <!-- 연관검색어 목록 -->
    <ul
      v-if="isOpen && results.length > 0 && isResultOpen"
      class="absolute top-full left-0 w-full mt-1.5 bg-black/80 border border-white/20 rounded-lg shadow-lg z-50"
    >
      <li
        v-for="(title, index) in results.slice(0, 10)"
        :key="index"
        @click="selectKeyword(title)"
        class="text-sm px-3 py-1.5 cursor-pointer hover:bg-amber-500/80 hover:text-amber-900 transition"
      >
        {{ title }}
      </li>
    </ul>
  </div>
</template>
