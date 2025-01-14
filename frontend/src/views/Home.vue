
<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
</script>

<template>
<div class="phone_container">
   
    <HeaderBar/>
    <section class="presentation">
        <h1>Bienvenue sur Handispo !</h1>
        <p>Explorez des activités adaptées à vos besoins et découvrez des associations,
            des ressources, et des sports conçus pour vous.
        </p>
    </section>

    <section class="boutons">
        <div class="bouton_haut">
            <button class="btn_catalogue">CATALOGUE DES SPORTS</button>
        </div>

        <div class="boutons_bas">
            <button class="btn_liste" @click="$router.push('asso-list')">LISTE DES ASSOCIATIONS</button>
            <button class="btn_carte" @click="$router.push('map')">CARTE</button>        </div>
    </section>

    <FooterButtons/>


</div>

</template>
