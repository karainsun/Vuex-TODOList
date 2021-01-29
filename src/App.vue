<template>
  <div id="app">
    <a-input
      class="add_input"
      placeholder="请输入添加项"
      :value="iptVal"
      @change="iptChange"
    />
    <a-button type="primary" @click="add">添加</a-button>
    <a-list size="small" bordered :data-source="getSatusList" class="todo_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox @change="(e)=>{checkChange(item.id)}" :checked="item.done"></a-checkbox>
        <span>{{ item.txt }}</span>
        <a-button type="link" @click="del(item.id)">删除</a-button>
      </a-list-item> 
      <div slot="footer" class="footer"> 
        <span>{{ unDoneLength }}</span> 
        <a-button-group>
          <a-button :type="status=='all'?'primary':'default'" @click="setStatus('all')">全部</a-button>
          <a-button :type="status=='undone'?'primary':'default'" @click="setStatus('undone')">未完成</a-button>
          <a-button :type="status=='done'?'primary':'default'" @click="setStatus('done')">已完成</a-button>
        </a-button-group> 
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["iptVal","status"]),
    ...mapGetters(["unDoneLength","getSatusList"]),
  },
  methods: {
    iptChange(e) {
      this.$store.commit("setIptVal", e.target.value);
    },
    add() {
      if (this.iptVal.trim().length <= 0) {
        return this.$message.warning("输入内容不可为空");
      }
      this.$store.commit("addItem");
    },
    del(id) {
      this.$store.commit("delItem", id);
    },
    checkChange(id){
      this.$store.commit("checkBoxChange", id);
    },
    clean(){
      this.$store.commit("cleanItem");
    },
    setStatus(status){
      this.$store.commit("setItemStatus", status);
    }
  },
};
</script>

<style>
#app {
  width: 460px;
  min-height: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #fafafa;
}
.add_input {
  width: 361px !important;
  margin-right: 10px !important;
}
.todo_list {
  width: 435px;
  margin-top: 10px !important;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
