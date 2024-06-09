<template>
    <div class="m-5">
        <div  class="bg-white rounded-t border grid grid-cols-3 divide-x">
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5" style="font-size: 11px">
                        <div class="text-red-500">MAX : {{threshold.max_debit_1}}</div>
                        <div class="text-blue-500">MIN : {{threshold.min_debit_1}} </div>
                    </div>
                    <div class="font-bold mb-1">DEBIT</div>
                </div>
                <div class="relative h-36 w-full">
                    <canvas id="myDebit"></canvas>
                </div>
                <div class="text-cyan-500">
                    <div class="flex items-center justify-between">
                        <div class="font-semibold">JALUR 1</div>
                        <div v-if="sensor" class="text-right text-xl font-semibold">{{parseFloat(sensor.debit_1).toFixed(2)}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b pb-1">
                        <div>Rata-rata</div>
                        <div>{{avg.avg_debit_1 || 0.00}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Puncak</div>
                        <div>{{avg.max_debit_1 || 0.00}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Akumulasi</div>
                        <div>{{totalDebit1}}</div>
                    </div>
                </div>
                <div class="text-purple-500">
                    <div class="flex items-center justify-between">
                        <div class="font-semibold">JALUR 2</div>
                        <div v-if="sensor" class="text-right text-xl font-semibold">{{parseFloat(sensor.debit_2).toFixed(2)}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b pb-1">
                        <div>Rata-rata</div>
                        <div>{{avg.avg_debit_2 || 0.00}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Puncak</div>
                        <div>{{avg.max_debit_2 || 0.00}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Akumulasi</div>
                        <div>{{totalDebit2}}</div>
                    </div>
                </div>
            </div>

            <!-- COD -->
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5" style="font-size: 11px">
                        <div class="text-red-500">MAX : {{threshold.max_cod_4}}</div>
                        <div class="text-blue-500">MIN : {{threshold.min_cod_4}}</div>
                    </div>
                    <div class="font-bold mb-1">COD</div>
                </div>
                <div class="relative h-36 w-full">
                    <canvas id="myCod"></canvas>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #f97316">
                        COD J1
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #f97316">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_cod_j1 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_cod_j1 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #f97316">
                        {{parseFloat(sensor.cod_J1).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #ec4899">
                        COD J2
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #ec4899">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_cod_j2 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.avg_cod_j2 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #ec4899">
                        {{parseFloat(sensor.cod_J2).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #84cc16">
                        COD 2B
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #84cc16">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_cod_2 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_cod_2 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #84cc16">
                        {{parseFloat(sensor.cod_2).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #06b6d4">
                        COD 1C
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #06b6d4">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_cod_3 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_cod_3 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #06b6d4">
                        {{parseFloat(sensor.cod_3).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #8b5cf6">
                        COD 2C
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #8b5cf6">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_cod_4 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_cod_4 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #8b5cf6">
                        {{parseFloat(sensor.cod_4).toFixed(2)}}
                    </div>
                </div>
            </div>
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5" style="font-size: 11px">
                        <div class="text-red-500">MAX : {{threshold.max_do_4}}</div>
                        <div class="text-blue-500">MIN : {{threshold.min_do_4}}</div>
                    </div>
                    <div class="font-bold mb-1">DO</div>
                </div>
                <div class="relative h-36 w-full">
                    <canvas id="myDo"></canvas>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #f97316">
                        DO 1B
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #f97316">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_do_1 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_do_1 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #f97316">
                        {{parseFloat(sensor.do_1).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #84cc16">
                        DO 2B
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #84cc16">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_do_2 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_do_2 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #84cc16">
                        {{parseFloat(sensor.do_2).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #06b6d4">
                        DO 1C
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #06b6d4">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_do_3 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_do_3 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #06b6d4">
                        {{parseFloat(sensor.do_3).toFixed(2)}}
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-5 border-b py-1">
                    <div class="col-span-1 font-semibold flex items-center" style="color: #8b5cf6">
                        DO 2C
                    </div>
                    <div class="col-span-2 grid grid-cols-2 text-xs text-right" style="color: #8b5cf6">
                        <div>
                            <div>Rata-rata</div>
                            <div>{{avg.avg_do_4 || 0.00}}</div>
                        </div>
                        <div>
                            <div>Puncak</div>
                            <div>{{avg.max_do_4 || 0.00}}</div>
                        </div>
                    </div>
                    <div v-if="sensor" class="text-xl font-semibold text-right" style="color: #8b5cf6">
                        {{parseFloat(sensor.do_4).toFixed(2)}}
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-b border-t-0 border grid grid-cols-3 divide-x">
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5" style="font-size: 11px">
                        <div class="text-red-500">MAX : {{threshold.max_ph_1}}</div>
                        <div class="text-blue-500">MIN : {{threshold.min_ph_1}}</div>
                    </div>
                    <div class="font-bold mb-1">pH</div>
                </div>
                <div class="relative h-36 w-full">
                    <canvas id="myPh"></canvas>
                </div>
                <div class="grid grid-cols-2 gap-10">
                    <div class="text-green-500">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold">pH</div>
                            <div v-if="sensor" class="text-right text-xl font-semibold">{{parseFloat(sensor.ph_1).toFixed(2)}}</div>
                        </div>
                        <div class="flex text-xs items-center justify-between border-b py-1">
                            <div>Rata-rata</div>
                            <div>{{avg.avg_ph_1 || 0.00}}</div>
                        </div>
                        <div class="flex text-xs items-center justify-between border-b py-1">
                            <div>Puncak</div>
                            <div>{{avg.max_ph_1 || 0.00}}</div>
                        </div>
                    </div> 
                    <div class="text-red-500">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold">Temperatur</div>
                            <div v-if="sensor" class="text-right text-xl font-semibold">{{parseFloat(sensor.temp_1).toFixed(2)}}</div>
                        </div>
                        <div class="flex text-xs items-center justify-between border-b py-1">
                            <div>Rata-rata</div>
                            <div>{{avg.avg_temp_1 || 0.00}}</div>
                        </div>
                        <div class="flex text-xs items-center justify-between border-b py-1">
                            <div>Puncak</div>
                            <div>{{avg.max_temp_1 || 0.00}}</div>
                        </div>
                    </div> 

                </div>
            </div>
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5" style="font-size: 11px">
                        <div class="text-red-500">MAX : {{threshold.max_nh3n_1}}</div>
                        <div class="text-blue-500">MIN : {{threshold.min_nh3n_1}}</div>
                    </div>
                    <div class="font-bold mb-1">NH3N</div>
                </div>
                <div class="relative h-36 w-full">
                    <canvas id="myNh3n"></canvas>
                </div>
                <div class="text-purple-500">
                    <div class="flex items-center justify-between">
                        <div class="font-semibold">JALUR 1</div>
                        <div v-if="sensor" class="text-right text-xl font-semibold">{{parseFloat(sensor.nh3n_1).toFixed(2)}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Rata-rata</div>
                        <div>{{avg.avg_nh3n_1 || 0.00}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Puncak</div>
                        <div>{{avg.max_nh3n_1 || 0.00}}</div>
                    </div>
                </div> 
            </div>
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-5" style="font-size: 11px">
                        <div class="text-red-500">MAX : {{threshold.max_tss_1}}</div>
                        <div class="text-blue-500">MIN : {{threshold.min_tss_1}}</div>
                    </div>
                    <div class="font-bold mb-1">TSS</div>
                </div>
                <div class="relative h-36 w-full">
                    <canvas id="myTss"></canvas>
                </div>
                <div class="text-blue-500">
                    <div class="flex items-center justify-between">
                        <div class="font-semibold">JALUR 1</div>
                        <div v-if="sensor" class="text-right text-xl font-semibold">{{parseFloat(sensor.tss_1).toFixed(2)}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Rata-rata</div>
                        <div>{{avg.avg_tss_1 || 0.00}}</div>
                    </div>
                    <div class="flex text-xs items-center justify-between border-b py-1">
                        <div>Puncak</div>
                        <div>{{avg.max_tss_1 || 0.00}}</div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import ChartJS from 'chart.js/auto'
import { computed, nextTick, onMounted, ref } from '@vue/runtime-core'
import {useDatabaseObject} from 'vuefire'
import {modbus} from '../db'
import axios from 'axios'
export default {
    setup () {
         const threshold = ref('')
        const sensorSource = computed(() => modbus)
        const sensor = useDatabaseObject(sensorSource)
        const hoizontalDottedLine = {
            id: 'hoizontalDottedLine',
            beforeDatasetsDraw(chart, args, options) {
                const { ctx, chartArea: { top, right, bottom, left, width, height}, scales: { x, y }} = chart
                ctx.save()

                ctx.lineWidth = 0.3
                ctx.strokeStyle = 'red'
                ctx.setLineDash([10,5])
                ctx.strokeRect(left, y.getPixelForValue(options.maxValue), width, 0)
               
                
                ctx.strokeStyle = 'gray'
                ctx.setLineDash([10,5])
                ctx.strokeRect(left, y.getPixelForValue(options.minValue), width, 0)
                ctx.restore()
            }
        }
        const tooltipLine = {
			id: 'tooltipLine',
			beforeDraw: chart => {
				if(chart.tooltip._active && chart.tooltip._active.length) {
					const ctx = chart.ctx
					ctx.save()
					const activePoint = chart.tooltip._active[0]
					ctx.beginPath()
					
					ctx.moveTo(activePoint.element.x, chart.chartArea.top)
					ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
					ctx.lineWidth = 0.5
					ctx.strokeStyle = 'gray'
					ctx.stroke()
					ctx.restore()
				}
			}
		}
        const interaction = {
            intersect: false,
			mode: 'index',
        }
        const scales = {
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false
                }
            },
            y: {
                grace: '1%',
                ticks: {
                    color: 'rgb(156,163,168)',
                    font: {
                        size: 10
                    }
                },
                grid: {
                    color: 'rgb(239,243,246)',
                    display: true
                }
            }
        }
        const timeData = []
        const debtiDataJ1 = []
        const debtiDataJ2 = []
        const codDataJ1 = []
        const codDataJ2 = []
        const codDataA1 = []
        const codDataA2 = []
        const codDataA3 = []
        const codDataA4 = []
        const codDataA5 = []
        const doDataA1 = []
        const doDataA2 = []
        const doDataA3 = []
        const doDataA4 = []
        const phData = []
        const tempData = []
        const nh3nData = []
        const tssData = []

        let myDebit, myCod, myDo, myPh, myNh3n, myTss
        onMounted(() => {
            const ctxDebit = document.getElementById('myDebit')
            myDebit =  new ChartJS(ctxDebit, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'DEBIT J1',
                            data: debtiDataJ1,
                            borderColor: 'rgb(5,182,212, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'DEBIT J2',
                            data: debtiDataJ2,
                            borderColor: 'rgb(74,13,167, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        hoizontalDottedLine: {
                            maxValue: 0,
                            minValue: 0
                        }
                    },
                    interaction: interaction,
                    scales: scales
                },
                plugins: [tooltipLine, hoizontalDottedLine]
            })
            // COD
            const ctxCod = document.getElementById('myCod')
            ctxCod.height = 120
            myCod =  new ChartJS(ctxCod, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'COD J1',
                            data: codDataJ1,
                            borderColor: 'rgb(248,115,21, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'COD J2',
                            data: codDataJ2,
                            borderColor: 'rgb(248,115,21, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'COD A2',
                            data: codDataA2,
                            borderColor: 'rgb(131,204,21, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'COD A3',
                            data: codDataA3,
                            borderColor: 'rgb(5,182,211, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'COD A4',
                            data: codDataA4,
                            borderColor: 'rgb(139,92,246, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        hoizontalDottedLine: {
                            maxValue: 0,
                            minValue: 0
                        }
                    },
                    interaction: interaction,
                    scales: scales
                },
                plugins: [tooltipLine, hoizontalDottedLine]
            })
            // DO
            const ctxDo = document.getElementById('myDo')
            myDo =  new ChartJS(ctxDo, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'DO A1',
                            data: doDataA1,
                            borderColor: 'rgb(248,115,21, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'DO A2',
                            data: doDataA2,
                            borderColor: 'rgb(131,204,21, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'DO A3',
                            data: doDataA3,
                            borderColor: 'rgb(5,182,211, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                        {
                            label: 'DO A4',
                            data: doDataA4,
                            borderColor: 'rgb(139,92,246, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        hoizontalDottedLine: {
                            maxValue: 0,
                            minValue: 0
                        }
                    },
                    interaction: interaction,
                    scales: scales
                },
                plugins: [tooltipLine, hoizontalDottedLine]
            })
            // // Ph
            const ctxPh = document.getElementById('myPh')
            myPh =  new ChartJS(ctxPh, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'pH',
                            data: phData,
                            borderColor: 'rgb(37,197,94, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        hoizontalDottedLine: {
                            maxValue: 0,
                            minValue: 0
                        }
                    },
                    interaction: interaction,
                    scales: scales
                },
                plugins: [tooltipLine, hoizontalDottedLine]
            })
            // // NH3N
            const ctxNh3n = document.getElementById('myNh3n')
            myNh3n =  new ChartJS(ctxNh3n, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'NH3N',
                            data: nh3nData,
                            borderColor: 'rgb(168,84,247, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        hoizontalDottedLine: {
                            maxValue: 0,
                            minValue: 0
                        }
                    },
                    interaction: interaction,
                    scales: scales
                },
                plugins: [tooltipLine, hoizontalDottedLine]
            })
            // // TSS
            const ctxTss = document.getElementById('myTss')
            myTss =  new ChartJS(ctxTss, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'TSS',
                            data: tssData,
                            borderColor: 'rgb(59,129,246, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        hoizontalDottedLine: {
                            maxValue: 0,
                            minValue: 0
                        }
                    },
                    interaction: interaction,
                    scales: scales
                },
                plugins: [tooltipLine, hoizontalDottedLine]
            })
            getData()
        })
        const avg = ref('')
        const totalDebit1 = ref(0)
        const totalDebit2 = ref(0)
        
        const getData = () => {
            axios.get('/')
            .then(async (res) => {
                avg.value = res.data.avg
                const loggers = res.data.loggers
                threshold.value = res.data.threshold
                totalDebit1.value = res.data.total_debit_1
                totalDebit2.value = res.data.total_debit_2
                for(let i = 0; i < loggers.length; i ++) {
                    const log = loggers[i]
                    timeData.push(log.insert_at)
                    debtiDataJ1.push(log.debit_1)
                    debtiDataJ2.push(log.debit_2)
                    codDataJ1.push(log.cod_j1)
                    codDataJ2.push(log.cod_j2)
                    codDataA1.push(log.cod_1)
                    codDataA2.push(log.cod_2)
                    codDataA3.push(log.cod_3)
                    codDataA4.push(log.cod_4)
                    codDataA5.push(log.cod_5)
                    doDataA1.push(log.do_1)
                    doDataA2.push(log.do_2)
                    doDataA3.push(log.do_3)
                    doDataA4.push(log.do_4)
                    phData.push(log.ph_1)
                    tempData.push(log.temp_1)
                    nh3nData.push(log.nh3n_1)
                    tssData.push(log.tss_1)
                }
                const data = res.data.threshold
                myPh.options.plugins.hoizontalDottedLine.minValue = data.min_ph_1
                myPh.options.plugins.hoizontalDottedLine.maxValue = data.max_ph_1
                myCod.options.plugins.hoizontalDottedLine.minValue = data.min_cod_1
                myCod.options.plugins.hoizontalDottedLine.maxValue = data.max_cod_1
                myDo.options.plugins.hoizontalDottedLine.minValue = data.min_do_1
                myDo.options.plugins.hoizontalDottedLine.maxValue = data.max_do_1
                myTss.options.plugins.hoizontalDottedLine.minValue = data.min_tss_1
                myTss.options.plugins.hoizontalDottedLine.maxValue = data.max_tss_1
                myNh3n.options.plugins.hoizontalDottedLine.minValue = data.min_nh3n_1
                myNh3n.options.plugins.hoizontalDottedLine.maxValue = data.max_nh3n_1
                myDebit.options.plugins.hoizontalDottedLine.minValue = data.min_debit_1
                myDebit.options.plugins.hoizontalDottedLine.maxValue = data.max_debit_1
                await nextTick()
                myDebit.update()
                myCod.update()
                myDo.update()
                myPh.update()
                myNh3n.update()
                myTss.update()
            })
        }

        return {
            sensor,
            avg,
            totalDebit1,
            totalDebit2,
            threshold
        }
    }    
}
</script>