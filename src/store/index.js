import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    iptVal: '', 
    status: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setIptVal(state, val) {
      state.iptVal = val
    },
    addItem(state) {
      const obj = {
        id: state.list.length,
        txt: state.iptVal,
        done: false
      }
      state.list.push(obj)
      state.iptVal = ''
    },
    delItem(state, id) {
      const i = state.list.findIndex(item => item.id === id);
      if (i > -1) {
        state.list.splice(i, 1);
      }
    },
    checkBoxChange(state, id) {
      const i = state.list.findIndex(item => item.id === id);
      if (i > -1) {
        state.list[i].done = !state.list[i].done;
      }
    },
    cleanItem(state) {
      state.list = state.list.filter(item => !item.done)
    },
    setItemStatus(state, status) {
      state.status = status
    }
  },
  actions: {
    getList(context) {
      axios.get('/source.json').then(({
        data
      }) => {
        context.commit('initList', data);
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return `剩余${state.list.filter(item=>!item.done).length}项未完成`
    },
    getSatusList(state) {
      switch (state.status) {
        case 'all':
          return state.list
        case 'undone':
          return state.list.filter(item => !item.done) 
        case 'done':
          return state.list.filter(item => item.done) 
        default:
          break;
      }
    }
  }
})