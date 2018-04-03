<template>
  <el-dialog
    custom-class="dialog-box form-dialog"
    :title="options.title"
    :visible.sync="visible"
    :show-close="false"
    :width="options.width">
    <e-form
      ref="dialogForm"
      :form="form"
      :opts="formOpts"
      :options="formOptions" />
    <span slot="footer">
      <el-button
        :type="item.type"
        v-for="item,index in options.footOpts"
        :key="index"
        @click="() => {item.clickFn($refs['dialogForm'].$refs['form'])}">{{item.label}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import EForm from './Form'

export default {
  name: 'v-form-dialog',
  props: {
    value: Boolean,
    options: Object,
    form: Object,
    formOpts: Object,
    formOptions: Object
  },
  computed: {
    visible: {
      get: function () {
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      }
    }
  },
  components: {
    EForm
  }
}
</script>
