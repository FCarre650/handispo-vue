<script setup>
import FooterButtons from '/src/components/footer.vue'
import HeaderBar from '/src/components/header.vue'
import PageButtons from '/src/components/buttons.vue'
import router from '../router'
import { emailPerson } from '/src/use/UseEmailPerson'
import { ref } from 'vue';

const visible = ref(false);

const formData = ref({})
const error_message = ref("")


async function checkUser () {
    console.log(formData.value)
    emailPerson.value = formData.value.email
    const response = await fetch('/auth/check_user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.value), 
    })

    if (response.status === 200) {
        router.push("/user-account")
    } else {
        error_message.value = "Email ou mot de passe incorrect "
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
  
          <a
            class="text-caption text-decoration-none text-black"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Mot de passe oublié?</a>
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
          v-model="formData.password"
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
          @click="checkUser"
          class="mb-8"
          color="surface-variant"
          size="large"
          variant="tonal"
          block
        >
          Connexion
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-black text-decoration-none"
            href="create-account"
            rel="noopener noreferrer"
          >
            Créer un compte <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
      <FooterButtons />
    </div>
</template>


<style>
@import '@mdi/font/css/materialdesignicons.css'

</style>