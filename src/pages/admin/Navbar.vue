<template>
  <MDBNavbar expand="lg" light class="header-sticky">
    <div class="container-fluid">
      <div class="navbar-part navbar-part-icon navbar-part-left">
        <div class="admin-icon-wrapper">
          <i class="bi bi-person-fill"></i>
        </div>
      </div>
      <div class="navbar-part navbar-part-right">
        <div class="profile-container">
          <img
            src="../../assets/images/admin.jpg"
            alt="Admin Profile"
            class="profile-image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </MDBNavbar>
</template>

<script>
import { MDBNavbar } from "mdb-vue-ui-kit";

export default {
  name: "NavBar",
  components: {
    MDBNavbar,
  },
};
</script>

<style scoped>
.header-sticky {
  /*position: sticky;*/
  top: 0;
  z-index: 2;
  /* background:  #1c3a66; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  position: absolute;
   
  /* background:  #1c3a66; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  right: 0;
  max-width: 1855px;

}

.container-fluid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
}

.navbar-part {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbar-part-left {
  width: 250px;
  background-color: #ffffff;
  padding-bottom: 10px;
}

.admin-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: #ffffff;
  border-radius: 50%;
}

.admin-icon-wrapper i {
  color: #000;
  font-size: 1.5rem;
}

.navbar-part-right {
  width: 100%;
  background-color:  #1c3a66;
}

.profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image {
  width: 75px;
  height: 50px;
}

.navbar-part-icon , .admin-icon-wrapper{
width:0px !important;
}



/* Responsive styles */
@media (max-width: 768px) {


.header-sticky {
  position: sticky;
  top: 0;
  z-index: 2;
  /* background:  #1c3a66; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  
   
  /* background:  #1c3a66; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  right: 0;
  max-width: 1855px;

}


.navbar-part-icon{
width:auto;
}
  .toggle-sidebar{
      color: #000 !important;
  }
  
  .container-fluid {
    flex-direction: column;
  }

  .navbar-part {
    width: 100%;
    justify-content: end;
    margin-right:30px;
  }

  .navbar-part-left {
    order: 1; /* Show this first */
    padding: 10px 0;
  }

  .navbar-part-right {
    order: 2; /* Show this below */
    padding-right:70px;
  }

  .admin-icon-wrapper {
    width: 30px;
    height: 30px;
  }

  .profile-image {
    width: 70px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .navbar-part-left {
    order: 1;
  }

  .navbar-part-right {
    order: 2;
    padding: 10px 0;
  }

  .profile-image {
    display: none;
  }
}
</style>
