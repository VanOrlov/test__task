import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    articles: [],
    article: {},
    comments: {}
  },
  getters: {
    getArticles: (state) => state.articles
  },
  mutations: {
    setArticles(state, articles){
      state.articles = articles
    },
    setArticle(state, article){
      state.article = article
    },
    setComments(state, comments){
      state.comments = comments
    },
    
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
    },

    async getOneArticle({commit}, id){
      await axios.get(`http://192.168.1.2:3000/api/article/${id}`)
      .then((res) => {
        commit('setArticle', res.data)
      })
      .catch((error) => {
        console.log(error);
      })
    },

    async getComment({commit}, id){
      await axios.get(`http://192.168.1.2:3000/api/article/${id}/comments`)
      .then((res) => [
        commit('setComments', res.data)
      ])
      .catch((error) => [
        console.log(error)
      ])
    }
  },

  
  modules: {
    
  }
})
