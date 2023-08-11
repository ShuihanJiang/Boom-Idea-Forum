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
      showNewComment: false,
      showLogin: false,
      showRegister: false,
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
      commentForm: {
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
    isValidEmail: function (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    login: async function () {
      try{
        if (!this.loginForm.email) {
          console.log('Email is required.');
          return;
        }
        if (!this.isValidEmail(this.loginForm.email)) {
          console.log('Invalid email format.');
          return;
        }
        if (!this.loginForm.password) {
          console.log('Password is required.');
          return;
        }
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
        this.showLogin = false

      }catch(error){
        console.log(error)
      }
      
    },

    

    register: async function () {
      try {
        const errors = [];

        if (!this.registerForm.name) errors.push('Name is required.');
        if (!this.registerForm.email) errors.push('Email is required.');
        if (!this.isValidEmail(this.registerForm.email)) errors.push('Invalid email format.');
        if (!this.registerForm.password) errors.push('Password is required.');
        if (this.registerForm.password.length < 6) errors.push('Password must be at least 6 characters.');

        if (errors.length > 0) {
          console.log(errors);
          return;
        }

        const response = await fetch(`${baseUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.registerForm)
        });

        if (response.ok) {
          const data = await response.json();
          this.showRegister = false;
          this.loginForm.email = this.registerForm.email; // Pre-fill the login form with the registered email
          this.loginForm.password = ''; // Clear the password field
          this.registerForm = {}; // Clear the register form
        } else {
          console.log('Registration failed');
        }
      } catch (error) {
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
        console.log("addIdea method called");
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
        // this.getIdeas();
        
      }catch(error){
        console.log(error)
      }
      
    },
  
    addComment: async function () {
      try{
        //baseUrl/api/users/{id}/comments
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.commentForm)
        })

        const json = await response.json()
        this.ideas.push(json)
        this.showNewComment = false
      }catch(error){
        console.log(error)
      }
      
    },

    editIdea: function (idea) {
    
        this.editForm.title = idea.title
        this.editForm.content = idea.content
        this.editForm.id = idea.id
        this.showEditIdea = true 


      
    },

    updateIdea: async function () {
      try {
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas/${this.editForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.editForm)
        })

        const updatedIdea = await response.json()    
        const index = this.ideas.findIndex(item => item.id === updatedIdea.id)
        if (index !== -1) {
          this.ideas.splice(this.editIndex, 1, updatedIdea)
        }

        this.showEditIdea = false

      } catch (error) {
        console.log(error);
      }

    },
    deleteIdea: async function (idea) {
      try{
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas/${idea.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        if (response.ok){
          this.ideas = this.ideas.filter(i => i.id !== idea.id)
        }
      }catch(error){
        console.log(error)
      }

      
    },

    
    // addUpvote: async function (idea) {
    //   try {
    //       const response = await fetch(`${baseUrl}/api/ideas/${idea.id}/upvote`, {
    //           method: 'POST',
    //           headers: {
    //               'Authorization': `Bearer ${this.token}`
    //           }
    //       });
  
    //       if (response.ok) {
    //           const json = await response.json();
    //           const index = this.ideas.findIndex(item => item.id === json.idea_id);
    //           if (index !== -1) {
    //               this.ideas[index].upvotes_count = json.upvotes_count;
    //           }
    //       }
    //   } catch (error) {
    //       console.log(error);
    //   }
    // },
  
    
    
    
    

    logout: async function () {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      this.token = '';
      this.user = {};
      this.ideas = [];

      window.location.href = '/login';

      
      
    }

  }
})

app.mount('#app')