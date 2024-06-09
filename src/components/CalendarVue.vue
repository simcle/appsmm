<template>
    <div ref="root" class="relative inline-block">
        <button @click="show = true" class="rounded overflow-hidden flex items-center border h-9 min-w-64 hover:border-teal-500">
            <div class="flex items-center justify-center bg-gray-100 h-9 w-9 text-gray-500">
                <i class="ph ph-calendar"></i>
            </div>
            <div class="px-3">
                {{label}} <span v-if="date">: {{date}}</span>
            </div>
        </button>
        <div v-show="show" class="absolute w-96 bg-white border mt-0.5 rounded overflow-hidden shadow-lg z-20">
            <ul class="relative bg-orange-500 cursor-pointer py-1 text-orange-50">
                <li @click="onSelect('Hari ini')" :class="{'text-orange-500 bg-white': active == 'Hari ini'}" class="px-3 py-2.5 hover:bg-white hover:text-orange-500">Hari ini</li>
                <li @click="onSelect('Kemarin')" :class="{'text-orange-500 bg-white': active == 'Kemarin'}" class="px-3 py-2.5 hover:bg-white hover:text-orange-500">Kemarin</li>
                <li @click="onSelect('7 Hari terakhir')" :class="{'text-orange-500 bg-white': active == '7 Hari terakhir'}" class="px-3 py-2.5 hover:bg-white hover:text-orange-500">7 Hari terkhir</li>
                <li @click="onSelect('30 Hari terakhir')" :class="{'text-orange-500 bg-white': active == '30 Hari terakhir'}" class="px-3 py-2.5 hover:bg-white hover:text-orange-500">30 Hari terkhir</li>
                <li @click="onSelect('Bulan ini')" :class="{'text-orange-500 bg-white': active == 'Bulan ini'}" class="px-3 py-2.5 hover:bg-white hover:text-orange-500">Bulan ini</li>
                <li class="border-b my-1.5 w-32 border-orange-600"></li>
                <li @click="onSelect('Per hari')" :class="{'text-orange-500 bg-white': active == 'Per hari'}" class="px-3 py-2.5 hover:bg-white hover:text-orange-500 w-32 flex items-center justify-between pr-1.5">
                    <div>Per hari</div>
                    <div class="flex items-center"><i class="ph ph-caret-right" style="font-size:14px"></i></div>
                </li>
                <li @click="onSelect('Per bulan')" :class="{'text-orange-500 bg-white': active == 'Per bulan'}" class="px-3 py-2.5 hover:bg-white w-32 hover:text-orange-500 flex items-center justify-between pr-1.5">
                    <div>Per bulan</div>
                    <div class="flex items-center"><i class="ph ph-caret-right" style="font-size:14px"></i></div>
                </li>
                <li @click="onSelect('Per tahun')" :class="{'text-orange-500 bg-white': active == 'Per tahun'}" class="px-3 py-2.5 hover:bg-white w-32 hover:text-orange-500 flex items-center justify-between pr-1.5">
                    <div>Per tahun</div>
                    <div class="flex items-center"><i class="ph ph-caret-right" style="font-size:14px"></i></div>
                </li>
                <div class="h-full left-32 w-64 bg-white absolute top-0 text-red-500">
                    <div v-show="active == 'Per hari'">
                        <div class="per-day"></div>
                    </div>
                    <div v-show="active == 'Per bulan'">
                        <div class="per-month"></div>
                    </div>
                    <div v-show="active == 'Per tahun'">
                        <div class="per-year"></div>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import $ from 'jquery'
import { onMounted, onUnmounted, watch } from '@vue/runtime-core';
export default {
    emits: ['selected'],
    setup (props, {emit}) {
        const root = ref(null)
        const show = ref(false)
        const date = ref(null)
        const label = ref('Hari ini')
        const active = ref('Hari ini')
        onMounted (() => {
            $('.per-day').datepicker({
                view: 'days',
                minView: 'days',
                maxDate: new Date(),
                dateFormat: 'dd/mm/yyyy',
                clearButton: false,
                onSelect: function () {
                    date.value = $('.per-day').val()
                    label.value ='Per hari'
                    emit('selected', label.value, date.value)
                },
            })
            $('.per-month').datepicker({
                view: 'months',
                minView: 'months',
                maxDate: new Date(),
                dateFormat: 'mm-yyyy',
                onSelect: function () {
                    date.value = $('.per-month').val()
                    label.value ='Per bulan'
                    emit('selected', label.value, date.value)
                },
            })
            $('.per-year').datepicker({
                view: 'years',
                minView: 'years',
                maxDate: new Date(),
                dateFormat: 'yyyy',
                onSelect: function () {
                    date.value = $('.per-year').val()
                    label.value ='Per tahun'
                    emit('selected', label.value, date.value)
                },
            })
            window.addEventListener('click', closeList)
        })
        onUnmounted(() => {
            window.removeEventListener('click', closeList)
        })
        const onSelect = (e) => {
            if(e == 'Per hari' || e == 'Per bulan' || e == 'Per tahun') {
                active.value = e
            }  else {
                date.value = ''
                label.value = e
                active.value = e
                show.value = false
                emit('selected', label.value, date.value)
            }
        }
        const closeList = ($event) => {
            if(!$event || !root.value.contains($event.target)) {
                show.value = false
            }
        }
       
        return {
            root,
            show,
            date,
            label,
            active,
            onSelect
        }
    }
}
</script>