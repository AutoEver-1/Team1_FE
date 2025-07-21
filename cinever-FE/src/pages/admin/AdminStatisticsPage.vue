<template>
  <div class="max-w-4xl mx-auto">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getWithdrawalCnt,
  getTotalMember,
  getRegisterCnt,
} from "../../api/adminApi";
import Chart from "chart.js/auto";

const chartCanvas = ref(null);
let chartInstance = null;

const labels = ref([]);
const withdrawalData = ref([]);
const registerData = ref([]);
const totalMember = ref(0);
const year = ref(0);

const fetchStatistics = async (dateType) => {
  // ✅ 데이터 받아오기
  const withdrawalRes = await getWithdrawalCnt(dateType);
  const registerRes = await getRegisterCnt(dateType);
  const totalRes = await getTotalMember();

  console.log("탈퇴자:", withdrawalRes);
  console.log("가입자:", registerRes);
  console.log("총 멤버:", totalRes);

  year.value = withdrawalRes.year; // ✅ 연도 저장

  labels.value = withdrawalRes.withdrawalCountList.map((item) => {
    const month = Object.keys(item)[0];
    return `${month}월`;
  });

  withdrawalData.value = withdrawalRes.withdrawalCountList.map((item) => {
    const month = Object.keys(item)[0];
    return item[month];
  });

  registerData.value = registerRes.registerCountList.map((item) => {
    const month = Object.keys(item)[0];
    return item[month];
  });

  totalMember.value = totalRes.totalMember;

  const totalMemberArray = Array(12).fill(totalMember.value);

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
          text: `${year.value}년 회원 통계`,
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
};

onMounted(() => {
  fetchStatistics(1);
});
</script>
