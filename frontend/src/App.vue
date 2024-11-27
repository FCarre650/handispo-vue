<script setup>
import Handispo from './components/Handispo.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <div>
    <img alt="JULIEN" class="logo" src="./assets/JULIEN.png" width="125" height="125" />
    <img alt="PROFIL" class="logo" src="./assets/profile.svg" width="60" height="60" />
    </div>
    <div class="wrapper">
      <Handispo msg="Bienvenue sur Handispo!" />
    </div>
    <div class="catalogue"><button class=button-24 role="button">Catalogue des sports</button></div>
    <div class="mainbuttons"><button class="button-24" role="button">Liste des Associations</button><button class="button-24" role="button">Carte</button>
    </div> 
  <div class="footer">BOUTON12345</div> </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  display:flex;
  line-height: 1.5;
  border: 1px solid red;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border: 1px solid orange;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    place-items: flex-start;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    flex-direction: column;
    border: 1px solid white;
  }
}

.button-24 {
  background: #FF4742;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.button-24:hover,
.button-24:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.button-24:active {
  opacity: .5;
}

</style>
