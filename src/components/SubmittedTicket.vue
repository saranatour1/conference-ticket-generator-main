<script setup lang="ts">
import ticketPattern from '../assets/pattern-ticket.svg'
import logo from "../assets/logo-mark.svg"
import githubLogo from "../assets/icon-github.svg"
import { ref, watch } from 'vue';
import { processFile } from '@/lib/utils';
type Values = {
    avatar: File | null;
    fullName: string;
    email: string;
    userName: string;
}
const props = defineProps<{ data: Values }>()
const componentMounted = ref(true);
const imageUrl = ref(''); 

const dateFormatter = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    }).format(date)
}


watch(
  () => props.data.avatar,
  async (newAvatar) => {
    if (!newAvatar) {
      imageUrl.value = '';
      return;
    }

    try {
      const dataUrl = await processFile(newAvatar, componentMounted);
      if (dataUrl) {
        imageUrl.value = dataUrl; 
      }
    } catch (e) {
      console.error('Error processing file:', e);
    }
  },
  { immediate: true } 
);
</script>
<template>
    <div class="flex flex-col items-center justify-center max-w-2xl  w-full relative z-10 gap-y-8">
        <div class="flex items-center justify-between gap-x-4">
      <img :src="logo" alt="logo of coding conference" class="w-full h-full max-w-10" />
      <span class="text-neutral-0 font-bold text-xl leading-relaxed">Coding Conf</span>
    </div>
        <hgroup class="flex flex-col items-center justify-center w-full gap-y-4">
            <h1 class="text-5xl text-neutral-50 font-bold text-center capitalize break-words">Congrats, <span class=" bg-gradient-to-br bg-gradient-text from-[#f37362] via-[#f37362] to-white   bg-clip-text  text-transparent ">{{ data.fullName }}</span>
            Your ticket is ready.
            </h1>
            <p class="first-letter:capitalize text-neutral-0 text-lg text-center max-w-sm">
                we've emailed Your ticket to
                <span class="text-orange-500">{{ data.email }}</span>
                and will send you updates in the run up to this event
            </p>
        </hgroup>

        <div class="relative w-full h-full max-h-[280px] p-8  flex items-center justify-between max-w-[600px]">
            <div  class="flex  flex-col items-start justify-between gap-y-24">
                <img :src="ticketPattern" class="absolute top-0 left-0 -z-10" />
                <div class="flex  items-start justify-start gap-x-4">
                    <img :src="logo" alt="">
                    <div class="flex flex-col items-start justify-start gap-y-4">
                        <span class="text-neutral-0 font-bold text-xl ">Coding Conf</span>
                        <span class="text-neutral-500">{{ dateFormatter(new Date("01/31/2025")) }} / Austin, TX</span>
                    </div>
                </div>
    
                <div class="flex items-end justify-start gap-x-4 w-full h-full ">
                    <img :src="imageUrl" class="size-16 aspect-square object-cover rounded-lg"/>
                    <div class="flex flex-col items-start justify-between">
                        <span class="text-white text-lg font-bold">{{ data.fullName }}</span>
                        <span class="flex text-neutral-500 items-center justify-start gap-x-2">
                            <img :src="githubLogo"/>
                            @{{ data.userName }}
                        </span>
                    </div>
                </div>
            </div>

        
                <span class="   writing-vertical-rl text-neutral-500 tracking-widest text-3xl text-center">
                    #01609
                </span>
            </div>

    </div>
</template>