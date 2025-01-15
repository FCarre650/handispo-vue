
<script setup>
</script>

<template>
    <footer>
    <v-btn @click="$router.push('/')"variant="plain"><img src="../assets/images/accueil.png" alt="icone accueil" class="icone_maison"></v-btn>
    <v-btn @click="$router.push('asso-list')"variant="plain"><img src="../assets/images/liste-a-puces.png" alt="icone liste assos" class="icone_liste"></v-btn>
    <v-btn @click="$router.push('map')"variant="plain"><img src="../assets/images/icone_carte.png" alt="icone carte" class="icone_carte"></v-btn>
    <v-btn @click="$router.push('sports-catalog')"variant="plain"><img src="../assets/images/livre-ouvert.png" alt="icone catalogue" class="icone_catalogue"></v-btn>
    <v-btn @click="$router.push('help')"variant="plain"><img src="../assets/images/accessibilite.png" alt="icone aide" class="icone_aide"></v-btn>
    </footer>
</template>