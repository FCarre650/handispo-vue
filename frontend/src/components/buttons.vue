<script setup>
</script>


<template>
    <section class="boutons">
        <div class="bouton_haut">
            <button class="btn_catalogue" @click="$router.push('sports-catalog')">CATALOGUE DES SPORTS</button>
        </div>

        <div class="boutons_bas">
            <button class="btn_liste" @click="$router.push('asso-list')">LISTE DES ASSOCIATIONS</button>
            <button class="btn_carte" @click="$router.push('map')">CARTE</button>        </div>
    </section>
</template>