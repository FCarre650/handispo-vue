<template>
<div class="phone_container">
    <header>
        <img src="../assets/images/logo.avif" alt="logo" class="logo">
        <img src="../assets/images/icone compte.png" alt="compte utilisateur" class="compte">
    </header>

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
            <button class="btn_liste" @click="$router.push('AssoList')">LISTE DES ASSOCIATIONS</button>
            <button class="btn_carte" @click="$router.push('Map')">CARTE</button>        </div>
    </section>

    <footer>
        <img src="../assets/images/icone_maison.png" alt="icone accueil" class="icone_maison">
        <img src="../assets/images/icone_liste.svg" alt="icone liste assos" class="icone_liste">
        <img src="../assets/images/icone_carte.png" alt="icone carte" class="icone_carte">
        <img src="../assets/images/icone_catalogue.webp" alt="icone catalogue" class="icone_catalogue">
        <img src="../assets/images/icone_aide.png" alt="icone aide" class="icone_aide">
    </footer>
</div>

</template>

<script setup>

</script>
