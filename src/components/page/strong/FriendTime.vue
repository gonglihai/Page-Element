<!-- 友好时间 -->
<template>
  <!-- 显示模式1, 默认显示友好时间, 鼠标 hover 显示具体时间 -->
  <el-tooltip v-if="showMode" effect="dark" :content="time" placement="top" :show-after="300" :show-arrow="false"
    :enterable="false">
    <span style="cursor:default" class="friend-time">{{ friendTime }}</span>
  </el-tooltip>

  <!-- 显示模式2, 默认显示友好时间, 点击切换显示具体时间 -->
  <span v-else :title="isFriend ? time : friendTime" :style="isFriend ? '' : 'font-size: 12px;'" class="friend-time"
    @click="click">
    {{ isFriend ? friendTime : time }}
  </span>
</template>
<script setup lang="ts">
import { defineProps, ref, computed, withDefaults, defineEmits } from 'vue';
import moment from '../util/TimeUtil'
import { DefaultConfig } from '../DefaultConfig';

const props = withDefaults(defineProps<{
  time: any,
  format?: string
}>(), {
  format: DefaultConfig.other.friendTime.format
})

// 显示模式
const showMode = DefaultConfig.other.friendTime.showMode;

// 是否显示友好时间
const isFriend = ref(DefaultConfig.other.friendTime.defaultShow);

const friendTime = computed(() => {
  return moment(props.time, props.format).fromNow();
});

const emits = defineEmits<{
  (e: 'click', event: PointerEvent, isFriend: boolean): void
}>();

function click($event: Event) {
  isFriend.value = !isFriend.value;
  emits('click', $event as PointerEvent, isFriend.value)
}
</script>
<style>
.friend-time {
  cursor: pointer;
  display: inline-block;
}
</style>