const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data: function () {
    return {
      title: 'Idea Forum',
      token: '',
      user: {},
      ideas: [],
      showNewIdea: false,
      showEditIdea: false,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      ideaForm: {
        title: '',
        content: ''
      },
      editForm: {
        title: '',
        content: ''
      }
    }
  },
  created: async function () { 
    this.token = sessionStorage.getItem('token') || ''
    this.user = JSON.parse(sessionStorage.getItem('user')) || {}
    
    this.getIdeas()
  },

  methods: {
    login: async function () {
      try{
        const response = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        })

        const json = await response.json()
        this.token = json.token
        this.user = json.user
        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('user', JSON.stringify(this.user))
        this.getIdeas()

      }catch(error){
        console.log(error)
      }
      
    },

    register: async function () {
      try{
        const response = await fetch(`${baseUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.registerForm)
        })

        const data = await response.json();
        this.showRegister = false;

      }catch(error){
        console.log(error);
      }

    },

    getIdeas: async function () {
      try{
        if (this.user.id && this.token){
          //baseUrl/api/users/{id}/ideas
          const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          })

          this.ideas = await response.json()
        }
      }catch(error){
        console.log(error)
      }  
    },
    addIdea: async function () {
      try{
        //baseUrl/api/users/{id}/ideas
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.ideaForm)
        })

        const json = await response.json()
        this.ideas.push(json)
        this.showNewIdea = false
      }catch(error){
        console.log(error)
      }
      
    },
    editIdea: function (idea) {
      
    },
    updateIdea: async function () {

    },
    deleteIdea: async function (idea) {
      
    },
    logout: async function () {
      
    }

  }
})

app.mount('#app')