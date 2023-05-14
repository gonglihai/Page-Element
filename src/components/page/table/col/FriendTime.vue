<template>
  <!-- 显示模式1, 默认显示友好时间, 鼠标 hover 显示具体时间 -->
  <el-tooltip v-if="showMode" effect="dark" :content="time" placement="top" :show-after="300" :show-arrow="false"
    :enterable="false">
    <span style="cursor:default">{{ friendTime }}</span>
  </el-tooltip>

  <!-- 显示模式2, 默认显示友好时间, 点击切换显示具体时间 -->
  <span v-else title="点击切换显示方式" style="cursor:default" @click="isFriend = !isFriend">
    {{ isFriend ? friendTime : time }}
  </span>
</template>
<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import moment from '../../util/TimeUtil'

const props = defineProps(['time']);

// todo 全局配置 显示模式
const showMode = false;

const isFriend = ref(true);

const friendTime = computed(() => {
  return moment(props.time, 'YYYY-MM-DD HH:mm:ss').fromNow();
});
</script>