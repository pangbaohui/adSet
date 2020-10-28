<template>
  <div class="drawer-page-main" :class="terminalDrawerClass ? 'drawer-page-main-t-w':''">
    <div class="page-main-title"><div>终端机器</div></div>
    <div class="page-main-title ope-btns">
      <el-button :disabled="regionId === ''? true : false" class="items" @click="openDialog"><i class="el-icon-circle-plus-outline"></i> 新增</el-button>
    </div>
    <div class="table-wrapper">
      <machine-table  v-bind="$attrs"></machine-table>
    </div>
    <el-dialog width="1000px" title="机器选择" :visible.sync="dialogFormVisible">
      <select-machine ref="machine"  v-bind="$attrs" @addMachines="addMachines" @delMachines="delMachines"></select-machine>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MachineTable from './MachineTable'
import SelectMachine from './SelectMachine'
import terminalApi from '../teminal'

export default {
  name: 'Pagemain',
  computed: {
    ...mapState({
      terminalDrawerClass: state => state.app.terminalDrawerClass
    })
  },
  components: { MachineTable, SelectMachine },
  props: {
    regionId: { type: String }
  },
  inject: {
    proObj: {
      default: () => {}
    }
  },
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    addMachines (data) {
      this.optionMachine(data, this.proObj.regionId)
    },
    delMachines (data) {
      this.optionMachine(data)
    },
    openDialog () {
      this.dialogFormVisible = true
      setTimeout(() => {
        this.$refs.machine.setTransferData()
      })
    },
    optionMachine (machines, regionId = 0) {
      const postData = { method: 'updateEntity', data: { materialMachineId: machines.join(','), regionId } }
      terminalApi.getMachine(postData).then(res => {
        if (res.retcode === 0) {
          this.$message.success(res.returnMsg)
          this.$emit('refreshPage')
          this.dialogFormVisible = false
        } else {
          this.$message.warning(res.returnMsg)
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      console.log(this.$attrs)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/drawer";
  .ope-btns{
    width: 94%;
    border:none;
    justify-content: space-between;
  }
  %btn{
    color: white;
    padding: 5px 20px;
    border-radius: 3px;
    font-weight: 600;
    cursor: pointer;
    font-size: 15px;
    outline: none;
    background-color: #a7ca6d;
  }
  %btn:active{
    opacity: 0.5;
  }
  button.items {
    @extend %btn;
    font-size: 15px;
    border: none;
    outline: none;
  }
</style>
