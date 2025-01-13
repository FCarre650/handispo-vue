
<script setup>
</script>

<template>
    <footer>
    <v-btn @click="$router.push('/')"><img src="../assets/images/icone_maison.png" alt="icone accueil" class="icone_maison"></v-btn>
    <v-btn @click="$router.push('asso-list')">"<img src="../assets/images/icone_liste.svg" alt="icone liste assos" class="icone_liste"></v-btn>
    <v-btn @click="$router.push('Map')"><img src="../assets/images/icone_carte.png" alt="icone carte" class="icone_carte"></v-btn>
    <v-btn @click="$router.push('SportsCatalog')"><img src="../assets/images/icone_catalogue.webp" alt="icone catalogue" class="icone_catalogue"></v-btn>
    <v-btn @click="$router.push('Help')"><img src="../assets/images/icone_aide.png" alt="icone aide" class="icone_aide"></v-btn>
    </footer>
</template>