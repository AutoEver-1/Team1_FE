<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">회원 통계 차트</h2>
      <div class="flex space-x-2">
        <button
          @click="changeType('month')"
          :class="[
            'px-4 py-2 rounded shadow',
            dateType === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          월별
        </button>
        <button
          @click="changeType('day')"
          :class="[
            'px-4 py-2 rounded shadow',
            dateType === 'day'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          일별
        </button>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getWithdrawalCnt,
  getRegisterCnt,
  getTotalMember,
} from "../../api/adminApi";
import Chart from "chart.js/auto";

const chartCanvas = ref(null);
let chartInstance = null;

const labels = ref([]);
const withdrawalData = ref([]);
const registerData = ref([]);
const totalMember = ref(0);
const year = ref(0);

const dateType = ref("month");

/**
 * 회원 통계 데이터 불러오기 및 차트 렌더링
 */
const fetchStatistics = async () => {
  try {
    const withdrawalRes = await getWithdrawalCnt(dateType.value);
    const registerRes = await getRegisterCnt(dateType.value);
    const totalRes = await getTotalMember();

    year.value = withdrawalRes.year;

    labels.value = withdrawalRes.withdrawalCountList.map((item) => {
      const key = Object.keys(item)[0];
      return dateType.value === "month" ? `${key}월` : `${key}일`;
    });

    withdrawalData.value = withdrawalRes.withdrawalCountList.map((item) => {
      const key = Object.keys(item)[0];
      return item[key];
    });

    registerData.value = registerRes.registerCountList.map((item) => {
      const key = Object.keys(item)[0];
      return item[key];
    });

    totalMember.value = totalRes.totalMember;

    const totalMemberArray = Array(labels.value.length).fill(totalMember.value);

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(chartCanvas.value, {
      type: "line",
      data: {
        labels: labels.value,
        datasets: [
          {
            label: "총 멤버 수",
            data: totalMemberArray,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            fill: false,
            borderDash: [5, 5],
            tension: 0,
          },
          {
            label: "가입자 수",
            data: registerData.value,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "탈퇴자 수",
            data: withdrawalData.value,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: `${year.value}년 회원 통계 (${
              dateType.value === "month" ? "월별" : "일별"
            })`,
            font: {
              size: 18,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("회원 통계 불러오기 실패:", err);
  }
};

/**
 * 버튼 핸들러
 */
const changeType = (type) => {
  if (dateType.value !== type) {
    dateType.value = type;
    fetchStatistics();
  }
};

onMounted(() => {
  fetchStatistics();
});
</script>
