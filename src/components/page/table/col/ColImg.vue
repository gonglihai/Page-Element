<!-- 图片 -->
<!-- 标签列 -->
<template>
  <el-table-column :fixed="col.fixed"
    :width="defaultValue(col.width, DefaultConfig.table.col.img.width + DefaultConfig.table.col.img.padding)"
    :align="defaultValue(col.align, 'center')" :label="defaultValue(col.name, '图片')">
    <template #default="scope">
      <!-- 单图 -->
      <el-image @click.stop v-if="col.type == 'img'" :src="imgUrl(scope)" :style="computeStyle" :preview-src-list="imgUrls(scope)"
        preview-teleported hide-on-click-modal fit="contain">
        <template #error>
          <div class="col-img-error-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>

      <!-- 多图 -->
      <template v-else-if="col.type == 'imgs'">
        <el-image @click.stop :style="computeStyle" :src="imgsUrl(scope)" :preview-src-list="imgsUrls(scope)" preview-teleported
          hide-on-click-modal :infinite="false" fit="contain">
          <template #error>
            <div class="col-img-error-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </template>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import type { Col, Img } from '../Types';
import { defaultValue } from "../../util/DefaultValue";
import { toArray } from "../../util/ArrayUtil";
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { DefaultConfig } from "../../DefaultConfig";

const props = defineProps<{
  col: Col & Img
}>();

/**
 * 单图 url
 * @param scope element plus datatable scope
 */
function imgUrl(scope: any): string {
  return defaultValue(scope.row[props.col.field], undefined);
}

/**
 * 单图预览
 * @param scope element plus datatable scope
 */
function imgUrls(scope: any): Array<string> {
  return [imgUrl(scope)];
}

/**
 * 多图 url
 * @param scope element plus datatable scope
 */
function imgsUrl(scope: any): string {
  return imgsUrls(scope)[0];
}

/**
 * 多图预览
 * @param scope element plus datatable scope
 */
function imgsUrls(scope: any): Array<string> {
  return toArray(scope.row[props.col.field]);
}

/**
 * 图片样式计算属性, 高宽
 */
const computeStyle = computed(() => {
  const r = {
    width: '',
    height: ''
  };

  // 宽度
  if (props.col.width) {
    r.width = props.col.width - DefaultConfig.table.col.img.padding + 'px';
  } else {
    r.width = DefaultConfig.table.col.img.width + 'px'
  }

  // 高度
  if (props.col.height) {
    r.height = props.col.height - DefaultConfig.table.col.img.padding + 'px';
  } else {
    r.height = DefaultConfig.table.col.img.height + 'px';
  }

  return r;
});
</script>
<style>
.col-img-error-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-img-error-slot .el-icon {
  font-size: 30px;
}
</style>