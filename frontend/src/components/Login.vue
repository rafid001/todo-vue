  <template>
    <div id="app">
      <div class="content">
        <header>
          <router-link to="/" class="logo">Todo App</router-link>
        </header>
        <section class="login-section">
          <div class="login-container">
            <h2>Login</h2>
            <form @submit.prevent="login">
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
              <button type="submit">Login</button>
            </form>
            <p>
              New user?
              <router-link to="/signup">Continue to Sign Up</router-link>
            </p>
            <div class="login-message" v-if="showMessage">
              <p>{{ loginMessage }}</p>
            </div>
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
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
        showMessage: false,
        loginMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://localhost:3000/api/v1/user/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            localStorage.setItem('token', data.token);
            this.showMessage = true;
            this.loginMessage = 'Login successful!';
            setTimeout(() => {
              this.$router.push('/todo');
            }, 2000); // Redirect to /todo after 2 seconds
          } else {
            this.showMessage = true;
            this.loginMessage = 'Invalid credentials. Please try again.';
            setTimeout(() => {
              this.showMessage = false;
            }, 3000); // Hide the message after 3 seconds
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  /* Login Section */
  .login-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  .login-message {
  background-color: #2a2a2a;
  border-radius: 0.5rem;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  text-align: center;
  animation: flash 1s infinite;
}

.login-message p {
  color: #fff;
  font-size: 1rem;
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
  
  .login-container {
    max-width: 400px;
    width: 100%;
    background-color: #1a1a1a;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
  }
  
  .login-container h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .login-container form {
    display: flex;
    flex-direction: column;
  }
  
  .login-container input {
    padding: 0.8rem 1rem;
    background-color: #2a2a2a;
    border: none;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .login-container button {
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
  
  .login-container button:hover {
    background: linear-gradient(90deg, #764ba2, #667eea);
  }
  
  .login-container p {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .login-container p a {
    color: #fff;
    text-decoration: none;
    margin-left: 0.5rem;
  }
  
  .login-container p a:hover {
    text-decoration: underline;
  }
  
  /* Responsive Styles */
  @media (max-width: 480px) {
    .login-container {
      padding: 1rem;
    }
  
    .login-container h2 {
      font-size: 1.5rem;
    }
  
    .login-container input {
      font-size: 0.9rem;
    }
  
    .login-container button {
      font-size: 0.9rem;
    }
  }
  </style>
  
  