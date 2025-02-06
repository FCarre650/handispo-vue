<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
import { ref } from 'vue';

const formData = ref({});
const visible = ref(false);

const error_message = ref("")

async function createAccount() {
    if (form_data.value.password === form_data.value.password2){
        const response = await fetch('/auth/create_account', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_data.value), 
        })

        if (response.status === 200) {
            router.push("login")
        } else if (response.status === 400){
            error_message.value = "l'email existe déjà "
        } else {
            error_message.value = "erreur inconnue"
        }
    } else { 
             error_message.value = "Les mots de passe sont diférents "
    }
}

</script>


<template>
    <div>
        <HeaderBar />
        
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Adresse email</div>
  
        <v-text-field
          density="compact"
          placeholder="example@gmail.com"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="formData.email"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Mot de passe

        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="*******"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formData.password"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Confirmez votre mot de passe
  
          
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="*******"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="formData.password2"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Erreur ???          
        </v-card-text>
        </v-card>
  
        <v-btn
          @submit.prevent="createAccount"
          class="mb-8"
          color="surface-variant"
          size="large"
          variant="tonal"
          block
        >
          Créer mon compte
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-black text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Connexion <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
      <FooterButtons />
    </div>
</template>


<style>
@import '@mdi/font/css/materialdesignicons.css'

</style>
