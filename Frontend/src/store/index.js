import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    articles: [],
    article: {},
    comments: [],
    commentsAll: {}
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
    deleteArticle(state, id){
      state.articles = state.articles.filter((el) => el.id != id)
    },
    newArticle(state, article){
      state.articles.push({title: article.title, text: article.text, createdAt: Date.now()})
    },
    deleteComment(state, comment){
      state.comments = state.comments.filter((el) => el.text != comment.text)
    },
    newComment(state, comment){
      state.comments.push({text: comment.text})
    },
    setCommentsAll(state, comments){
      let groupedComments = {}
      
      comments.forEach(item => {
        const { articleId } = item;
        if (!groupedComments[articleId]) {
          groupedComments[articleId] = [];
        }
        groupedComments[articleId].push(item);
      });

      state.commentsAll = groupedComments
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
    },

    deleteArticle({commit}, id){
      commit('deleteArticle', id)
    },
    addArticle({commit}, article){
      commit('newArticle', article)
    },
    deleteComment({commit}, comment){
      commit('deleteComment', comment)
    },
    addComment({commit}, comment){
      commit('newComment', comment)
    },

    async setCommentsAll({commit}, dateRange){
      await axios.get(`http://192.168.1.2:3000/api/analytic/comments/?dateFrom=${Math.round(dateRange[0] / 1000)}&dateTo=${Math.round(dateRange[1] / 1000)}`)
      .then((res) => {
        console.log(res.data);
        commit('setCommentsAll', res.data)
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },

  
  modules: {
    
  }
})
