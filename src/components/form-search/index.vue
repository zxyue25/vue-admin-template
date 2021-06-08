<template>
  <div class="form-search-container">
    <!-- 放选项卡 -->
    <slot></slot>
    <el-form
      class="form-search-container__form"
      :inline="true"
      label-suffix=":"
      :label-width="labelWidth"
      :style="value.length % 3 == 0 && !collapse ? 'padding-bottom: 40px;' : ''"
    >
      <form-search-item
        v-for="(item, index) in formList"
        :key="index"
        :type="item.type"
        :label="item.label"
        :placeholder="item.placeholder"
        :options="item.options"
        :name="item.key"
        :isSlot="item.isSlot"
        :filterable="item.filterable"
        v-bind:value.sync="item.value"
      >
        <template v-slot:[item.key]>
          <slot :name="Array.isArray(item.key) ? item.key[0] : item.key"></slot>
        </template>
      </form-search-item>
      <el-form-item
        class="form-search-container__item form-search-container__btn"
      >
        <el-button type="primary" size="medium" @click="handleSearch"
          >查询</el-button
        >
        <el-button @click="resetForm" size="medium">重置</el-button>
        <el-button v-if="value.length > 2 && !hideCollapse" type="text" @click="handleCollapse"
          >{{ collapse ? '展开' : '收起' }}
          <i v-if="!collapse" class="el-icon-arrow-up"></i>
          <i v-else class="el-icon-arrow-down"></i>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import FormSearchItem from './components/form-search-item'
import bus from '../../utils/event-bus'
export default {
  components: { FormSearchItem },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '80px',
    },
    hideCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formList() {
      this.$nextTick(() => {
        bus.emit('form-search-collapse')
      })
      return this.collapse ? this.value.slice(0, 2) : this.value
    },
  },
  data() {
    return {
      collapse: false,
      initObj: {},
    }
  },
  created() {
    this.value.map((item) => {
      Object.assign(this.initObj, { [item.key]: item.value })
    })
  },
  methods: {
    resetForm() {
      this.value.map((item) => {
        item.value = this.initObj[item.key]
      })
      this.$emit('update:value', this.value)
      this.$emit('reset-click', this.initObj)
    },
    handleSearch() {
      const resObj = {}
      this.value.map((item) => {
        if (Array.isArray(item.key)) {
          item.key.map((keyItem, index) => {
            Object.assign(resObj, { [keyItem]: item.value[index] })
          })
        } else {
          Object.assign(resObj, { [item.key]: item.value })
        }
      })
      this.$emit('update:value', this.value)
      this.$emit('search-click', resObj)
    },
    handleCollapse() {
      this.collapse = !this.collapse
      bus.emit('form-search-collapse')
    },
  },
}
</script>

<style lang="less" scoped>
.form-search-container {
  background-color: #fff;
  margin-bottom: 8px;
  padding: 16px 10px 0;
}

.form-search-container__form {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.form-search-container__item {
  flex: 0 0 30%;
  height: 32px;
}

.form-search-container__btn {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 10px;
}
</style>
