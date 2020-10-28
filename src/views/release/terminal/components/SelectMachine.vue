<template>
    <div class="transfer-wrapper">
      <el-transfer
        v-model="value"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['全部机器', '已选机器']"
        :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
        @change="handleChange"
        :data="data">
      </el-transfer>
    </div>
</template>

<script>
class Change {
  constructor (data) {
    this.data = data
  }

  get changeAfter () {
    let arr = []
    this.data.filter((value, index) => {
      let obj = {}
      obj.key = value.materialMachineId
      obj.label = value.stationId
      arr.push(obj)
    })
    return arr
  }

  get selected () {
    let arr = []
    this.data.filter((value, index) => {
      arr.push(value.materialMachineId)
    })
    return arr
  }
}
export default {
  name: 'SelectMachine',
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      data: [],
      value: [],
      renderFunc (h, option) {
        // return <span> {option.key} - {option.label}</span>
        return <span>{option.key}</span>
      }
    }
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      // console.log(value, direction, movedKeys)
      if (direction === 'right') { // 添加
        this.$emit('addMachines', movedKeys)
      } else if (direction === 'left') { // 删除
        this.$emit('delMachines', movedKeys)
      }
    },
    setTransferData () {
      setTimeout(() => {
        console.log(this.$attrs)
        console.log(this.$attrs.allMachineData)
        const a = new Change(this.$attrs.allMachineData)
        this.$data.data = a.changeAfter
        const b = new Change(this.$attrs.tableData)
        this.$data.value = b.selected
      }, 500)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.el-transfer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
