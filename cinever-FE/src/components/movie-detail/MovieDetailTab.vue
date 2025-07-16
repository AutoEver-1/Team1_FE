<script setup>
import BaseCard from "../common/BaseCard.vue";
import BaseRating from "../common/BaseRating.vue";
import BaseBadge from "../common/BaseBadge.vue";
import BaseModal from "../common/BaseModal.vue";
import { ref } from "vue";

const props = defineProps({
  dataList: Object,
});

const isModalOpen = ref(false);
const showAll = ref(false);
const currentImageIndex = ref(0);
const isPersonModalOpen = ref(false);
const selectedPerson = ref(null);

const openPersonModal = (person) => {
  selectedPerson.value = person;
  isPersonModalOpen.value = true;
};

const openImageModal = (index) => {
  currentImageIndex.value = index;
  isModalOpen.value = true;
};

const nextImage = () => {
  if (
    currentImageIndex.value <
    Object.values(props.dataList.stillcutPath).length - 1
  ) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};
</script>
<template>
  <div class="space-y-3">
    <BaseCard title="개봉" :content="dataList.releaseDate.split('-')[0]">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </template>
    </BaseCard>

    <BaseCard title="장르">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
          />
        </svg>
      </template>
      <template #contents>
        <div
          class="flex flex-wrap gap-2 transition-all duration-500 ease-in-out"
        >
          <BaseBadge :dataList="dataList.genre" index="#" />
        </div>
      </template>
    </BaseCard>

    <BaseCard title="언어">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c1.657 0 3 4.03 3 9s-1.343 9-3 9-3-4.03-3-9 1.343-9 3-9z"
          />
        </svg>
      </template>
      <template #contents>
        <div
          class="flex flex-wrap gap-2 transition-all duration-500 ease-in-out"
        >
          <BaseBadge :dataList="dataList.languages" index="#" />
        </div>
      </template>
    </BaseCard>

    <BaseCard title="별점">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 2l3.09 6.26L22 9.27l-5.45 5.32L17.91 22 12 18.27 6.09 22l1.36-7.41L2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </template>
      <template #contents>
        <div class="flex gap-4 mt-1">
          <BaseCard
            backgroundColor="black"
            class="flex flex-col flex-1 justify-center items-center"
          >
            <template #contents>
              <img src="../../assets/images/logo.png" class="mt-1 w-16 h-5" />
              <BaseRating :score="dataList.averageScore" size="20" />
              <div>
                <span class="ml-2 text-xl font-medium text-amber-400">
                  {{ dataList.averageScore ? dataList.averageScore : "-" }}
                </span>
                <span class="text-xs font-medium text-gray-200 opacity-50 mt-2">
                  {{ "\u00A0/ 5.0" }}
                </span>
              </div>
            </template>
          </BaseCard>
          <BaseCard
            backgroundColor="black"
            class="flex flex-col flex-1 justify-center items-center"
          >
            <template #contents>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="IMDb"
                class="mt-1 w-10 h-5"
              />
              <BaseRating :score="dataList.tmdbScore / 2" size="20" />
              <div>
                <span class="ml-2 text-xl font-medium text-amber-400">
                  {{ dataList.tmdbScore ? dataList.tmdbScore : "-" }}
                </span>
                <span class="text-xs font-medium text-gray-200 opacity-50 mt-2">
                  {{ "\u00A0/ 10.0" }}
                </span>
              </div>
            </template>
          </BaseCard>
        </div>
      </template>
    </BaseCard>

    <BaseCard title="제작사">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path
            d="M3 2h18v20H3V2zm2 2v16h14V4H5zm3 2h2v2H8V6zm0 4h2v2H8v-2zm0 4h2v2H8v-2zm4-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"
          />
        </svg>
      </template>
      <template #contents>
        <div class="flex gap-6 w-[100%] overflow-x-scroll overflow-y-hidden">
          <div
            class="flex flex-col items-center min-w-20 text-center mt-5"
            v-for="company in dataList.productionCompanies"
          >
            <div
              class="w-20 h-20 bg-white/80 p-1 flex justify-center items-center rounded-full"
            >
              <img :src="company.logo_path" class="w-full object-cover" />
            </div>
            <div class="text-xs text-gray-500 font-medium mt-2">
              {{ company.name }}
            </div>
          </div>
        </div>
      </template>
    </BaseCard>

    <BaseCard title="감독">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M4 4h16v4H4V4zm0 6h16v10H4V10zm2 2v6h12v-6H6zm3.5-9L13 8h2l-3.5-5H9.5zm5 0L18 8h-2l-3.5-5h2z"
          />
        </svg>
      </template>
      <template #contents>
        <BaseCard
          v-for="d in dataList.director"
          backgroundColor="black"
          class="flex gap-4 cursor-pointer hover:bg-white/5 transition"
          @click="openPersonModal(d)"
        >
          <template #contents>
            <div class="w-16 h-16 rounded-full overflow-hidden">
              <img :src="d.profilePath" class="w-full h-full object-cover" />
            </div>
            <div class="sapce-y-0">
              <p class="text-sm">{{ d.name }}</p>
              <p class="text-xs text-gray-400 mt-1">
                {{ d.gender }}
              </p>
              <p class="text-xs text-gray-400 flex">
                <BaseRating :score="d.popularity / 2" size="10" />
                {{ d.popularity }}
              </p>
            </div>
          </template>
        </BaseCard>
      </template>
    </BaseCard>

    <BaseCard title="배우">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M17 10.5V7c0-1.1-.9-2-2-2H3C1.9 5 1 5.9 1 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z"
          />
        </svg>
      </template>
      <template #contents>
        <div class="flex gap-6 w-[100%] overflow-x-scroll overflow-y-hidden">
          <div
            class="flex flex-col items-center min-w-20 text-center cursor-pointer"
            v-for="actor in dataList.actors"
            @click="openPersonModal(actor)"
          >
            <img
              :src="actor.profilePath"
              class="w-20 h-20 rounded-full object-cover"
            />
            <div class="text-xs text-gray-500 font-medium mt-1">
              {{ actor.name }}
            </div>
          </div>
        </div>
      </template>
    </BaseCard>

    <BaseCard title="스틸컷">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
          />
          <circle
            cx="12"
            cy="13"
            r="4"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </template>
      <template #contents>
        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-lg overflow-hidden"
        >
          <img
            v-for="(img, index) in Object.values(dataList.stillcutPath).slice(
              0,
              showAll ? Object.values(dataList.stillcutPath).length : 6
            )"
            :key="index"
            :src="img"
            alt="스틸컷"
            class="w-full h-auto aspect-video object-cover rounded-md cursor-pointer"
            @click="openImageModal(index)"
          />
        </div>

        <div class="mt-4 flex justify-center">
          <button
            class="text-sm border px-4 py-1.5 rounded-md shadow-sm hover:bg-gray-100 transition"
            @click="showAll = !showAll"
          >
            {{ showAll ? "접기 ▲" : "펼쳐보기 ▼" }}
          </button>
        </div>
      </template>
    </BaseCard>
  </div>

  <BaseModal
    v-model:isOpen="isModalOpen"
    :contentClass="'p-0 bg-transparent shadow-none'"
  >
    <div
      class="w-[90vw] h-[90vh] bg-black rounded-lg relative mx-auto flex items-center justify-center overflow-hidden"
    >
      <img
        :src="Object.values(dataList.stillcutPath)[currentImageIndex]"
        class="max-w-full max-h-full object-contain rounded-md"
        alt="스틸컷"
      />

      <button
        @click="prevImage"
        :disabled="currentImageIndex === 0"
        class="absolute top-1/2 left-2 -translate-y-1/2 px-3 py-2 text-xl text-white bg-black/50 hover:bg-black/70 transition disabled:opacity-30 rounded"
      >
        ◀
      </button>

      <button
        @click="nextImage"
        :disabled="
          currentImageIndex === Object.values(dataList.stillcutPath).length - 1
        "
        class="absolute top-1/2 right-2 -translate-y-1/2 px-3 py-2 text-xl text-white bg-black/50 hover:bg-black/70 transition disabled:opacity-30 rounded"
      >
        ▶
      </button>
    </div>
  </BaseModal>

  <BaseModal
    v-model:isOpen="isPersonModalOpen"
    :contentClass="'w-[440px] max-w-full p-6'"
  >
    <template #header>
      <h2 class="text-xl font-semibold">상세 정보</h2>
    </template>

    <div class="flex gap-5 text-white">
      <div class="w-28 h-36 rounded-md overflow-hidden flex-shrink-0 shadow-md">
        <img
          :src="selectedPerson?.profilePath"
          alt="인물사진"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-col justify-center flex-1">
        <h3 class="text-lg font-bold leading-tight">
          {{ selectedPerson?.name }}
        </h3>

        <div
          class="flex items-center mt-1 space-x-1"
          v-if="selectedPerson.popularity"
        >
          <BaseRating :score="selectedPerson.popularity / 2" size="18" />
          <span class="text-lg font-semibold text-amber-400">
            {{ selectedPerson.popularity?.toFixed(1) ?? "-" }}
          </span>
          <span class="text-xs text-gray-400">/ 10.0</span>
        </div>

        <div
          class="mt-3 text-sm text-gray-300"
          v-if="selectedPerson.originalName"
        >
          <span class="text-gray-400 font-medium">실명: </span>
          {{ selectedPerson?.originalName || "정보 없음" }}
        </div>

        <div class="mt-1 text-sm text-gray-300" v-if="selectedPerson.gender">
          <span class="text-gray-400 font-medium">성별: </span>
          {{
            selectedPerson?.gender === "female"
              ? "여성"
              : selectedPerson?.gender === "male"
              ? "남성"
              : "정보 없음"
          }}
        </div>

        <div class="mt-1 text-sm text-gray-300" v-if="selectedPerson.character">
          <span class="text-gray-400 font-medium">캐릭터: </span>
          {{ selectedPerson?.character || "정보 없음" }}
        </div>
      </div>
    </div>
  </BaseModal>
</template>
