import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    articles: []
  },
  getters: {
    getArticles: (state) => state.articles
  },
  mutations: {
    setArticles(state, articles){
      state.articles = articles
  }
  },
  actions: {
    async getArticles({commit}){
      await axios.get('http://192.168.1.2:3000/api/articles')
      .then((res) => {
          commit('setArticles', res.data) 
      })
      .catch((error) => {
          console.log(error);
      })
  }
  },
  modules: {
    
  }
})
