<template>
  <!-- ✅ 회원 통계 섹션 -->
  <section class="max-w-6xl mx-auto p-6 space-y-8">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-semibold text-gray-800">👤 회원 통계</h2>
      <div class="flex gap-2">
        <button
          @click="changeMemberType('month')"
          :class="
            buttonClass(
              memberDateType === 'month',
              'bg-amber-300',
              'bg-amber-100'
            )
          "
        >
          월별
        </button>
        <button
          @click="changeMemberType('day')"
          :class="
            buttonClass(
              memberDateType === 'day',
              'bg-amber-300',
              'bg-amber-100'
            )
          "
        >
          일별
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <canvas ref="memberChartCanvas" height="350" width="1000"></canvas>
    </div>
  </section>

  <!-- ✅ 리뷰 통계 섹션 -->
  <section class="max-w-6xl mx-auto p-6 space-y-8">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-semibold text-gray-800">📝 리뷰 통계</h2>
      <div class="flex gap-2">
        <button
          @click="changeReviewType('month')"
          :class="
            buttonClass(
              reviewDateType === 'month',
              'bg-amber-300',
              'bg-amber-100'
            )
          "
        >
          월별
        </button>
        <button
          @click="changeReviewType('day')"
          :class="
            buttonClass(
              reviewDateType === 'day',
              'bg-amber-300',
              'bg-amber-100'
            )
          "
        >
          일별
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <canvas ref="reviewChartCanvas" height="350" width="1000"></canvas>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getWithdrawalCnt,
  getRegisterCnt,
  getTotalMember,
  getReviewTrendCnt,
  getTotalReviewCnt,
} from "../../api/adminApi";
import Chart from "chart.js/auto";

/* ✅ 공통 버튼 class 함수 */
const buttonClass = (isActive, activeClass, inactiveClass) => {
  return [
    "px-4 py-2 rounded shadow transition-colors duration-200",
    isActive
      ? `${activeClass} text-black font-semibold`
      : `${inactiveClass} text-black hover:bg-amber-200`,
  ];
};

/* ✅ 회원 통계 변수 */
const memberChartCanvas = ref(null);
let memberChartInstance = null;

const memberLabels = ref([]);
const withdrawalData = ref([]);
const registerData = ref([]);
const totalMember = ref(0);
const memberYear = ref(0);
const memberDateType = ref("month");

/* ✅ 리뷰 통계 변수 */
const reviewChartCanvas = ref(null);
let reviewChartInstance = null;

const reviewLabels = ref([]);
const trendData = ref([]);
const totalReview = ref(0);
const reviewYear = ref(0);
const reviewDateType = ref("month");

/* ✅ 회원 통계 차트 불러오기 */
const fetchMemberStatistics = async () => {
  const withdrawalRes = await getWithdrawalCnt(memberDateType.value);
  const registerRes = await getRegisterCnt(memberDateType.value);
  const totalRes = await getTotalMember();
  console.log(withdrawalRes.withdrawalCountList);

  memberYear.value = withdrawalRes.year;

  if (memberDateType.value === "month") {
    memberLabels.value = withdrawalRes.withdrawalCountList.map(
      (item) => `${Object.keys(item)[0]}월`
    );
  } else {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    memberLabels.value = withdrawalRes.withdrawalCountList.map((item) => {
      const key = Object.keys(item)[0];
      const date = new Date(year, month, Number(key));
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
  }

  withdrawalData.value = withdrawalRes.withdrawalCountList.map(
    (item) => Object.values(item)[0]
  );
  registerData.value = registerRes.registerCountList.map(
    (item) => Object.values(item)[0]
  );
  totalMember.value = totalRes.totalMember;

  const totalMemberArray = Array(memberLabels.value.length).fill(
    totalMember.value
  );

  if (memberChartInstance) memberChartInstance.destroy();
  memberChartInstance = new Chart(memberChartCanvas.value, {
    type: "line",
    data: {
      labels: memberLabels.value,
      datasets: [
        {
          label: "총 멤버 수",
          data: totalMemberArray,
          borderColor: "#facc15",
          backgroundColor: "#fef9c3",
          fill: false,
          borderDash: [5, 5],
          tension: 0,
        },
        {
          label: "가입자 수",
          data: registerData.value,
          borderColor: "#3b82f6",
          backgroundColor: "#dbeafe",
          fill: true,
          tension: 0.3,
        },
        {
          label: "탈퇴자 수",
          data: withdrawalData.value,
          borderColor: "#ef4444",
          backgroundColor: "#fee2e2",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: `${memberYear.value}년 회원 통계 (${
            memberDateType.value === "month" ? "월별" : "일별"
          })`,
          font: { size: 18 },
        },
      },
      interaction: { mode: "index", intersect: false },
      stacked: false,
      scales: { y: { beginAtZero: true } },
    },
  });
};

/* ✅ 리뷰 통계 차트 불러오기 */
const fetchReviewTrend = async () => {
  const trendRes = await getReviewTrendCnt(reviewDateType.value);
  const totalRes = await getTotalReviewCnt();
  console.log(reviewDateType.value);
  console.log(trendRes.reviewCountList);

  reviewYear.value = trendRes.year;

  if (reviewDateType.value === "month") {
    reviewLabels.value = trendRes.reviewCountList.map(
      (item) => `${Object.keys(item)[0]}월`
    );
  } else {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    reviewLabels.value = trendRes.reviewCountList.map((item) => {
      const key = Object.keys(item)[0];
      const date = new Date(year, month, Number(key));
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
  }

  trendData.value = trendRes.reviewCountList.map(
    (item) => Object.values(item)[0]
  );
  totalReview.value = totalRes.totalReview;

  const totalReviewArray = Array(reviewLabels.value.length).fill(
    totalReview.value
  );

  if (reviewChartInstance) reviewChartInstance.destroy();
  reviewChartInstance = new Chart(reviewChartCanvas.value, {
    type: "line",
    data: {
      labels: reviewLabels.value,
      datasets: [
        {
          label: "총 리뷰 수",
          data: totalReviewArray,
          borderColor: "#a855f7",
          backgroundColor: "#f3e8ff",
          fill: false,
          borderDash: [5, 5],
          tension: 0,
        },
        {
          label: "작성된 리뷰 수",
          data: trendData.value,
          borderColor: "#fb923c",
          backgroundColor: "#ffedd5",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: `${reviewYear.value}년 리뷰 작성 추세 (${
            reviewDateType.value === "month" ? "월별" : "일별"
          })`,
          font: { size: 18 },
        },
      },
      interaction: { mode: "index", intersect: false },
      stacked: false,
      scales: { y: { beginAtZero: true } },
    },
  });
};

const changeMemberType = (type) => {
  if (memberDateType.value !== type) {
    memberDateType.value = type;
    fetchMemberStatistics();
  }
};
const changeReviewType = (type) => {
  if (reviewDateType.value !== type) {
    reviewDateType.value = type;
    fetchReviewTrend();
  }
};

onMounted(() => {
  fetchMemberStatistics();
  fetchReviewTrend();
});
</script>

<style>
body {
  @apply bg-gray-50;
}
</style>
