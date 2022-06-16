<script setup>

useHead({
  title: 'Home',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8'
})

const { pending, data: messages } = await useLazyFetch('http://localhost:5000/974762032832323634/messages')

watch(messages, (newMessages) => {

})

</script>

<template>
  <div v-if="pending">
    Loading ...
  </div>
  <div class="main" v-else>
    <div v-for="message in messages" :key="message.id">
        <div v-for="archive in message.archive" :key="archive.id">
          <Message :content=archive.content :user=archive.user />
        </div>
    </div>
  </div>
</template>

<style>
  #main {
    display: flex;
    justify-content: center;
  }
</style>