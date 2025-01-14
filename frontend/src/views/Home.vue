
<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
import PageButtons from '/src/components/buttons.vue'
</script>

<template>
<div class="phone_container">
   
    <HeaderBar/>
    <section class="presentation">
        <h1>Bienvenue sur Handispo !</h1>
        <p>Explorez des activités adaptées à vos besoins et découvrez des associations,
            des ressources, et des sports conçus pour vous !
        </p>
    </section>

    <PageButtons/>
    <FooterButtons/>


</div>
</template>
