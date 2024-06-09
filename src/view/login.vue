<template>
    <div class="h-screen fixed inset-0 flex items-center justify-center bg-gray-100">
        <form @submit.prevent="onSubmit">
            <div class="bg-white w-80 shadow-lg p-5 border rounded relative overflow-hidden">
                <div class="py-5 text-center">
                    <i class="ph ph-user-circle text-gray-500" style="font-size: 90px"></i>
                </div>
                <div class="text-center text-xl mb-3">Masuk ke akun anda</div>
                <div class="text-center text-gray-400 text-xs">Masukkan kredensial Anda di bawah ini</div>
                <div class="my-5">
                    <div class="relative flex items-center">
                        <input v-model="form.email" type="email" name="user_email" @keydown="err.email=''" :class="{'!border-red-500': err.email}" class="h-9 w-full border rounded pl-9 pr-3 focus:outline-none focus:border-teal-500" placeholder="email">
                        <div class="absolute left-3 flex items-center"><i class="ph ph-at text-gray-400" style="font-size: 20px"></i></div>
                    </div>
                    <div class="text-red-500 text-xs mt-1">{{err.email}}</div>
                </div>
                <div class="my-5">
                    <div class="relative flex items-center">
                        <input v-model="form.password" type="password" name="user_password" @keydown="err.password = ''" :class="{'!border-red-500': err.password}" class="h-9 w-full border rounded pl-9 pr-3 focus:outline-none focus:border-teal-500" placeholder="sandi">
                        <div class="absolute left-3 flex items-center"><i class="ph ph-lock-key text-gray-400" style="font-size: 20px"></i></div>
                    </div>
                    <div class="text-red-500 text-xs mt-1">{{err.password}}</div>
                </div>
                <div class="mb-10">
                    <button class="h-9 w-full bg-blue-500 rounded text-blue-50">Masuk</button>
                </div>
            </div>
            <div class="my-10 text-center">
                <div class="text-xs text-gray-500">PT. Sarana Makin Mulia</div>
                <div class="text-xs text-gray-500"></div>
                <div class="text-xs mt-1.5">@2024 Indo Haromonis Abadi | <a href="https://iha.co.id" target="_blank">iha.co.id</a> </div>
            </div>
        </form>
        <div v-if="isLoading" class="absolute w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup () {
        const store = useStore()
        const router = useRouter()
        const form = ref({
            email: '',
            password: ''
        })
        const err = ref({
            email: '',
            password: ''
        })
        const isLoading = ref(false)
        const onSubmit = () => {
            if(!form.value.email) {
                err.value.email = 'Eamil haurs disiri'
            }
            if(!form.value.password) {
                err.value.password = 'Kata sandi harus diisi'
            }
            if(form.value.email && form.value.password) {
                isLoading.value = true
                store.dispatch('auth/login', form.value)
                .then(() => {
                    isLoading.value = false
                    router.push('/')
                })
                .catch(error => {
                    isLoading.value = false
                    const errResponse = error.response.data
                    if(errResponse == 'Email tidak ditemukan') {
                        err.value.email = errResponse
                    } else {
                        err.value.password = errResponse
                    }
                })
            }
        }
        return {
            form,
            err,
            isLoading,
            onSubmit
        }
    }
}
</script>