// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 导出数据到excel中(.xls)
// 遍历数据值
Vue.prototype.formatJson = function(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]));
},
// 下载数据
/*
  header --- excel中的表头
  filterVal  --- excel中与表头对应的内容参数
  list  --- excel要下载的数据数组
  name  --- 下载excel的名称
*/
Vue.prototype.exportExcel = function(header,filterVal,list,name) {
  require.ensure([], () => {
    const { export_json_to_excel } = require("./vendor/Export2Excel");
    const data = this.formatJson(filterVal, list);
    export_json_to_excel(header, data, name);
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
