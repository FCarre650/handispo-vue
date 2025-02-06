<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
import router from '../router'
import { ref } from 'vue';

const formData = ref({});
const visible = ref(false);

const error_message = ref("")

async function createAccount() {
    if (formData.value.password === formData.value.password2){
        const response = await fetch('/auth/create_account', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData.value), 
        })

        if (response.status === 200) {
            router.push("/login")
        } else if (response.status === 400){
            error_message.value = "L'email existe déjà "
        } else {
            error_message.value = "Erreur inconnue"
        }
    } else { 
             error_message.value = "Les mots de passe sont différents "
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
          type="email"
          id="email"
          name="email"
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
          type="password"
          id="password"
          name="password"
          minlength = 6
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
          type="password"
          id="password2"
          name="password2"
          minlength = 6
          v-model="formData.password2"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption error" v-if="error_message">
            {{error_message}}          
        </v-card-text>
        </v-card>
  
        <v-btn
          @click="createAccount"
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
            href="login"
            rel="noopener noreferrer"
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
