   <template>
    <div id="app">
      <div class="content">
        <header>
          <router-link to="/" class="logo">Todo App</router-link>
          <button class="menu-toggle" @click="showMenu = !showMenu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <nav :class="{ 'show-menu': showMenu }">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
          </nav>
        </header>
        <section class="hero">
          <div>
            <h1>Organize Your Life</h1>
            <p>Stay on top of your tasks with our intuitive todo app</p>
            <a href="#" @click.prevent="navigateToTodoApp">Get Started</a>
          </div>
        </section>
      </div>
      <footer>
        <p>&copy; 2024 Todo App by Rafid. All rights reserved. <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </footer>
    </div>
  </template>


  <script>
  export default {
    name: 'LandingPage',
    methods: {
      navigateToTodoApp() {
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
  }
  
  body {
    color: #fff;
    background: linear-gradient(135deg, #000, #1a1a1a);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  #app {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .content {
    flex-grow: 1;
  }
  
  /* Header */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(90deg, #000, #1a1a1a);
  }
  
  header .logo {
    font-size: 1.5rem;
    font-weight: 600;
    text-decoration: none;
    color: #fff;
  }
  
  header nav a {
    margin-left: 1rem;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
  }
  
  header nav a:hover {
    color: #fff;
  }
  
  /* Hero Section */
  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.8)), url('https://images.unsplash.com/photo-1541701494587-cb58504866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    background-size: cover;
    background-position: center;
    text-align: center;
    color: #fff;
  }
  
  .hero h1 {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }
  
  .hero a {
    display: inline-block;
    background: linear-gradient(90deg, #667eea, #764ba2);
    color: #fff;
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    transition: background 0.3s ease;
    cursor: pointer;
  }
  
  .hero a:hover {
    background: linear-gradient(90deg, #764ba2, #667eea);
  }
  
  /* Footer */
  footer {
    background: linear-gradient(90deg, #000, #1a1a1a);
    padding: 1rem 2rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }
  
  footer a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  footer a:hover {
    color: #fff;
  }
  
  @media (max-width: 480px) {
    header {
      padding: 0.5rem 1rem;
    }
  
    header .logo {
      font-size: 1.2rem;
    }
  
    header nav a {
      margin-left: 0.5rem;
      font-size: 0.9rem;
    }
  
    .hero h1 {
      font-size: 2rem;
    }
  
    .hero p {
      font-size: 1rem;
    }
  
    .hero a {
      font-size: 1rem;
      padding: 0.8rem 1.6rem;
    }
  
    footer {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
  }
  </style>
