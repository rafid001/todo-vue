  <template>
    <div id="app">
      <div class="content">
        <header>
          <router-link to="/" class="logo">Todo App</router-link>
        </header>
        <section class="signup-section">
          <div class="signup-container">
            <h2>Sign Up</h2>
            <form @submit.prevent="signup">
              <input
                type="text"
                v-model="name"
                placeholder="Name"
                required
              />
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </div>
        </section>
      </div>
      <footer>
        <p>
          &copy; 2024 Todo App by Rafid. All rights reserved.
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupPage',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async signup() {
        try {
          const response = await fetch('http://localhost:3000/api/v1/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            // Signup successful, redirect to /todos
            this.$router.push('/login');
          } else {
            // Signup failed, display error message
            this.errorMessage = data.message || 'Signup failed';
            console.error('Signup failed:', this.errorMessage);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>



  <style>
  /* Signup Section */
  .signup-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  
  .signup-container {
    max-width: 400px;
    width: 100%;
    background-color: #1a1a1a;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
  }
  
  .signup-container h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .signup-container form {
    display: flex;
    flex-direction: column;
  }
  
  .signup-container input {
    padding: 0.8rem 1rem;
    background-color: #2a2a2a;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .signup-container button {
    padding: 0.8rem 1.6rem;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .signup-container button:hover {
    background: linear-gradient(90deg, #764ba2, #667eea);
  }
  
  .signup-container p {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .signup-container p a {
    color: #fff;
    text-decoration: none;
    margin-left: 0.5rem;
  }
  
  .signup-container p a:hover {
    text-decoration: underline;
  }
  
  /* Responsive Styles */
  @media (max-width: 480px) {
    .signup-container {
      padding: 1rem;
    }
  
    .signup-container h2 {
      font-size: 1.5rem;
    }
  
    .signup-container input {
      font-size: 0.9rem;
    }
  
    .signup-container button {
      font-size: 0.9rem;
    }
  }
  </style>
  