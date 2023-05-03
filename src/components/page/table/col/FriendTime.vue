<template>
  <span title="点击切换显示方式" style="cursor:default" @click="isFriend = !isFriend">{{ isFriend ? friendTime : time }}</span>
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import moment from '../../util/TimeUtil'


const props = defineProps(['time']);
const isFriend = ref(true);
const friendTime = computed(() => {
  return moment(props.time, 'YYYY-MM-DD HH:mm:ss').fromNow();
});
</script>