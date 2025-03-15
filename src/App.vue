<script setup lang="ts">
import { reactive, ref } from 'vue';
import ConferenceForm from './components/index.ts'
import SubmittedTicket from './components/SubmittedTicket.vue';
type Values = {
    avatar: File | null;
    fullName: string;
    email: string;
    userName: string;
}
const data = reactive<Values>({ avatar: null, fullName: '', email: '', userName: '' })
const success = ref(false)
const onSubmit = (values: Values) => {
  Object.assign(data, values)
  success.value = true
}
</script>

<template>
  <main class="w-full h-full min-h-screen max-w-full font-inconsolata flex flex-col items-center justify-start
   p-8 gap-y-4 bg-neutral-900 bg-desktop
    before:bg-[url('./src/assets/pattern-squiggly-line-top.svg'),_url('./src/assets/pattern-lines.svg')]
    before:bg-right-top before:w-full
     after:w-full before:absolute
    before:top-0 before:right-0
    before:h-80 after:absolute 
    after:-z-0
    after:bottom-0 after:left-0 
    after:h-80  after:bg-no-repeat after:bg-contain before:bg-no-repeat 
    before:max-w-full after:max-w-full max-md:bg-tablet max-sm:bg-mobile bg-[center_center] bg-cover bg-no-repeat
    after:bg-bottom-squiggly after:bg-left-bottom">
    <ConferenceForm v-if="!success"  @submit="onSubmit" />
    <SubmittedTicket v-else  v-bind:data="data"/>
  </main>
</template>
