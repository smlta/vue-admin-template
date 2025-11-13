<template>
  <el-dialog title="添加子部门" :visible="showDialog" @close="close"> <!--通过showDialog prop动态控制弹框的显示隐藏-->
    <span>添加子部门弹框</span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
