<script lang="ts" setup>
import logo from "../assets/logo-mark.svg";
import dropZoneIcon from "../assets/icon-upload.svg";
import { ref, onUnmounted } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const emits = defineEmits(['submit'])
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { processFile } from "@/lib/utils";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = toTypedSchema(
  z.object({
    avatar: z
      .instanceof(File)
      .nullable()
      .refine((file) => file === null || file?.size <= MAX_FILE_SIZE, `File too large. please upload a photo under 500KB.`)
      .refine(
        (file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    fullName: z.string().min(1,'please enter a full name').max(32),
    email: z.string().email("Please enter a valid email address."),
    userName: z.string().min(1,"please enter a username").max(32),
  })
);

const imageData = ref<string | null>(null);
const componentMounted = ref(true);
const fileInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
  emits('submit', values)
});

onUnmounted(() => {
  console.log("Component Unmounted");
  componentMounted.value = false;
})

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files[0]) {
    const file = input.files[0];
    form.setFieldValue("avatar", file);
    try {
      const dataUrl = await processFile(file, componentMounted);
      imageData.value = dataUrl;
    } catch (error) {
      imageData.value = null
    }
  } else {
    form.setFieldValue("avatar", null);
    imageData.value = null
  }
};

const removeImage = ()=>{
  form.resetField("avatar")
  imageData.value = ""
}

const changeImage = () => {
  console.log("changeImage: changing image")
    if(fileInput.value){
      fileInput.value.click()
    }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center max-w-2xl  w-full relative z-10">
    <div class="flex items-center justify-between gap-x-4">
      <img :src="logo" alt="logo of coding conference" class="w-full h-full max-w-10" />
      <span class="text-neutral-0 font-bold text-xl leading-relaxed">Coding Conf</span>
    </div>

    <hgroup class="flex flex-col items-center justify-center w-full gap-y-4">
      <h1 class="text-5xl text-neutral-50 font-bold text-center capitalize break-words">Your journey to coding conf 2025
        starts here!</h1>
      <p class=" first-letter:capitalize text-neutral-500 text-lg text-center font-semibold">secure your spot at next
        years biggest coding conference.</p>
    </hgroup>

    <form @submit="onSubmit" class="flex flex-col items-center justify-center gap-y-4 w-full max-w-sm">
      <FormField v-slot="{ componentField }" name="avatar">
        <FormItem class="w-full">
          <FormLabel class="flex flex-col items-start justify-between gap-y-2">
            <span class="text-neutral-50">Upload Avatar</span>
            <FormControl>
              <input type="file" v-bind="componentField" class="hidden" @input="handleFileChange" ref="fileInput" />
              <div
                class=" hover:cursor-pointer text-white w-full p-4 bg-neutral-700/20 border border-neutral-500 border-dashed rounded-lg flex flex-col items-center justify-center gap-y-4">
                <div v-if="!imageData" class="p-2 bg-neutral-700/50 rounded-lg border border-neutral-300">
                  <img :src="dropZoneIcon" alt="dropzone Icon" />
                </div>
                <span v-if="!imageData" class="text-neutral-500">Drag and Drop or click to upload</span>

                <div v-if="imageData" class="flex flex-col items-center justify-center gap-y-4">
                  <img :src="imageData" alt="Uploaded Avatar" class="max-w-32" />
                  <div class="flex items-center justify-between gap-x-4">
                    <Button class="bg-neutral-700/50" type="button" @click="removeImage">Remove Image</Button>
                    <Button class="bg-neutral-700/50" type="button" @click="changeImage" >change Image</Button>
                  </div>
                </div>
              </div>
            </FormControl>
          </FormLabel>
          <FormDescription>
            upload your photo (JPG or PNG, max size : 500KB)
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="fullName">
        <FormItem class="space-y-0 w-full">
          <FormLabel class="text-neutral-50">Full Name</FormLabel>
          <FormControl>
            <Input class="bg-neutral-700/20 text-neutral-0 py-4" type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField class="space-y-0" v-slot="{ componentField }" name="email">
        <FormItem class="space-y-0 w-full">
          <FormLabel class="text-neutral-50">Email Address</FormLabel>
          <FormControl>
            <Input class="bg-neutral-700/20 text-neutral-0 py-4" type="text" v-bind="componentField"
              placeholder="example@email.com" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="userName">
        <FormItem class="space-y-0 w-full">
          <FormLabel class="text-neutral-50">Github Username</FormLabel>
          <FormControl>
            <Input class="bg-neutral-700/20 text-neutral-0 py-4" type="text" v-bind="componentField"
              placeholder="@yourusername" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="w-full text-neutral-900 bg-orange-500 hover:bg-orange-500/90 font-bold" type="submit">
        Generate My Ticket
      </Button>
    </form>
  </div>
</template>