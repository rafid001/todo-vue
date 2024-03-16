  <template>
    <div id="app">
      <div class="content">
        <header>
          <router-link to="/" class="logo" @click="logout">Todo App</router-link>
          <nav>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
            <button @click="logout">Logout</button>
          </nav>
          <button class="menu-toggle" @click="showMenu = !showMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>
        <section class="todo-app">
          <div class="create-todo">
            <h2>Create a Todo</h2>
            <form @submit.prevent="addTodo">
              <input
                type="text"
                v-model="input_content"
                placeholder="What's on your todo list?"
              />
              <button type="submit">Add Todo</button>
            </form>
          </div>
          <div class="todo-list">
            <h2>Todo List</h2>
            <transition-group name="todo-list" tag="div" class="todo-items">
              <div
                v-for="todo in todos_asc"
                :key="todo.createdAt"
                class="todo-item"
                :class="{ done: todo.done }"
              >
                <div class="todo-checkbox" @click="toggleDone(todo)">
                  <div v-if="todo.done" class="checkbox-checked"></div>
                </div>
                <label class="todo-label">
                  <input
                    type="text"
                    v-model="todo.content"
                    :disabled="!todo.editable"
                    @blur="updateTodo(todo)"
                  />
                </label>
                <div class="actions">
                  <button
                    class="edit"
                    @click="toggleEditMode(todo)"
                    :class="{ active: todo.editable }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button class="delete" @click="removeTodo(todo)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </transition-group>
          </div>
        </section>
      </div>
      <footer>
        <p>
          &copy; 2024 Todo App by Rafid. All rights reserved.
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </footer>
      <nav
        class="mobile-menu"
        :class="{ 'show-menu': showMenu }"
        @click="showMenu = false"
      >
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
        <button @click="logout">Logout</button>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const todos = ref([]);
  // const name = ref('');
  const input_content = ref('');
  const showMenu = ref(false);
  
  const todos_asc = computed(() =>
    todos.value.sort((a, b) => a.createdAt - b.createdAt)
  );
  
  // watch(name, (newVal) => {
  //   localStorage.setItem('name', newVal);
  // });
  
  watch(
    todos,
    (newVal) => {
      localStorage.setItem('todos', JSON.stringify(newVal));
    },
    { deep: true }
  );
  
  const addTodo = () => {
    if (input_content.value.trim() === '') {
      return;
    }
  
    todos.value.push({
      content: input_content.value,
      done: false,
      editable: false,
      createdAt: new Date().getTime(),
    });
  
    input_content.value = '';
  };
  
  const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo);
  };
  
  const updateTodo = (todo) => {
    todo.editable = false;
  };
  
  const toggleEditMode = (todo) => {
    todo.editable = !todo.editable;
  };
  
  const toggleDone = (todo) => {
    todo.done = !todo.done;
  };
  
  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem('todos')) || [];
  });

  const logout = () => {
      // Clear the user's token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('todos')
      // Redirect to the login page
      router.push('/');
    };
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

  .todo-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 10px;
  cursor: pointer;
}

.checkbox-checked {
  width: 10px;
  height: 10px;
  background-color: #333;
  border-radius: 50%;
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

  header nav button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  margin-left: 1rem;
  transition: color 0.3s ease;
}

header nav button:hover {
  color: #fff;
}
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .menu-toggle svg {
    width: 24px;
    height: 24px;
  }
  
  /* Todo App */
  .todo-app {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .create-todo h2,
  .todo-list h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .create-todo form {
    display: flex;
    margin-bottom: 2rem;
  }
  
  .create-todo input[type='text'] {
    flex-grow: 1;
    padding: 0.8rem 1rem;
    background-color: #1a1a1a;
    border: none;
    border-radius: 0.5rem 0 0 0.5rem;
    color: #fff;
    font-size: 1rem;
  }
  
  .create-todo button {
    padding: 0.8rem 1.6rem;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .create-todo button:hover {
    background: linear-gradient(90deg, #764ba2, #667eea);
  }
  
  .todo-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .todo-item {
    background-color: #1a1a1a;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .todo-item:hover {
    transform: translateY(-5px);
    background-color: #2a2a2a;
  }
  
  .todo-item.done {
    background-color: #333;
  }
  
  .todo-item.done .todo-label input[type='text'] {
    text-decoration: line-through;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .todo-label {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
  
  .bubble {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-right: 0.8rem;
  }
  
  .bubble.done {
    background-color: #fff;
  }
  
  .todo-label input[type='text'] {
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 1rem;
    flex-grow: 1;
  }
  
  .todo-label input[type='text']:disabled {
    cursor: not-allowed;
  }
  
  .actions {
    display: flex;
    align-items: center;
  }
  
  .edit,
  .delete {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .edit {
    background-color: #4ade80;
    margin-right: 0.5rem;
  }
  
  .edit.active {
    background-color: #22c55e;
  }
  
  .edit:hover {
    background-color: #38c172;
  }
  
  .delete {
    background-color: #ef4444;
  }
  
  .delete:hover {
    background-color: #dc2626;
  }
  
  .edit svg,
  .delete svg {
    width: 16px;
    height: 16px;
  }
  
  /* Todo List Animations */
  .todo-list-enter-active,
  .todo-list-leave-active {
    transition: all 0.5s ease;
  }
  
  .todo-list-enter-from,
  .todo-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
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
  
  /* Mobile Menu */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .mobile-menu.show-menu {
    opacity: 1;
    visibility: visible;
  }
  
  .mobile-menu a {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    margin-bottom: 1rem;
  }

  .mobile-menu a,
.mobile-menu button {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  margin-bottom: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}

  
  /* Responsive Styles */
  @media (max-width: 768px) {
    header {
      padding: 0.5rem 1rem;
    }
  
    header .logo {
      font-size: 1.2rem;
    }
  
    header nav {
      display: none;
    }
  
    .menu-toggle {
      display: block;
    }
  
    .todo-app {
      padding: 1rem;
    }
  
    .create-todo h2,
    .todo-list h2 {
      font-size: 1.5rem;
    }
  
    .todo-items {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  
    .todo-item {
      padding: 0.8rem;
    }
  
    .todo-label input[type='text'] {
      font-size: 0.9rem;
    }
  
    footer {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 480px) {
    .todo-items {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  
    .todo-item {
      padding: 0.6rem;
    }
  
    .todo-label input[type='text'] {
      font-size: 0.8rem;
    }
  }
  </style>