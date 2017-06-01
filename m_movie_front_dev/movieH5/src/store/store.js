import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    headMsg: '国美电影票',/*头名称*/
    isHeadHomeShow: 0, /*是否在头 上显示 “首页” */
    currCity:{ /*定义当前城市，默认是为北京*/
      regionID:"2",
      regionName:"北京",
      districtRegionID:0,
      districtRegionName:"全城"
    },
    isAreaShow:0,
    dialogTableInfo:{
      tablename:'confirm', //对话框的名称 当前只支持 'confirm' 和 'alert'
      msg:'', //需要在弹框面板上显示的内容
      inputType: 0
    },
    dialogIsShow:0,  //对话框是否显示，默认为不显示
    toBack:''
  },
  mutations: {
    EDIT_HEAD_MSG(state, newMsg){
      state.headMsg= newMsg
    },
    EDIT_HEAD_HOME_SHOW(state, newVal)
    {
      state.isHeadHomeShow = newVal;
    },
    EDIT_CURRCITY (state,city){
      state.currCity = city;
    },
    EDIT_AREA_SHOW (state,isShow){
      state.isAreaShow = isShow;
    },
    EDIT_DIALOG_TABLE(state, newVal)
    {
      state.dialogTableInfo = newVal;
    },
    EDIT_DIALOG_IS_SHOW(state, newVaue)
    {
      state.dialogIsShow = newVaue;
    },
    EDIT_TO_BACK(state, newVal)
    {
      state.toBack = newVal;
    }
    
  },
  actions: {
    editHeadMsg({commit}, newMsg){
      commit('EDIT_HEAD_MSG', newMsg)
    },
    editIsHeadHomeShow({commit}, newVal){
      commit('EDIT_HEAD_HOME_SHOW', newVal)
    },
    editCurrCity({commit}, city){
      commit('EDIT_CURRCITY', city)
    },
    editAreaShow({commit}, isShow){
      commit('EDIT_AREA_SHOW', isShow)
    },
    editDialogTable({commit}, newVal)
    {
      commit('EDIT_DIALOG_TABLE', newVal);
    },
    editDialogIsShow({commit}, newVal)
    {
      commit('EDIT_DIALOG_IS_SHOW', newVal);
    },
    editToBack({commit},newVal){
      commit('EDIT_TO_BACK', newVal);
    }
  },
  getters: {
    headMsg: state => state.headMsg,
    isHeadHomeShow: state => state.isHeadHomeShow,
    currCity:state => state.currCity,
    isAreaShow:state => state.isAreaShow,
    dialogTableInfo:state => state.dialogTableInfo,
    dialogIsShow:state => state.dialogIsShow,
    toBack:state => state.toBack
  }
})
