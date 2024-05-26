<script setup>
import { ref } from 'vue'

const name = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCancelConfirmation = ref(false)

const submitChanges = () => {
  // Implement logic to verify current password and update new password
  // if passwords match
  console.log('Submitting changes...')
}

const cancelChanges = () => {
  // Reset input fields or perform cancellation logic
  console.log('Canceling changes...')
}
</script>


<template>
  <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  </head>
  <body class="body">
    <section class="container py-5" id="cv">
      <div class="row mt-4 py-3">
        <div class="col-12 d-flex flex-column text-center">
          <h2>CURRICULUM VITAE</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 mt-5 order-lg-0 order-1 text-center">
          <img class="img-fluid rounded-circle border border-5 border-dark-subtle" src="../assets/user.jpg" alt="profile-img">
          <h2 class="mt-3">Pumpuy Anderson</h2>
          <ul class="list-unstyled contact-info">
            <li>supachai.msk12@gmail.com</li>
            <li><a>อายุ</a> 25</li>
            <li><a>น้ำหนัก</a>85</li>
          </ul>
          <h5>ลบบัญชี</h5>
          <ul class="list-unstyled">
            <button>ลบบัญชี</button>
            <!-- Add or remove interests as needed -->
          </ul>
        </div>
        <div class="col-lg-7 order-lg-1 order-0 mt-5 text-start">
          <h3>Edit Profile</h3>
          <hr>
          <dl>
            <dt>Year - Year</dt>
            <dd>University/Institution</dd>
          </dl>
          <dl>
            <dt>Year - Year</dt>
            <dd>University/Institution</dd>
          </dl>
          <dl>
            <dt>Year - Year</dt>
            <dd>University/Institution</dd>
          </dl>
          <dl>
            <dt>Year - Year</dt>
            <dd>University/Institution</dd>
          </dl>
        </div>
      </div>      
    </section>
  </body>
  </template>
  

<style scoped>

#portfolio img {
  height: 300px;
  object-fit: cover;
}


#cv img {
  width: 230px;
}

/* Contact section background image */
#contact {
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

@media screen and (max-width: 990px) {
  #skills .card {
    width: calc(100% / 2 - 10px) !important;
  }
}

@media screen and (max-width: 668px) {
  #skills .card,
  #portfolio .card-wrapper {
    width: 100% !important;
  }
}

.container {
    background: linear-gradient(#ffdad5, #ffd0dc);
}

</style>
  