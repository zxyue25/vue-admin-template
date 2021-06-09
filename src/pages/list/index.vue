<template>
  <table-extra
    :loading="loading"
    :tableData="JSON.stringify(tableData)"
    :formTableData="formTableData"
    @handleSelectionChange="handleSelectionChange"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :total="total"
  >
    <template slot="table-operate">
      <el-button type="primary" class="handle-del mr10" @click="handleEdit"
        >创建模版</el-button
      >
    </template>
    <el-table-column label="操作" width="200px" fixed="right">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click.native="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" size="small" @click="handleShow(scope.row)"
          >查看</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-dropdown size="mini">
          <span class="el-dropdown-link">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleCopyDialog(scope.row)"
              >复制页面</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </table-extra>
</template>

<script>
import TableExtra from '@/components/table-extra'
export default {
  components: {
    TableExtra,
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 6,
      tableData: [
        {
          id: '1001',
          title: '标题一',
          elementIsOnline: '1',
          createTime: '1616983523000',
          imgUrl:
            '',
        },
        {
          id: '1002',
          title: '标题二',
          elementIsOnline: '3',
          createTime: '1616983523000',
        },
        {
          id: '1003',
          title: '标题三',
          elementIsOnline: '4',
          createTime: '1616983523000',
        },
        {
          id: '1004',
          title: '标题四',
          elementIsOnline: '1',
          createTime: '1616983523000',
        },
        {
          id: '1005',
          title: '标题五',
          elementIsOnline: '3',
          createTime: '1616983523000',
        },
        {
          id: '1006',
          title: '标题六',
          elementIsOnline: '4',
          createTime: '1616983523000',
        },
      ],
      formTableData: [
        {
          type: 'selection',
          width: '55',
        },
        {
          label: '页面ID',
          prop: 'id',
          width: '100',
          fixed: true,
          sortable: true,
          showOverflowTooltip: true,
        },
        {
          label: '标题',
          prop: 'title',
          width: '80',
        },
        {
          label: '环境',
          prop: 'elementIsOnline',
          width: '140',
          formatter: this.onlineFormat,
        },
        {
          label: '预览',
          prop: 'imgUrl',
          width: '95',
          isImg: true,
          formatter: this.handlerPicSrcFormatter,
        },
        {
          label: '创建时间',
          prop: 'createTime',
          minWidth: '180',
          formatter: this.dateFormat,
          sortable: true,
        },
      ],
    }
  },
  methods: {
    handlerPicSrcFormatter(row, column) {
      return row[column.property]
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return '2021-03-29 10:05:23'
    },
    onlineFormat(row, column) {
      var v = row[column.property]
      if (v == undefined) {
        return `${this.chooseBadge('warning')}预发`
      }
      if (v == 1) {
        return `${this.chooseBadge('warning')}预发`
      } else if (v == 3) {
        return `${this.chooseBadge('success')}线上`
      } else if (v == 4) {
        return `${this.chooseBadge('primary')}待上线`
      }
      return `${this.chooseBadge('warning')}预发`
    },
    chooseBadge(type) {
      return `<div class="el-badge" style="padding-top: 6px;margin-right: 5px;">
            <sup class="el-badge__content el-badge__content--${type} is-dot"></sup>
        </div>`
    },
    handleEdit() {
      this.$message('触发按钮')
    },
    handleCopyDialog() {
      this.$message('触发按钮')
    },
    handleShow() {
      this.$message('触发按钮')
    },
    handleSelectionChange() {
      this.$message('选中')
    },
    handleSizeChange() {
      this.$message('切换每页显示数量')
    },
    handleCurrentChange() {
      this.$message('切换页数')
    },
  },
}
</script>
