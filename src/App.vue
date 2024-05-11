<template>
  <div class="layout">
    <t-row :gutter="[4, 0]" align="middle" justify="center">
      <t-col v-for="(item, index) in list" :key="index" :xs="12" :lg="6" :xl="4" :xxl="4">
        <div class="base">
          <t-image-viewer
            v-model:visible="item.visible"
            v-model:index="targetIndex"
            :images="images"
            :title="item.title"
          >
            <template #trigger>
              <div class="image">
                <t-image :src="item.url" fit="fill" class="image--img" />
                <!--                                <img alt="test" :src="item.url" class="image&#45;&#45;img" />-->
                <div class="image--hover" @click="onOpen(index)">
                  <span><browse-icon size="1.4em" />预览</span>
                </div>
                <!--                <div class="image&#45;&#45;footer">-->
                <!--                  <span class="image&#45;&#45;title">{{ item.title }}</span>-->
                <!--                </div>-->
              </div>
            </template>
          </t-image-viewer>
        </div>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { BrowseIcon } from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';

const imagePaths = import.meta.glob('@/assets/images/*.png', { eager: true });
const imagePathArray = Object.keys(imagePaths).map((key) => {
  return {
    visible: false,
    title: 'img',
    url: imagePaths[key]?.default || '',
  };
});

const list = ref(imagePathArray);

const targetIndex = ref(0);

const images = computed(() => {
  return list.value.map((item: any) => item.url);
});

const onOpen = (index: number) => {
  list.value[index].visible = true;
  targetIndex.value = index;
};
</script>

<style scoped lang="less">
.layout {
  margin: 0 auto;
}

.base {
  text-align: center;
  width: 100%;
  //margin: 10px;
  border: 1px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}

.image {
  height: 300px;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--td-radius-small);
  overflow: hidden;
}

.image--hover {
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.image:hover .image--hover {
  opacity: 1;
  cursor: pointer;
}

.image--img {
  //width: 100%;
  //height: 100%;
  cursor: pointer;
}

.image--footer {
  z-index: 10;
  text-align: left;
  padding: 0 16px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  color: var(--td-text-color-anti);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  box-sizing: border-box;
}

.image--title {
  flex: 1;
}
</style>
