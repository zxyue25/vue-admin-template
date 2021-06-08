<template>
  <el-form-item
    :label="label"
    class="form-search-container__item"
    :prop="Array.isArray(name) ? name[0] : name"
  >
    <slot v-if="isSlot" :name="name"></slot>
    <el-input
      v-if="type === 'input' && !isSlot"
      :placeholder="placeholder"
      v-model="value2"
      @change="handleChange"
    ></el-input>

    <el-select
      v-if="type === 'select'"
      v-model="value2"
      :placeholder="placeholder"
      @change="handleChange"
      :filterable="filterable"
    >
      <el-option
        v-for="(item, index) in options.list"
        :key="index"
        :label="item[options.label || 'label']"
        :value="item[options.value || 'value']"
      ></el-option>
    </el-select>

    <el-date-picker
      v-if="type === 'time'"
      type="daterange"
      v-model="value2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
      @change="getTime"
    >
    </el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'input', //select
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Array],
      default: '',
    },
    options: {
      type: Object,
      default: () => {
        return {
          list: [],
          label: 'label',
          value: 'value',
        }
      },
    },
    name: {
      type: [String, Array],
      default: () => '',
    },
    isSlot: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      value2: this.value,
    }
  },
  watch: {
    value(val) {
      this.value2 = val
    },
  },
  methods: {
    handleChange() {
      this.$emit('update:value', this.value2)
    },
    getTime(timeVl) {
      if (timeVl) {
        this.value2 = [timeVl[0].getTime(),timeVl[1].getTime()]
      }
      !this.value2 && (this.value2 = '')
      this.handleChange()
    },
  },
}
</script>

<style lang="less" scoped>
.form-search-container__item {
  flex: 0 0 30%;
}
.el-range-editor.el-input__inner {
  width: 245px;
}

.form-search-container__item /deep/ .el-form-item__content {
  width: 242px;
}

.form-search-container__item /deep/ .el-form-item__content .el-select {
  width: 100%;
}

.el-form-item {
  margin-bottom: 10px;
  display: flex;
}
</style>
