<script setup>
import calory from './calory.vue'
import sleep from  './sleepchart.vue'

</script>

<template>
<body>


<section class="dashboard my-8">

    <div class="dash-content">
        <div class="overview">
            <div class="title">
                <i class="uil uil-tachometer-fast-alt"></i>
                <span class="text">Dashboard</span>
            </div>

            <div class="boxes flex flex-wrap flex-col lg:flex-row mx-28">
                <div class="box box1 p-min-16">
                    <i class="uil uil-thumbs-up"></i>
                    <span class="text">Total Scroll Today</span>
                    <span class="number">50,120</span>
                </div>
                <div class="box box2">
                    <i class="uil uil-comments"></i>
                    <span class="text">Calories (Kcal) Today</span>
                    <span class="number">20,120</span>
                </div>
                <div class="box box3">
                    <i class="uil uil-share"></i>
                    <span class="text">Sleep Last night</span>
                    <span class="number">07:14</span>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="portfolio" id="portfolio">
    <h2>คำแนะนำ</h2>
    <p>Take a look at some of our memorable camping adventures.</p>
</section>


<main class="grid gap-8 grid-cols-1 md:grid-cols-2 mx-auto p-16">
    <calory class="" />
    <sleep class=""/>
</main>        
          

</body>
</template>

<style scoped>
/* ===== Google Font Import - Poppins ===== */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body{
    min-height: 100vh;
    background: linear-gradient(#ffdad5, #fff7f9);
}

.dashboard{
    position: relative;
    padding: 20px;
    border-radius: 12px;
}

.dash-content {
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    width: 90%;
}

.dash-content .title i{
    position: relative;
    height: 35px;
    width: 35px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}
.dash-content .title .text{
    font-size: 24px;
    font-weight: 500;
    margin-left: 10px;
}
.dash-content .boxes{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.dash-content .boxes .box{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem;
    width: 40%;
    background-color: #4DA3FF;
}
.boxes .box i{
    font-size: 35px;
}
.boxes .box .text{
    white-space: nowrap;
    font-size: 18px;
    font-weight: 500;
}
.boxes .box .number{
    font-size: 40px;
    font-weight: 500;
}
.boxes .box.box2{
    background-color: #FFE6AC;
}
.boxes .box.box3{
    background-color: #E7D1FC;
}

@media (max-width: 1000px) {
    nav{
        width: 73px;
    }
    nav.close{
        width: 250px;
    }
    nav .logo_name{
        opacity: 0;
        pointer-events: none;
    }
    nav.close .logo_name{
        opacity: 1;
        pointer-events: auto;
    }
    nav li a .link-name{
        opacity: 0;
        pointer-events: none;
    }
    nav.close li a .link-name{
        opacity: 1;
        pointer-events: auto;
    }
    nav ~ .dashboard{
        left: 73px;
        width: calc(100% - 73px);
    }
    nav.close ~ .dashboard{
        left: 250px;
        width: calc(100% - 250px);
    }
    nav ~ .dashboard .top{
        left: 73px;
        width: calc(100% - 73px);
    }
    nav.close ~ .dashboard .top{
        left: 250px;
        width: calc(100% - 250px);
    }
    .activity .activity-data{
        overflow-X: scroll;
    }
}

@media (max-width: 780px) {
    .dash-content .boxes .box{
        width: calc(100% / 2 - 15px);
        margin-top: 15px;
    }
}
@media (max-width: 560px) {
    .dash-content .boxes .box{
        width: 100% ;
    }
}
@media (max-width: 400px) {
    nav{
        width: 0px;
    }
    nav.close{
        width: 73px;
    }
    nav .logo_name{
        opacity: 0;
        pointer-events: none;
    }
    nav.close .logo_name{
        opacity: 0;
        pointer-events: none;
    }
    nav li a .link-name{
        opacity: 0;
        pointer-events: none;
    }
    nav.close li a .link-name{
        opacity: 0;
        pointer-events: none;
    }
    nav ~ .dashboard{
        left: 0;
        width: 100%;
    }
    nav.close ~ .dashboard{
        left: 73px;
        width: calc(100% - 73px);
    }
    nav ~ .dashboard .top{
        left: 0;
        width: 100%;
    }
    nav.close ~ .dashboard .top{
        left: 0;
        width: 100%;
    }
}


.portfolio {
    background: #ffffff;
    border-radius: 12px;
    position: relative;
    min-height: 25vh;
    padding: 19px 14px;
    border-radius: 12px;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 9%;
}

section h2 {
  font-size: 2rem;
}
section > p {
  text-align: center;
}

</style>

