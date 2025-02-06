<script setup>
    import FooterButtons from '/src/components/footer.vue'
    import HeaderBar from '/src/components/header.vue'
    import { associations } from "/src/use/useAssociation"
    import { sports } from "../use/useSport"
    import { handicaps } from "../use/useHandi"
    import {ref, onMounted, computed} from 'vue'
    import { GoogleMap, Marker } from 'vue3-google-map'


    const associationList = ref([])
    const sportList = ref([]);
    const handiList = ref([]);

    const formData = ref({})
    const loading = ref(true);
    const dialog = ref(false);
    const center = { lat: 43.60456242940044, lng: 1.443385651788076 }

    
    onMounted(async () => {
        loading.value = true;

        // Récupération des associations
        const response = await fetch("/api/listAsso")
        associationList.value = await response.json()
        
        for (const association of associationList.value) {
            associations.value[association.id] = association
        }

        // Récupération des sports 
        const resp = await fetch("/api/listSport");
        sportList.value = await resp.json();
        console.log("Sports", sportList.value);

        for (const sport of sportList.value) {
            sports.value[sport.id] = sport;
        }

        // Récupération des handicaps
        const respHandi = await fetch("/api/listHandi");
        handiList.value = await respHandi.json();
        console.log("Type handicaps", handiList.value);

        for (const handicap of handiList.value) {
            handicaps.value[handicap.id] = handicap;
        }

        loading.value = false;
    })

    /* This bit of code takes the formdata value (user input in the specified field) 
    and returns a second list with only the specified associations. 
    If form is empty, returns the full list. */

    const filteredList = computed(() => {
        let filtered = associationList.value;

        // Filtrer par code postal 
        if (formData.value.postalCode) {
            filtered = filtered.filter((association) =>
                association.postalCode.includes(formData.value.postalCode)
            );
        }

        // Filtrer par sport
        if (formData.value.sport) {
            console.log("Sport sélectionné:", formData.value.sport);
            console.log("Nom du sport sélectionné:", formData.value.sport);
            filtered = filtered.filter((association) =>
            association.sports.some(sport => sport.name === formData.value.sport)
            );
            console.log("YOUHOUUUUUUUUUUUUUUUUU", filtered)
        }

        // Filtrer par handicap 
        if (formData.value.handicap) {
            console.log("Handicap sélectionné:", formData.value.handicap);
            console.log("Nom handicap sélectionné:", formData.value.handicap);
            filtered = filtered.filter((association) =>
                association.handicaps.some(handicap => handicap.name === formData.value.handicap)
            );
            console.log("YOUHOUUUUUUUUUUUUUUUUU2", filtered)
        }
        return filtered;
    })

</script>


<template>
    

    <HeaderBar/>

    <section class="carte">
        <h1>TROUVER UNE ASSOCIATION</h1>
        
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
                    :items="sportList"
                    item-title="name"
                    label="Type de sport"
                    v-model = "formData.sport"
                    required
                ></v-select>
                </v-col>
                
                <v-col cols="12" sm="6">
                <v-select
                  :items="handiList"
                  item-title="name"
                  label="Type de handicap"
                  v-model="formData.handicap"
                  required
                ></v-select>
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

        <section class="boutons">
            <div class="bouton_haut">
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

    <FooterButtons/>

    
</template>
    

<style scoped>

.btn_filtres {
  text-align: center;
  align-content: center;
  width: 100%; /* Prend 50% de la largeur du conteneur */
  height: 300px;
  padding: 40px; /* Espacement interne pour le bouton */
  background-color: #d24b1a; /* Couleur de fond */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: white; /* Couleur du texte */
  border: none; /* Pas de bordure */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer;
}

</style>
