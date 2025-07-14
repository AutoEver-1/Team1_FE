<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  option: Object,
});

const selectedPerson = ref(props.option[0]);
</script>

<template>
  <Listbox v-model="selectedPerson">
    <div class="relative w-40 text-white text-sm">
      <ListboxButton
        class="relative w-full cursor-pointer rounded-md border border-amber-400 bg-black bg-opacity-70 py-2 pl-4 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
      >
        <span class="block truncate">{{ selectedPerson.name }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <ChevronUpDownIcon
            class="h-5 w-5 text-amber-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full rounded-md bg-black text-white shadow-lg ring-1 ring-amber-400 focus:outline-none"
        >
          <ListboxOption
            v-for="person in option"
            :key="person.name"
            :value="person"
            v-slot="{ active, selected }"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-amber-600 text-white' : 'text-white',
                'cursor-pointer select-none relative py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="selected ? 'font-semibold' : 'font-normal'"
                class="block truncate"
              >
                {{ person.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-400"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
