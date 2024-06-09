<template>
    <div class="m-5">
        <div class="bg-white rounded-t flex items-center border border-b-0 p-5">
            <calendar @selected="onSelect"></calendar>
            <div class="text-center ml-3">
                <button @click="onFilter('')" :class="{'!bg-green-500 border-green-500 text-green-50': filter == ''}" class="border bg-white h-9 px-5 rounded-l">Semua</button>
                <button @click="onFilter('min')" :class="{'!bg-green-500 border-green-500 text-green-50': filter == 'min'}" class="border bg-white h-9 px-5 border-l-0">Min</button>
                <button @click="onFilter('max')" :class="{'!bg-green-500 border-green-500 text-green-50': filter == 'max'}" class="border bg-white h-9 px-5 border-l-0 rounded-r">Max</button>
            </div>
            <div class="ml-3 relative">
                <button ref="parameterLists" @click="showDropdownParameter = true" class="h-9 rounded flex items-center overflow-hidden border">
                    <div class="h-9 w-9 bg-gray-100 flex items-center justify-center"><i class="ph ph-funnel"></i></div>
                    <div class="px-3">Filter parameter</div>
                </button>
                <ul v-show="showDropdownParameter" class="absolute w-64 bg-white z-10 rounded shadow-lg border mt-0.5 cursor-pointer h-96 overflow-x-scroll">
                    <li v-for="(p, i) in parameters" :key="i" @click="p.active = true" :class="{'bg-green-500 text-green-50 hover:bg-green-500': p.active}" class="px-5 py-2 hover:bg-gray-100 flex items-center justify-between">
                        {{p.text}}
                        <i v-if="p.active" class="ph ph-check"></i>
                    </li>
                </ul>
            </div>
            <div class="ml-auto flex items-center space-x-2">
                <button @click="modalSetting = true" class="bg-blue-500 h-9 w-9 flex items-center rounded justify-center text-blue-50"><i class="ph ph-gear"></i></button>
                <button @click="downloadData" class="bg-green-500 h-9 px-5 rounded text-green-50 flex items-center"><i class="ph ph-file-xls mr-3"></i>Unduh</button>
            </div>
        </div>
        <ul v-show="sensors.length > 0" class="bg-white pb-2 px-5 flex flex-wrap items-center flex-1 w-full max-w-full border-x">
            <div v-for="(p, i) in parameters" :key="i" class="mb-3">
                <div v-if="p.active" class="h-9 px-3 bg-white border-l-4 mr-3 border-purple-500 flex shadow-md items-center justify-center">
                    <div>{{p.text}}</div>
                    <button @click="p.active = false" class="flex items-center justify-center hover:text-red-500 ml-5 font-semibold"><span class="text-lg rotate-45">+</span></button>
                </div>
            </div>
        </ul>
        <table class="w-full bg-white">
            <thead class="border border-black">
                <th class="bg-black px-5 py-3 text-gray-200 cursor-pointer" style="width: 15%">
                    <div class="flex items-center">
                        WAKTU
                        <!-- <i class="ph ph-caret-up-down ml-3" style="font-size: 14px"></i> -->
                    </div>
                </th>
                <th class="bg-black px-5 py-3 text-gray-200 cursor-pointer">
                    <div class="flex items-center">
                        KETERANGAN
                        <!-- <i class="ph ph-caret-up-down ml-3" style="font-size: 14px"></i> -->
                    </div>
                </th>
                <th class="bg-black px-5 py-3 text-gray-200 cursor-pointer">
                    <div class="flex items-center">
                        PARAMETER
                        <!-- <i class="ph ph-caret-up-down ml-3" style="font-size: 14px"></i> -->
                    </div>
                </th>
                <th class="bg-black px-5 py-3 text-gray-200 cursor-pointer flex justify-end">
                    <div class="flex items-center justify-end">
                        NILAI
                        <!-- <i class="ph ph-caret-up-down ml-3" style="font-size: 14px"></i> -->
                    </div>
                </th>
            </thead>
            <tbody class="border divide-y">
                <tr v-for="(wr, i) in warnings" :key="i" :class="{'text-red-500': wr.threshold == 'max'}">
                    <td class="px-5 py-3">{{convDate(wr.insert_at)}} {{convTime(wr.insert_at)}}</td>
                    <td class="px-5 py-3">{{wr.description}}</td>
                    <td class="px-5 py-3">{{wr.parameter}}</td>
                    <td class="px-5 py-3 text-right">{{parseFloat(wr.value).toFixed(2)}}</td>
                </tr>
            </tbody>
        </table>
        <modal-peringatan :show="modalSetting" @close="modalSetting = false"></modal-peringatan>
        <div v-if="isLoading" class="h-9 bg-gray-300 bottom-5 px-5 rounded text-center flex items-center justify-center text-gray-500">Mohon tunggu...</div>
        <button v-show="showButton" @click="onButtonTotop" class="fixed h-11 w-11 rounded-full bg-blue-500 bottom-5 right-5 flex items-center justify-center text-blue-50"><i class="ph ph-arrow-up"></i></button>
        <div v-if="isDownload" class="fixed inset-0 bg-gray-500 bg-opacity-35 flex items-center justify-center">
            <div class="bg-white rounded p-5 border shadow-lg">Mohon tunggu data sedang diunduh...</div>
        </div>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import Calendar from '../components/CalendarVue.vue'
import ModalPeringatan from '../components/ModalPeringatan.vue'
import axios from 'axios'
import { onMounted, onUnmounted, watch } from '@vue/runtime-core'
export default {
    components: {Calendar, ModalPeringatan},
    setup () {
        const modalSetting = ref(false)
        const label = ref('Hari ini')
        const date = ref('')
        const filter = ref('')
        const showDropdownParameter = ref(false)
        const parameterLists = ref(null)
        const parameters = ref([
            {text: 'pH', active: false},
            {text: 'Temp', active: false},
            {text: 'COD 1B', active: false},
            {text: 'COD 2B', active: false},
            {text: 'COD 1C', active: false},
            {text: 'COD 2C', active: false},
            {text: 'COD A5', active: false},
            {text: 'DO 1B', active: false},
            {text: 'DO 2B', active: false},
            {text: 'DO 1C', active: false},
            {text: 'DO 2C', active: false},
            {text: 'TSS', active: false},
            {text: 'NH3N', active: false},
            {text: 'DEBIT J1', active: false},
            {text: 'DEBIT J2', active: false},
        ])
        const sensors = ref([])
        watch(parameters.value, () => {
            sensors.value = []
            for(let i = 0; i < parameters.value.length; i++) {
                const el = parameters.value[i]
                if(el.active) {
                    sensors.value.push(el.text)
                }
            }
            warnings.value = []
            getData()
        })
        onMounted(() => {
            document.body.addEventListener('click', closeParameterLists)
            document.getElementById('content').addEventListener('scroll', onScroll)
        })
        onUnmounted(() => {
            document.body.removeEventListener('click', closeParameterLists)
            document.getElementById('content').removeEventListener('scroll', onScroll)
        })
        const onButtonTotop = () => {
            document.getElementById('content').scrollTo({top: 0, behavior: 'smooth'})
        }
        const onScroll = () => {
            const content = document.getElementById('content')
            const {scrollTop, scrollHeight, clientHeight} = content
            if(scrollTop + clientHeight + 0.5 >= scrollHeight && isEnd.value) {
                isLoading.value = true
                getData(page.value += 1)
            }
            if(scrollTop > 200) {
                showButton.value = true
            } else {
                showButton.value = false
            }
        }
        const closeParameterLists = (e) => {
            if(!e || !parameterLists.value.contains(e.target)) {
                showDropdownParameter.value = false
            }
        }
        const showButton = ref(false)
        const warnings = ref([])
        const page = ref(1)
        const isLoader = ref(false)
        const isLoading = ref(false)
        const isEnd = ref(false)
        const isDownload = ref(false)
        const onSelect = (lb, dt) => {
            label.value = lb
            date.value = dt
            page.value = 1
            warnings.value = []
            getData()
        }
         const onFilter = (val) => {
            filter.value = val
            page.value = 1
            warnings.value = []
            getData()
        }
        onMounted(() => {
            getData()
        })
        const getData = () => {
            isLoader.value = true
            isLoading.value = true
            axios.get('/warnings', {
                params: {
                    label: label.value,
                    date: date.value,
                    filter: filter.value,
                    page: page.value,
                    parameter: sensors.value
                }
            })
            .then(res => {
                isLoader.value = false
                isLoading.value = false
                const data = res.data
                if(data.length > 0) {
                    isEnd.value = true
                } else {
                    isEnd.value = false
                }
                for (let i = 0; i < data.length; i++) {
                    const el = data[i];
                    warnings.value.push(el)
                }
            })
        }
        const downloadData = () => {
            isDownload.value = true
            axios.get('/warnings/download', {
                params: {
                    label: label.value,
                    date: date.value,
                    filter: filter.value,
                    parameter: sensors.value
                },
                responseType: 'blob'
            })
            .then(response => {
                isDownload.value = false
                const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'peringatan.xlsx');
				document.body.appendChild(link);
				link.click();
            })
        }
        const convDate = (d) => {
            const date = new Date(d)
            const Y = date.getFullYear().toString().substr(-2)
            let M = date.getMonth() + 1
            let D = date.getDate()
            M = checkTime(M)
            D = checkTime(D)
            function checkTime (i) {
                if( i < 10) {
                    i = `0${i}`
                }
                return i
            }
            return `${D}/${M}/${Y}`
        }
        const convTime = (t) => {
            const date = new Date(t)
            let h = date.getHours()
            let m = date.getMinutes()
            let s = date.getSeconds()
            h = checkTime(h)
            m = checkTime(m)
            s = checkTime(s)
            function checkTime (i) {
                if(i < 10) {
                    i = `0${i}`
                }
                return i
            }
            return `${h}:${m}:${s}`
        }
        return {
            modalSetting,
            filter,
            showDropdownParameter,
            parameterLists,
            parameters,
            sensors,
            warnings,
            isLoader,
            isLoading,
            isDownload,
            showButton,
            onSelect,
            onFilter,
            convDate,
            convTime,
            onButtonTotop,
            downloadData
        }
    }
}
</script>