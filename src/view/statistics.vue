<template>
    <div class="m-5">
        <div class="text-center mb-5">
            <button @click="filter = '24 Jam'" :class="{'!bg-green-500 border-green-500 text-green-50': filter == '24 Jam'}" class="border bg-white h-9 px-5 rounded-l">24 Jam</button>
            <button @click="filter = '7 Hari'" :class="{'!bg-green-500 border-green-500 text-green-50': filter == '7 Hari'}" class="border bg-white h-9 px-5 border-l-0">7 Hari</button>
            <button @click="filter = '30 Hari'" :class="{'!bg-green-500 border-green-500 text-green-50': filter == '30 Hari'}" class="border bg-white h-9 px-5 border-l-0">30 Hari</button>
            <button @click="filter = '90 Hari'" :class="{'!bg-green-500 border-green-500 text-green-50': filter == '90 Hari'}" class="border bg-white h-9 px-5 border-l-0">90 Hari</button>
            <button @click="filter = '1 Tahun'" :class="{'!bg-green-500 border-green-500 text-green-50': filter == '1 Tahun'}" class="border bg-white h-9 px-5 border-l-0 rounded-r">1 Tahun</button>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">PH</div>
            <canvas id="myPH"></canvas>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">Temperatur</div>
            <canvas id="myTemp"></canvas>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">COD</div>
            <canvas id="myCod"></canvas>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">DO</div>
            <canvas id="myDo"></canvas>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">TSS</div>
            <canvas id="myTss"></canvas>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">NH3N</div>
            <canvas id="myNh3n"></canvas>
        </div>
        <div class="p-5 bg-white border rounded min-h-96 w-full mb-5">
            <div class="font-semibold">DEBIT</div>
            <canvas id="myDebit"></canvas>
        </div>
    </div>
</template>

<script>
import ChartJS from 'chart.js/auto'
import { nextTick, onMounted, ref, watch } from '@vue/runtime-core'
import axios from 'axios'
export default {
    setup () {
        const filter = ref('24 Jam')
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
        const timeData = []
        const phData = []
        const tempData = []
        const codDataJ1 = []
        const codDataJ2 = []
        const codData2 = []
        const codData3 = []
        const codData4 = []
        const doData1 = []
        const doData2 = []
        const doData3 = []
        const doData4 = []
        const tssData = []
        const nh3nData = []
        const debtiDataJ1 = []
        const debtiDataJ2 = []
        let myPH, myTemp, myDebit, myCod, myDo, myTss, myNh3n
        onMounted(() => {
            const root = document.getElementById('content')
            root.scrollTo({top: 0, behavior: 'smooth'})
            const ctxPh = document.getElementById('myPH')
            ctxPh.height = 90
            myPH = new ChartJS(ctxPh, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: phData,
                            label: 'pH',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        }
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })

            const ctxTemp = document.getElementById('myTemp')
            ctxTemp.height = 90
            myTemp = new ChartJS(ctxTemp, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: tempData,
                            label: 'Temperature',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        }
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })

            const ctxCod = document.getElementById('myCod')
            ctxCod.height = 90
            myCod = new ChartJS(ctxCod, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: codDataJ1,
                            label: 'COD J1',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#f97316',
                            spanGaps: true
                        },
                        {
                            data: codDataJ2,
                            label: 'COD J2',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#f97316',
                            spanGaps: true
                        },
                        {
                            data: codData2,
                            label: 'COD 2B',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#84cc16',
                            spanGaps: true
                        },
                        {
                            data: codData3,
                            label: 'COD 1C',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#06b6d4',
                            spanGaps: true
                        },
                        {
                            data: codData4,
                            label: 'COD 2C',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#8b5cf6',
                            spanGaps: true
                        },
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })

            const ctxDo = document.getElementById('myDo')
            ctxDo.height = 90
            myDo = new ChartJS(ctxDo, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: doData1,
                            label: 'DO 1B',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#f97316',
                            spanGaps: true
                        },
                        {
                            data: doData2,
                            label: 'DO 2B',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#84cc16',
                            spanGaps: true
                        },
                        {
                            data: doData3,
                            label: 'DO 1C',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#06b6d4',
                            spanGaps: true
                        },
                        {
                            data: doData4,
                            label: 'DO 2C',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#8b5cf6',
                            spanGaps: true
                        },
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })

            const ctxTss = document.getElementById('myTss')
            ctxTss.height = 90
            myTss = new ChartJS(ctxTss, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: tssData,
                            label: 'TSS',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })
            const ctxNh3n = document.getElementById('myNh3n')
            ctxNh3n.height = 90
            myNh3n = new ChartJS(ctxNh3n, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: nh3nData,
                            label: 'NH3N',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            spanGaps: true
                        },
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })
            // 
            const ctxDebit = document.getElementById('myDebit')
            ctxDebit.height = 90
            myDebit = new ChartJS(ctxDebit, {
                type: 'line',
                responsive: false,
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            data: debtiDataJ1,
                            label: 'Debit J1',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#06b6d4',
                            spanGaps: true
                        },
                        {
                            data: debtiDataJ2,
                            label: 'Debit J2',
                            borderWidth: '1.5',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                            borderColor: '#8b5cf6',
                            spanGaps: true
                        }
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        hoizontalDottedLine: {
                            minValue: 0,
                            maxValue: 0
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: true,
                                color: 'rgb(156,163,168)',
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grace: '5%',
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
                }
            })
            getThreshold()
            getData()
        })
        watch(filter, () => {
            timeData.splice(0, timeData.length)
            phData.splice(0, phData.length)
            tempData.splice(0, tempData.length)
            codDataJ1.splice(0, codDataJ1.length)
            codDataJ2.splice(0, codDataJ2.length)
            codData2.splice(0, codData2.length)
            codData3.splice(0, codData3.length)
            codData4.splice(0, codData4.length)
            doData1.splice(0, doData1.length)
            doData2.splice(0, doData2.length)
            doData3.splice(0, doData3.length)
            doData4.splice(0, doData4.length)
            tssData.splice(0, tssData.length)
            nh3nData.splice(0, nh3nData.length)
            debtiDataJ1.splice(0, debtiDataJ1.length)
            debtiDataJ2.splice(0, debtiDataJ2.length)
            myPH.update()
            myTemp.update()
            myCod.update()
            myDo.update()
            myTss.update()
            myNh3n.update()
            myDebit.update()
            getData()
        })
        const getThreshold = () => {
            axios.get('/thresholds')
            .then(async (res) => {
                const data = res.data
                myPH.options.plugins.hoizontalDottedLine.minValue = data.min_ph_1
                myPH.options.plugins.hoizontalDottedLine.maxValue = data.max_ph_1
                myTemp.options.plugins.hoizontalDottedLine.minValue = data.min_temp_1
                myTemp.options.plugins.hoizontalDottedLine.maxValue = data.max_temp_1
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
                myPH.update()
                myTemp.update()
                myCod.update()
                myDo.update()
                myTss.update()
                myNh3n.update()
                myDebit.update()
            })
        }
        const getData = () => {
            axios.get('/statistics', {
                params: {
                    filter: filter.value
                }
            })
            .then(async (res) => {
                const data = res.data
                for(let i = 0; i < data.length; i++) {
                    const el = data[i]
                    timeData.push(el.datetime)
                    phData.push(el.ph_1)
                    tempData.push(el.temp_1)
                    codDataJ1.push(el.cod_J1)
                    codDataJ2.push(el.cod_J2)
                    codData2.push(el.cod_2)
                    codData3.push(el.cod_3)
                    codData4.push(el.cod_4)
                    doData1.push(el.do_1)
                    doData2.push(el.do_2)
                    doData3.push(el.do_3)
                    doData4.push(el.do_4)
                    tssData.push(el.tss_1)
                    nh3nData.push(el.nh3n_1)
                    debtiDataJ1.push(el.debit_1)
                    debtiDataJ2.push(el.debit_2)
                }
                await nextTick()
                myPH.update()
                myTemp.update()
                myCod.update()
                myDo.update()
                myTss.update()
                myNh3n.update()
                myDebit.update()
            })
        }

        return {
            filter,
        }
    }
}
</script>