<template>
    <div class="m-5">
        <div class="bg-white rounded-t flex items-center border border-b-0 p-5">
            <calendar @selected="onSelect"></calendar>
            <div class="text-center ml-3">
                <button @click="onFilter('2 menit')" :class="{'!bg-green-500 text-green-50 border-green-500': filter == '2 menit'}" class="border border-r-0 bg-white h-9 px-5 rounded-l">2 menit</button>
                <button @click="onFilter('1 jam')" :class="{'!bg-green-500 text-green-50 border-green-500': filter == '1 jam'}" class="border bg-white h-9 px-5 border-l-0 rounded-r">1 jam</button>
            </div>
            <div class="ml-auto flex items-center space-x-2">
                <button @click="downloadData" :class="{'bg-green-300 cursor-not-allowed text-green-100': label=='Per tahun'}" class="bg-green-500 h-9 px-5 rounded text-green-50 flex items-center" :disabled="label=='Per tahun'"><i class="ph ph-file-xls mr-3"></i>Unduh</button>
            </div>
        </div>
        <div v-show="false" class="bg-white px-5 pb-5 flex border-x">
            <div class="h-9 px-5 border-l-4 border-red-500 flex shadow-md items-center justify-center">
                <div>Temp</div>
                <button class="flex items-center justify-center ml-5 font-semibold"><span class="text-lg rotate-45">+</span></button>
            </div>
        </div>
        <div class="relative">
            <div class="w-full overflow-y-visible overflow-x-scroll border bg-white">
                <table class="w-full">
                    <thead class="">
                        <th class="bg-black pl-5 pr-3 py-3 text-gray-200 absolute w-44">Tanggal</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap pl-48">pH</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">TEMP</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">COD J1</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">COD J2</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">COD 2B</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">COD 1C</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">COD 2C</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">DO 1B</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">DO 2B</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">DO 1C</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">DO 2C</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right">TSS</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right">NH3N</th>
                        <th class="bg-black px-3 py-3 text-gray-200 text-right whitespace-nowrap">Debit J1</th>
                        <th class="bg-black pl-3 pr-5 py-3 text-gray-200 text-right whitespace-nowrap">Debit J2</th>
                    </thead>
                    <tbody v-if="isLoader" class="divide-y w-full">
                        <tr v-for="i in 20" :key="i">
                            <td class="px-5 py-3 flex bg-white border-r absolute w-44 top-auto z-10">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-40"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right pl-48">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="ph-item">
                                    <div class="h-4 bg-gray-200 w-11"></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else class="divide-y w-full whitespace-nowrap">
                        <tr v-for="(log, i) in loggers" :key="i">
                            <td class="px-5 py-3 flex bg-white border-r absolute w-44 top-auto whitespace-nowrap">{{convDate(log.insert_at)}} <span class="ml-3 text-green-600 flex items-center"><i class="ph ph-watch mr-0.5" style="font-size: 16px"></i>{{convTime(log.insert_at)}}</span></td>
                            <td class="px-3 py-3 text-right pl-48">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.ph_1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].ph_1 < loggers[i+1].ph_1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].ph_1 > loggers[i+1].ph_1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].ph_1 == loggers[i+1].ph_1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.temp_1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].temp_1 < loggers[i+1].temp_1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].temp_1 > loggers[i+1].temp_1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].temp_1 == loggers[i+1].temp_1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.cod_j1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_j1 < loggers[i+1].cod_j1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_j1 > loggers[i+1].cod_j1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_j1 == loggers[i+1].cod_j1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.cod_j2).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_j2 < loggers[i+1].cod_j2 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_j2 > loggers[i+1].cod_j2 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_j2 == loggers[i+1].cod_j2 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.cod_2).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_2 < loggers[i+1].cod_2 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_2 > loggers[i+1].cod_2 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_2 == loggers[i+1].cod_2 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.cod_3).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_3 < loggers[i+1].cod_3 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_3 > loggers[i+1].cod_3 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_3 == loggers[i+1].cod_3 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.cod_4).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_4 < loggers[i+1].cod_4 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_4 > loggers[i+1].cod_4 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].cod_4 == loggers[i+1].cod_4 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.do_1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_1 < loggers[i+1].do_1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_1 > loggers[i+1].do_1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_1 == loggers[i+1].do_1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.do_2).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_2 < loggers[i+1].do_2 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_2 > loggers[i+1].do_2 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_2 == loggers[i+1].do_2 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.do_3).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_3 < loggers[i+1].do_3 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_3 > loggers[i+1].do_3 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_3 == loggers[i+1].do_3 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.do_4 || 0).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_4 < loggers[i+1].do_4 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_4 > loggers[i+1].do_4 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].do_4 == loggers[i+1].do_4 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.tss_1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].tss_1 < loggers[i+1].tss_1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].tss_1 > loggers[i+1].tss_1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].tss_1 == loggers[i+1].tss_1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.nh3n_1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].nh3n_1 < loggers[i+1].nh3n_1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].nh3n_1 > loggers[i+1].nh3n_1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].nh3n_1 == loggers[i+1].nh3n_1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="px-3 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.debit_1).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].debit_1 < loggers[i+1].debit_1 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].debit_1 > loggers[i+1].debit_1 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].debit_1 == loggers[i+1].debit_1 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                            <td class="pl-3 pr-5 py-3 text-right">
                                <div class="flex items-center justify-end">
                                    <div class="mr-1">{{parseFloat(log.debit_2).toFixed(2)}}</div>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].debit_2 < loggers[i+1].debit_2 "><i class="ph-fill ph-caret-down text-green-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].debit_2 > loggers[i+1].debit_2 "><i class="ph-fill ph-caret-up text-red-500"></i></span>
                                    <span class="flex items-center" v-if="i < loggers.length -1 && loggers[i].debit_2 == loggers[i+1].debit_2 "><i class="ph-fill ph-caret-up-down"></i></span>
                                    <span class="flex items-center" v-if="loggers.length == (i+1) "><i class="ph-fill ph-caret-up-down"></i></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>
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
import axios from 'axios'
import { onMounted, onUnmounted } from '@vue/runtime-core'
export default {
    components: {Calendar},
    setup () {
        const loggers = ref([])
        const label = ref('Hari ini')
        const date = ref('')
        const filter = ref('2 menit')
        const page = ref(1)
        const showButton = ref(false)
        const isLoading = ref(false)
        const isLoader = ref(false)
        const isDownload = ref(false)
        const isEnd = ref(false)
        const onSelect = (lb, dt) => {
            label.value = lb
            date.value = dt
            loggers.value = []
            isLoader.value = true
            page.value = 1
            getData()
        }
        const onFilter = (val) => {
            filter.value = val
            loggers.value = []
            page.value = 1
            isLoader.value = true
            getData()
        }
        onMounted (() => {
            document.getElementById('content').addEventListener('scroll', onScroll)
            getData()
        })
        onUnmounted(() => {
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
        const getData = (e) => {
            axios.get('/loggers', {
                params: {
                    label: label.value,
                    date: date.value,
                    filter: filter.value,
                    page: e
                }
            })
            .then(res => {
                isLoading.value = false
                isLoader.value = false
                const data = res.data
                if(data.length > 0) {
                    isEnd.value = true
                } else {
                    isEnd.value = false
                }
                for (let i = 0; i < data.length; i++) {
                    const el = data[i];
                    loggers.value.push(el)
                }
            })
        }
        const downloadData = () => {
            isDownload.value = true
            axios.get('/loggers/download', {
                params: {
                    label: label.value,
                    date: date.value,
                    filter: filter.value,
                },
                responseType: 'blob'
            })
            .then(response => {
                isDownload.value = false
                const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'laporan.xlsx');
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
            loggers,
            filter,
            label,
            showButton,
            isLoading,
            isLoader,
            isDownload,
            downloadData,
            onButtonTotop,
            onSelect,
            onFilter,
            convDate,
            convTime
        }
    }
}
</script>