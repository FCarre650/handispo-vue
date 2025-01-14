
<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
import PageButtons from '/src/components/buttons.vue'
</script>

<template>
<div class="phone_container">
   
    <HeaderBar/>
    <section class="presentation">
        <h1>Catalogue des sports</h1>
        <p>Trouvez le handisport qui vous va bien !
        </p>
    </section>

    <PageButtons/>
    <FooterButtons/>


</div>
</template>
