<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
import { GoogleMap, Marker } from 'vue3-google-map'


const center = { lat: 43.60456242940044, lng: 1.443385651788076 }
</script>


<template>
    <div class="phone_container">
        <HeaderBar />

        <section class="carte">
            <h1>ENORME CARTE!</h1>

        </section>

        <section class="boutons">
            <div class="bouton_haut">
                <button class="btn_catalogue">CAAAAAAAAAARTE</button>
                <!-- DO NOT DEPLOY TO LIVE, THIS IS MY PERSONAL KEY AND ITS NOT HIDDEN -->
                <GoogleMap api-key="API" style="width: 100%; height: 500px" :center="center"
                    :zoom="15">
                    <CustomMarker :options="{ position: center, anchorPoint: 'BOTTOM_CENTER' }">
                        <div style="text-align: center">
                        </div>
                    </CustomMarker>
                </GoogleMap>
            </div>
        </section>

        <FooterButtons />

    </div>

</template>