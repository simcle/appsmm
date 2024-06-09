<template>
    <div class="m-5 grid grid-cols-2 gap-5 relative">
        <div class="bg-white rounded border p-5 relative">
            <div class="font-semibold mb-5">INFO PENGGUNA</div>
            <form @submit.prevent="onSubmitInfo" action="">
                <div class="mb-5">
                    <div class="mb-1">Nama lengkap</div>
                    <input v-model="form.name" type="text" @keydown="errInfo.name = ''" name="user_name" :class="{'border-red-500': errInfo.name}" class="h-9 w-full border rounded px-3 focus:outline-none">
                    <span class="text-xs text-red-500 mt-0.5">{{errInfo.name}}</span>
                </div>
                <div class="mb-5">
                    <div class="mb-1">Email</div>
                    <input v-model="form.email" type="email" @keydown="errInfo.email = ''" name="user_email" :class="{'border-red-500': errInfo.email}" class="h-9 w-full border rounded px-3 focus:outline-none">
                     <span class="text-xs text-red-500 mt-0.5">{{errInfo.email}}</span>
                </div>
                <div class="text-right">
                    <button type="submit" class="h-9 px-5 rounded bg-blue-500 hover:bg-blue-600 text-blue-50">Update</button>
                </div>
            </form>
            <div v-if="loaderInfo" class="absolute bg-gray-900 inset-0 rounded bg-opacity-50 flex items-center justify-center">
                <div class="loader"></div>
            </div>
        </div>

        <div class="bg-white rounded border p-5 relative">
            <div class="font-semibold mb-5">GANTI PASSWORD</div>
            <form @submit.prevent="updatePassword">
                <div class="mb-5">
                    <div class="mb-1">Sandi Baru</div>
                    <input v-model="formPassword.password" type="password" name="sandi" @keydown="errPassword.password = ''" :class="{'border-red-500': errPassword.password}" class="h-9 w-full border rounded px-3 focus:outline-none" placeholder="isi dengan kata sandi baru" minlength="6">
                    <span class="text-red-500 mt-0.5 text-xs">{{errPassword.password}}</span>
                </div>
                <div class="mb-5">
                    <div class="mb-1">Ulangi Sandi</div>
                    <input v-model="formPassword.repeatassword" type="password" name="ulangi_sandi" @keydown="errPassword.repeatassword = ''" :class="{'border-red-500':errPassword.repeatassword}" class="h-9 w-full border rounded px-3 focus:outline-none" placeholder="ulangi kata sandi baru" minlength="6">
                    <span class="text-red-500 mt-0.5 text-xs">{{errPassword.repeatassword}}</span>
                </div>
                <div class="text-right">
                    <button type="submit" class="h-9 px-5 rounded bg-blue-500 hover:bg-blue-600 text-blue-50">Update</button>
                </div>
            </form>
            <div v-if="loaderPassword" class="absolute bg-gray-900 inset-0 rounded bg-opacity-50 flex items-center justify-center">
                <div class="loader"></div>
            </div>
        </div>
        <transition enter-active-class="animate__animated animate__bounceInDown animate_faster" leave-active-class="animate__animated animate__bounceOutRight animate__faster">
            <div v-show="notif" class="absolute right-0 bg-black px-3 py-2 text-green-500 rounded">
                <div class="flex items-center">
                    <i class="ph ph-check-circle"></i>
                    <div class="ml-3">Data berhasil diperbarui</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref } from '@vue/runtime-core'
import {useStore} from 'vuex'
import axios from 'axios'
export default {
    setup () {
        const store = useStore()
        const user = store.state.auth.user
        const form = ref({
            name: user.name,
            email: user.email
        })
        const errInfo = ref({
            name: '',
            email: ''
        })
        const formPassword = ref({
            password: '',
            repeatassword: ''
        })
        const errPassword = ref({
            password: '',
            repeatassword: ''
        })
        const notif = ref(false)
        const loaderInfo = ref(false)
        const loaderPassword = ref(false)
        const onSubmitInfo = () => {
            if(!form.value.name) {
                errInfo.value.name = 'Nama harus diisi!'
            }
            if(!form.value.email) {
                errInfo.value.email = 'Email harus diisi!'
            }
            if(form.value.name && form.value.email) {
                loaderInfo.value = true
                axios.put('/auth/update', form.value)
                .then(() => {
                    loaderInfo.value = false
                    notif.value = true
                    setTimeout(() => {
                        notif.value = false
                    }, 2500)
                    store.dispatch('auth/user')
                })
            }
        }
        const updatePassword = () => {
            if(!formPassword.value.password) {
                errPassword.value.password = 'Kata sandi tidak boleh kosong'
            }
            if(!formPassword.value.repeatassword) {
                errPassword.value.repeatassword = 'Ulangi kata sandi'
            }
            if(formPassword.value.password !== formPassword.value.repeatassword) {
                errPassword.value.repeatassword = 'kata sandi tidak sama'
            }
            if(formPassword.value.password && formPassword.value.repeatassword && formPassword.value.password === formPassword.value.repeatassword) {
                loaderPassword.value = true
                axios.put('auth/password', formPassword.value)
                .then(() => {
                    loaderPassword.value = false
                    formPassword.value.password = ''
                    formPassword.value.repeatassword = ''
                    notif.value = true
                    setTimeout(() => {
                        notif.value = false
                    }, 2500)
                })
            }
        }
        return {
            form,
            errInfo,
            formPassword,
            errPassword,
            notif,
            loaderInfo,
            loaderPassword,
            onSubmitInfo,
            updatePassword
        }
    }
}
</script>