<script setup>
import BaseCard from "../common/BaseCard.vue";
import BaseRating from "../common/BaseRating.vue";
import BaseBadge from "../common/BaseBadge.vue";
import BaseModal from "../common/BaseModal.vue";
import BaseProfileImage from "../common/BaseProfileImage.vue";
import { ref, computed } from "vue";
import {
  CalendarIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  StarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  UserCircleIcon,
  PhotoIcon,
} from "@heroicons/vue/24/outline";

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

const uniqueDirectors = computed(() => {
  const seen = new Set();
  return (props.dataList.director || []).filter((d) => {
    if (seen.has(d.personId)) return false;
    seen.add(d.personId);
    return true;
  });
});
</script>
<template>
  <div class="space-y-3">
    <BaseCard title="개봉" :content="dataList.releaseDate.split('-')[0]">
      <template #icon>
        <CalendarIcon class="w-5 h-5" />
      </template>
    </BaseCard>

    <BaseCard title="장르">
      <template #icon>
        <Squares2X2Icon class="w-5 h-5" />
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
        <GlobeAltIcon class="w-5 h-5" />
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
        <StarIcon class="w-5 h-5" />
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
                  {{
                    dataList.averageScore
                      ? dataList.averageScore?.toFixed(2)
                      : "-"
                  }}
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
        <BuildingOfficeIcon class="w-5 h-5" />
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
              <img
                :src="'https://image.tmdb.org/t/p/original' + company.name"
                class="w-full object-cover"
              />
            </div>
            <div class="w-20 text-xs text-gray-500 font-medium mt-2">
              {{ company.logo_path }}
            </div>
          </div>
        </div>
      </template>
    </BaseCard>

    <BaseCard title="감독">
      <template #icon>
        <UserCircleIcon class="w-5 h-5" />
      </template>
      <template #contents>
        <BaseCard
          v-for="d in uniqueDirectors"
          :key="d.personId"
          backgroundColor="black"
          class="flex gap-4 cursor-pointer hover:bg-white/5 transition"
          @click="openPersonModal(d)"
        >
          <template #contents>
            <div class="w-16 h-16 rounded-full overflow-hidden">
              <img :src="d.profilePath" class="w-full h-full object-cover" />
            </div>
            <div class="space-y-0">
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

    <BaseCard title="배우" class="w-[43vw]">
      <template #icon>
        <UserGroupIcon class="w-5 h-5" />
      </template>
      <template #contents>
        <div>
          <div class="flex gap-6 w-[100%] overflow-x-scroll overflow-y-hidden">
            <div
              class="flex flex-col items-center min-w-20 text-center cursor-pointer overflow-hidden"
              v-for="actor in dataList.actors"
              @click="openPersonModal(actor)"
            >
              <BaseProfileImage
                :src="actor.profilePath"
                class="w-20 h-20 rounded-full object-cover"
                size="80px"
              />
              <div class="text-xs text-gray-500 font-medium mt-1">
                {{ actor.name }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseCard>

    <BaseCard title="스틸컷">
      <template #icon>
        <PhotoIcon class="w-5 h-5" />
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
