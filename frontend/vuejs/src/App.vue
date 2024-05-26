<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="navbar">
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/editprofile">Edit Profile</RouterLink>
      <RouterLink to="/signin">Signin</RouterLink>
      <RouterLink to="/signup">Signup</RouterLink>
      <RouterLink to="/mainpage">Main Page</RouterLink>
      <RouterLink to="/history">History</RouterLink>
      <RouterLink to="/setgoal">Set Goal</RouterLink>
    </div>
    <div class="navbar-menu-toggle">
      <button class="navbar-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f0f0; /* Adjust as needed */
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 15px; /* Adjust spacing as needed */
}

.nav-link {
  text-decoration: none;
  color: #333; /* Adjust text color as needed */
  font-weight: bold; /* Optional: Make links bolder for emphasis */
}

.nav-link.active {
  /* Style active links (optional) */
  color: #007bff; /* Bootstrap's default primary color */
}

/* Optional: Responsive navigation using Bootstrap classes */
@media (max-width: 768px) {
  .navbar-nav {
    display: block; /* Stack links vertically on small screens */
    margin-bottom: 15px; /* Add some space between links and content */
  }

  .navbar-nav li {
    margin-right: 0; /* Remove horizontal spacing on small screens */
  }

  .navbar-toggler {
    display: block; /* Show toggle button on small screens */
  }
}
</style>
