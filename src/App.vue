<template>
    <div class="bg-gray-900 w-[16rem]">
		<div class="w-full bg-gray-950 border-b border-gray-800 h-14 flex items-center px-5">
			<img src="/logo.png" alt="" width="80">
		</div>
		<div class="h-full text-gray-200 font-light">
			<div class="mt-5">
				<ul>
					<li class="mt-3 mb-1.5 text-gray-400 px-5 text-[0.7rem]">
						<span>UTAMA</span>
					</li>
					<li>
						<router-link to="/" class="h-11 hover:bg-gray-800 flex items-center nav" exact>
							<div class="flex items-center space-x-3 pl-4">
								<i class="ph ph-house text-green-300"></i>
								<div>Beranda</div>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/statistics" class="h-11 hover:bg-gray-800 flex items-center nav">
							<div class="flex items-center space-x-3 pl-4">
								<i class="ph ph-presentation-chart text-blue-300"></i>
								<div>Statistik</div>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/warning" class="h-11 hover:bg-gray-800 flex items-center nav">
							<div class="flex items-center space-x-3 pl-4">
								<i class="ph ph-warning text-red-300"></i>
								<div>Peringatan dini</div>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/report" class="h-11 hover:bg-gray-800 flex items-center nav">
							<div class="flex items-center space-x-3 pl-4">
								<i class="ph ph-file-text text-cyan-300"></i>
								<div>Laporan</div>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
    <div class="content-wrapper">
		<div class="w-full bg-green-600 text-green-50 h-14 flex items-center shadow justify-between px-5">
			<div class="flex items-center space-x-5">
				<div class="flex items-center"><i class="ph ph-calendar mr-2"></i> {{tanggal}}</div>
            <div class="flex items-center"><i class="ph ph-watch mr-1"></i> {{time}}</div>
			</div>
			<div class="h-full flex leading-none">
				<button class="h-full px-3.5 hover:bg-green-700 hover:bg-opacity-25">
					<i class="ph ph-dots-nine" style="font-size: 25px"></i>
				</button>
				<button class="h-full px-3.5 hover:bg-green-700 hover:bg-opacity-25 relative">
					<i class="ph ph-bell-simple" style="font-size: 25px"></i>
					<!-- <div class=" absolute rounded-full bg-yellow-400 top-1.5 min-w-5 h-5 left-7 px-1 flex items-center justify-center">
						<span class="text-xs text-gray-900">1</span>
					</div> -->
				</button>
				<button class="h-full px-3.5 hover:bg-green-700 hover:bg-opacity-25">
					<i class="ph ph-question" style="font-size: 25px"></i>
				</button>
				<div class="relative h-full">
					<dropdown-menu :right="true" class="h-full">
						<button v-if="user.auth.user" class="h-full px-3 hover:bg-green-700 hover:bg-opacity-25 text-right leading-none">
							<div class="text-lg font-semibold uppercase">PT SMM</div>
							<div class="text-xs uppercase">{{user.auth.user.name}}</div>
						</button>
						<template #dropdown>
							<ul class="text-gray-600 w-44">
								<li>
									<router-link to="/akun" class="px-3 py-3 hover:bg-gray-100 leading-none flex items-center space-x-3">
										<i class="ph ph-user-circle"></i> <span>Akun saya</span>
									</router-link>
								</li>
								<li>
									<a @click="signOut" href="$" class="px-3 py-3 hover:bg-gray-100 leading-none flex items-center space-x-3">
										<i class="ph ph-sign-out"></i> <span>Keluar</span>
									</a>
								</li>
							</ul>
						</template>
					</dropdown-menu>
				</div>
			</div>
		</div>
		<div id="content" class="content-inner flex-1">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script>
import { computed, onMounted, onUnmounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import DropdownMenu from './components/DropDownMenu.vue'
export default {
    components: {DropdownMenu},
	setup () {
		const store = useStore()
		const router = useRouter()

		onMounted(() => {
			dateTime()
		})
		onUnmounted(() => {
			clearTimeout(timer.value)
		})
		const tanggal = ref(null)
        const time = ref(null)
        const timer = ref(null)
		const dateTime = () => {
            timer.value = setTimeout(dateTime, 1000)
            const date = new Date()
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            const days = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
            const Y = date.getFullYear()
            const M = months[date.getMonth()]
            const day = days[date.getDay()]
            let D = date.getDate()
            let h = date.getHours()
            let m = date.getMinutes()
            let s = date.getSeconds()
            D = chekcTime(D)
            h = chekcTime(h)
            m = chekcTime(m)
            s = chekcTime(s)
            function chekcTime (i) {
                if(i < 10) {
                    i = `0${i}`
                }
                return i
            }
            tanggal.value = `${day}, ${D} ${M} ${Y}`
            time.value = `${h}:${m}:${s}`
        }
		const signOut = async () => {
			await store.dispatch('auth/logout')
			.then(() => {
				router.push('/login')
			})
		}
		return {
			user: computed(() => store.state),
			tanggal,
			time,
			signOut

		}
	}
}
</script>