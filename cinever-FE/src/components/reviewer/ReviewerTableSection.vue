<template>
  <table class="min-w-full text-left text-sm text-white">
    <thead class="text-xs uppercase text-yellow-400 border-b border-yellow-400">
      <tr>
        <th class="px-6 py-4">User name</th>
        <th class="px-6 py-4">like</th>
        <th class="px-6 py-4">reviews</th>
        <th class="px-6 py-4">movie</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 4" :key="i" class="border-b border-[#FFD40063]">
        <td class="flex items-center gap-3 px-6 py-4">
          <img src="/src/assets/Avatar.png" alt="img" class="w-8 h-8 rounded" />
          <span>Text</span>
        </td>
        <td class="px-6 py-6">Text</td>
        <td class="px-6 py-6">Text</td>
        <td class="px-6 py-6">Text</td>
      </tr>
    </tbody>
  </table>
</template>
