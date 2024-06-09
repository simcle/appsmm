<template>
    <div>
        <transition name="modal" mode="out-in">
            <div v-show="show" class="fixed inset-0 z-50 overflow-y-auto">
                <div class="flex justify-center">
                    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
                    <transition name="slide" >
                        <div v-show="show" class="transform flex justify-center my-8 w-full">
                            <div class=" w-3/5 bg-white rounded">
                                <div class="px-5 py-3 flex items-center justify-between">
                                    <div class="font-semibold">PERINGATAN DINI</div>
                                    <button @click="onBatal" class="text-red-500"><i class="ph ph-x-square"></i></button>
                                </div>
                                <div class="grid grid-cols-2 gap-20 px-5 pb-5">
                                    <div>
                                        <legend class="font-semibold border-b mb-5">AMBANG BATAS MINIMAL</legend>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min pH
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_ph_1" name="min_ph" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min Temp
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric  v-model="form.min_temp_1" name="min_temp" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min COD 1B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_cod_1" name="min_cod_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min COD 2B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_cod_2" name="min_cod_2" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min COD 1C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_cod_3" name="mind_cod_3" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min COD 2C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_cod_4" name="min_cod_4" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min COD A5
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_cod_5" name="min_cod_5" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min DO 1B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_do_1" name="min_do_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min DO 2B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_do_2" name="min_do_2" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min D0 1C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_do_3" name="min_do_3" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min DO 2C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_do_4" name="min_do_4" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min TSS
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_tss_1" name="min_tss" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min NH3N
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_nh3n_1" name="min_nh3n" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min Debit J1
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_debit_1" name="min_debit_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Min Debit J2
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.min_debit_2" name="min_debit_2" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <legend class="font-semibold border-b mb-5">AMBANG BATAS MAKSIMAL</legend>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max pH
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_ph_1" name="max_ph" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max Temp
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_temp_1" name="max_temp" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max COD 1B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_cod_1" name="max_cod_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max COD 2B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_cod_2" name="max_cod_2" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max COD 1C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_cod_3" name="max_cod_3" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max COD 2C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_cod_4" name="max_cod_4" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max COD A5
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_cod_5" name="max_cod_5" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max DO 1B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_do_1" name="max_do_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max DO 2B
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_do_2" name="max_do_2" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max D0 1C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_do_3"  name="max_do_3" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max DO 2C
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_do_4" name="max_do_4" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max TSS
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_tss_1" name="max_tss" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max NH3N
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_nh3n_1" name="max_nh3n" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max Debit J1
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_debit_1" name="max_debit_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-3 items-center mb-2.5">
                                            <div class="col-span-1">
                                                Max Debit J2
                                            </div>
                                            <div class="col-span-2">
                                                <autonumeric v-model="form.max_debit_2" name="max_debit_1" class="h-7 w-full border-b text-right px-3 focus:outline-none focus:border-teal-500"></autonumeric>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right px-5 pb-5 space-x-2">
                                    <button @click="onBatal" class="h-9 px-5 border rounded bg-white hover:bg-gray-50">Batal</button>
                                    <button @click="onSimpan" class="h-9 px-5 border rounded bg-blue-500 text-blue-50 hover:bg-blue-600">Simpan</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Autonumeric from '../components/VueAutonumeric.vue'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
export default {
    props: ['show'],
    emits: ['close'],
    components: {Autonumeric},
    setup (props, {emit}) {
        const isLoding = ref(false)
        const form = ref({
            min_ph_1: 0.00,
            min_temp_1: 0.00,
            min_cod_1: 0.00,
            min_cod_2: 0.00,
            min_cod_3: 0.00,
            min_cod_4: 0.00,
            min_cod_5: 0.00,
            min_do_1: 0.00,
            min_do_2: 0.00,
            min_do_3: 0.00,
            min_do_4: 0.00,
            min_tss_1: 0.00,
            min_nh3n_1: 0.00,
            min_debit_1: 0.00,
            min_debit_2: 0.00,
            max_ph_1: 0.00,
            max_temp_1: 0.00,
            max_cod_1: 0.00,
            max_cod_2: 0.00,
            max_cod_3: 0.00,
            max_cod_4: 0.00,
            max_cod_5: 0.00,
            max_do_1: 0.00,
            max_do_2: 0.00,
            max_do_3: 0.00,
            max_do_4: 0.00,
            max_tss_1: 0.00,
            max_nh3n_1: 0.00,
            max_debit_1: 0.00,
            max_debit_2: 0.00
        })
        onMounted(() => {
            getData()
        })
        const getData = () => {
            axios.get('/thresholds')
            .then(res => {
                if(res.data) {
                    form.value = res.data
                }
            })
        }
        const onSimpan = () => {
            console.log(form.value)
            isLoding.value = true
            axios.post('/thresholds', form.value)
            .then(() => {
                isLoding.value = false
                emit('close')
            })
        }
        const onBatal = () => {
            emit('close')
            getData()
        }
        return {
            form,
            onBatal,
            onSimpan
        }
    }
}
</script>