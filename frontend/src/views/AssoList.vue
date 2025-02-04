<script setup>
    import FooterButtons from '/src/components/footer.vue'
    import HeaderBar from '/src/components/header.vue'
    import { associations } from "/src/use/useAssociation"
    import {ref, onMounted, computed} from 'vue'

    const associationList = ref([])
    const formData = ref({})
    const loading = ref(true);
    const dialog = ref(false);
    
    onMounted(async () => {
        loading.value = true;
        const response = await fetch("/api/listAsso")
        associationList.value = await response.json()
        loading.value = false;
        
        for (const association of associationList.value) {
            associations.value[association.id] = association
    }
 })

    /* This bit of code takes the formdata value (user input in the specified field) 
    and returns a second list with only the specified associations. 
    If form is empty, returns the full list. */

 const filteredList = computed(() => {
        let searchValue = formData.value.postalCode
        console.log(associationList.value.postalCode)
        if (searchValue)
            return associationList.value.filter(association => association.postalCode.includes(searchValue))
        return associationList.value
    })

</script>

<template>
    <div>
        <HeaderBar />

        <section class="AssoList">
            <h1>LISTE DES ASSOCIATIONS</h1>
        </section>

        <div class="bouton_haut">
        <v-dialog
        v-model="dialog"
        >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            class="btn_filtres"
            text="FILTRES"
            v-bind="activatorProps"
            ></v-btn>
        </template>

        <v-card
            prepend-icon="mdi-account"
            title="Filtres"
        >
            <v-card-text>
            <v-row dense>
                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-text-field
                    label="Recherche par code postal"
                    v-model="formData.postalCode"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                sm="6"
                >
                <v-select
                    :items="['Badminton', 'Rugby']"
                    label="Type de sport"
                    required
                ></v-select>
                </v-col>

                <v-col
                cols="12"
                sm="6"
                >
                <v-select
                    :items="['Occitanie']"
                    label="Région"
                    required
                ></v-select>
                </v-col>

                <v-col
                cols="12"
                sm="6"
                >
                <v-autocomplete
                    :items="['Haute-Garonne', 'Lot', 'Ariège', 'Tarn', 'Aude']"
                    label="Département"
                    auto-select-first
                    multiple
                ></v-autocomplete>
                </v-col>
            </v-row>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                text="FERMER"
                variant="plain"
                @click="dialog = false"
            ></v-btn>

            <v-btn
                color="primary"
                text="Valider"
                variant="tonal"
                @click="dialog = false"
            ></v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
  </div>

        <div v-if="loading" class="spinner">
            <v-progress-circular color="orange" indeterminate :size="45"></v-progress-circular>
        </div>
        <section v-else>

            <div class="flex">
                <v-list class="list">
                    <v-list-item v-for="association of filteredList" key="association.id"> 
                        <div class=" boxAsso">
                            <p>{{ association.name }}</p>
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                    v-bind="activatorProps"
                                    color="surface-variant"
                                    text="Contact"
                                    variant="flat"
                                    ></v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Contact">
                                    <v-card-text>
                                        <div class=" boxAsso">
                                        <p>{{ association.name }}</p>
                                        <p>{{ association.location }}</p>
                                        <p>{{ association.address }}</p>
                                        <p>{{ association.postalCode }} {{ association.city }}</p>
                                    </div>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                        text="Fermer"
                                        @click="isActive.value = false"
                                        ></v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>


                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                    v-bind="activatorProps"
                                    color="surface-variant"
                                    text="Site Web"
                                    variant="flat"
                                    ></v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Site Web">
                                    <v-card-text>
                                        <div class=" boxAsso">
                                        <a :href="association.website" target="_blank">{{ association.name }}</a>
                                        </div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                        text="Fermer"
                                        @click="isActive.value = false"
                                        ></v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </div>
                    </v-list-item>
                </v-list>
                <div>   
                </div>

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

    a {
        text-decoration: none;
        color: black;
    }

    .spinner{
        display: flex;
        justify-content: center;
    }

    .btn_filtres {
        text-align: center;
        width: 100%; /* Prend 50% de la largeur du conteneur */
        height: 300px;
        padding: 20px; /* Espacement interne pour le bouton */
        background-color: #d24b1a; /* Couleur de fond */
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: white; /* Couleur du texte */
        border: none; /* Pas de bordure */
        border-radius: 5px; /* Coins arrondis */
        cursor: pointer;
    }

</style>
