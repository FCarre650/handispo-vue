<script setup>
import FooterButtons from "/src/components/footer.vue";
import HeaderBar from "/src/components/header.vue";
import { associations } from "/src/use/useAssociation";
import { sports } from "../use/useSport";
import { handicaps } from "../use/useHandi";
import { ref, onMounted, computed } from "vue";

const associationList = ref([]);
const sportList = ref([]);
const handiList = ref([]);

const formData = ref({});
const loading = ref(true);
const dialog = ref(false);


onMounted(async () => {
  loading.value = true;

  //Récupération des associations
  const response = await fetch("/api/listAsso");
  associationList.value = await response.json();

  for (const association of associationList.value) {
    associations.value[association.id] = association;
  }

  //Récupération des sports
  const resp = await fetch("/api/listSport");
  sportList.value = await resp.json();
  console.log("Sports", sportList.value);

  for (const sport of sportList.value) {
    sports.value[sport.id] = sport;
  }

  //Récupération des handicaps
  const respHandi = await fetch("/api/listHandi");
  handiList.value = await respHandi.json();
  console.log("Type handicaps", handiList.value);

  for (const handicap of handiList.value) {
    handicaps.value[handicap.id] = handicap;
  }

  loading.value = false;
});


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
  });
  
</script>


<template>
  <div>
    <HeaderBar />

    <section class="AssoList">
      <h1>LISTE DES ASSOCIATIONS</h1>
    </section>

    <div class="bouton_haut">
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="btn_filtres"
            text="FILTRES"
            v-bind="activatorProps"
          ></v-btn>
        </template>

        <v-card prepend-icon="mdi-account" title="Filtres">
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  label="Recherche par code postal"
                  v-model="formData.postalCode"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4" sm="6">
               
                <v-select
                  :items="sportList"
                  item-title="name"
                  label="Type de sport"
                  v-model="formData.sport"
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

    <div v-if="loading" class="spinner">
      <v-progress-circular
        color="orange"
        indeterminate
        :size="45"
      ></v-progress-circular>
    </div>
    <section class= '' v-else>
      <div class="flex">
        <v-list class="list">
          <v-list-item v-for="association of filteredList" key="association.id">
            <div class="boxAsso">
              <h2>{{ association.name }}</h2>
              <p>📍 {{ association.location }}, {{ association.address }}, {{ association.postalCode }} {{ association.city }}</p>
              <p>{{ association.sports.map(sport => sport.name).join(", ") }}</p>
              <p>{{ association.handicaps.map(handicap => handicap.name).join(", ") }}</p>

              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    class="boutons-assoList"
                    v-bind="activatorProps"
                    color="surface-variant"
                    text="Contact"
                    variant="flat"
                    size="large"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Contact">
                    <v-card-text>
                      <div class="">
                        <p>📞  {{ association.phone }}</p>
                        <p>📩  {{ association.email }}</p>
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
                    class="boutons-assoList"
                    v-bind="activatorProps"
                    color="surface-variant"
                    text="Site Web"
                    variant="flat"
                    size="large"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Site Web">
                    <v-card-text>
                      <div class="boxAsso">
                        <a :href="association.website" target="_blank">{{
                          association.name
                        }}</a>
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
        <div></div>

        <router-view class="detail"></router-view>
      </div>
    </section>
    <FooterButtons />
  </div>
</template>

<style scoped>
.boxAsso {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 20px;
  margin: 10px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s;
}

a {
  text-decoration: none;
  color: black;
}

.spinner{
    display: flex;
    justify-content: center;
}

.boutons-assoList {
  margin: 10px;
}

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
