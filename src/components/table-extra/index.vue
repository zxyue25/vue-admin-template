<template>
  <div class="table-extra-container">
    <div class="table-extra-container__operate" v-if="!hideFullscreen || $scopedSlots['table-operate']">
      <div>
        <slot name="table-operate"></slot>
      </div>
      <div v-if="!hideFullscreen" class="table-extra-container__operate__right">
        <el-tooltip
          :content="isFullscreen ? '退出全屏' : '全屏'"
          placement="top"
        >
          <el-button
            icon="el-icon-scan"
            circle
            @click="handleChangeFullScreen"
          ></el-button>
        </el-tooltip>
      </div>
    </div>
    <div style="padding:10px">
      <el-table
        v-adaptive="{ bottomOffset: 85 }"
        v-loading="showLoading"
        stripe
        :data="data"
        style="width: 100%"
        ref="multipleTable"
        size="small"
        :height="height"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(item, index) in formTableData">
          <el-table-column
            :key="index"
            v-if="item.type == 'selection'"
            type="selection"
            :width="item.width"
            fixed
          >
          </el-table-column>
          <el-table-column
            :key="index"
            v-else
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :max-width="item.maxWidth"
            :min-width="item.minWidth"
            :formatter="item.formatter"
            :fixed="item.fixed"
            :sortable="item.sortable"
            :show-overflow-tooltip="item.showOverflowTooltip"
          >
            <template slot-scope="scope">
              <div v-if="item.isImg">
                <el-image
                  v-if="scope.row[item.prop]"
                  style="width: 60px; height: 60px"
                  :src="item.formatter(scope.row, scope.column)"
                  :preview-src-list="[item.formatter(scope.row, scope.column)]"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div
                v-else-if="item.formatter"
                v-html="item.formatter(scope.row, scope.column)"
              ></div>
              <span v-else v-html="scope.row[item.prop]"></span>
              <!-- <span v-else>{{ scope.row[item.prop] }}</span> -->
            </template>
          </el-table-column>
        </template>
        <slot></slot>
      </el-table>
      <div v-if="total" class="table-extra-container__pagination">
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="layout"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import adaptive from './utils/index.js'
// import bus from '../../utils/event-bus'
export default {
  directives: { adaptive },
  props: {
    tableData: {
      type: String,
      default: '',
    },
    formTableData: {
      type: Array,
      default: () => [],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    hideFullscreen: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      isFullscreen: false,
    }
  },
  computed: {
    data() {
      return JSON.parse(this.tableData) || []
    },
    showLoading() {
      return this.loading
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange',val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleChangeFullScreen() {
      this.isFullscreen = !this.isFullscreen
      // bus.emit('content-fullscreen', this.isFullscreen)
      // bus.emit('form-search-collapse')
    },
  },
}
</script>

<style>
.table-extra-container {
  background-color: #fff;
}
.table-extra-container__operate {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.table-extra-container__pagination {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.table-extra-container .el-divider--vertical {
  margin: 0 5px;
}
.table-extra-container .el-table__body .el-dropdown {
  color: #2c68ff;
  cursor: pointer;
  font-size: 12px;
}
.table-extra-container .el-table__body .el-button--text {
  font-size: 12px;
}
</style>
