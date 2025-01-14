<script setup>
    import FooterButtons from '/src/components/footer.vue'
    import HeaderBar from '/src/components/header.vue'
    import { associations } from "/src/use/useAssociation"
    import {ref, onMounted} from 'vue'

    const associationList = ref([])

    onMounted(async () => {
        const response = await fetch("/api/listAsso")
        associationList.value = await response.json() 
        console.log("associationList", associationList.value)
        
        for (const association of associationList.value) {
            associations.value[association.id] = association
    }
 })
</script>

<template>
    <div class="phone_container">
        <HeaderBar />

        <section class="AssoList">
            <h1>LISTE DES ASSOCIATIONS</h1>

        </section>

        

        <section class="boutons">
            <div class="bouton_bas">
                <button class="btn_filtres">FILTRES</button>
                <button class="btn_geolocalisation">GÉOLOCALISATION</button>
            </div>
            
        </section>

        <section>
            <div class="flex">
                <v-list class="list">
                    <v-list-item v-for="association of associationList" key="association.id"> 
                        <div class=" boxAsso">
                            <p>{{ association.nom }}</p>
                            <p>{{ association.location }}</p>
                            <p>{{ association.address }}</p>
                            <p>{{ association.postalCode }} {{ association.city }}</p>
                            
                        </div>
                    </v-list-item>
                </v-list>
 
                <router-view class="detail"></router-view>
            </div>
        </section>

        <FooterButtons />

    </div>

</template>

<style scoped>
    .boxAsso{
        border:solid 1px;
    }
</style>