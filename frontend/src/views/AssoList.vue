<script setup>
    import FooterButtons from '/src/components/footer.vue'
    import HeaderBar from '/src/components/header.vue'
    import { associations } from '/src/use/UseAssociation'

    import { ref, onMounted } from 'vue'

    const assoList = ref([])

    onMounted(async () => {
        const response = await fetch("/api/listAsso")
        assoList.value = await response.json()
        console.log("Liste des associations", assoList.value)

        for (const association of assoList.value) {
            associations.value[association.id] = association
        }
    })
    

</script>

<template>
    <div class="phone_container">
        <HeaderBar />

        <section class="AssoList">
            <h1>LISTE DES ASSOS!</h1>

        </section>

        <section>
            <div class="flex">
                <ul class="list">
                    <li v-for="asso of assoList" >
                        {{ asso.name }}
                        {{ asso.location }}
                        {{ asso.address }}
                        {{ asso.postalCode }}
                        {{ asso.city }}
                    </li>
                </ul>
            </div>
        </section>

        <FooterButtons />

    </div>

</template>