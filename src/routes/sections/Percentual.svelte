<script>
	// @ts-nocheck

	import { Chart } from 'svelte-echarts';
	import { acharporcentagens } from './scripts/AcharPorcentagens';
	import { MESO } from './scripts/CONSTANTS/MESO';
	import { MICRO } from './scripts/CONSTANTS/MICRO';

	/**
	 * @type {string}
	 */
	export let municipio;

	let dados = [0, 0];
	let options;
	$: options = {
		title: {
			text: municipio + ' em relação a ' + MESO.get(MICRO.get(municipio)),
			left: 'center',
			textStyle: {
				fontSize: 'auto'
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		xAxis: {
			type: 'category',
			data: ['% participação mapas', '% populacao'],
			axisLabel: {
				interval: 0
			}
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [
					{
						value: dados[0].toFixed(2),
						itemStyle: {
							color: '#a90000'
						}
					},
					dados[1].toFixed(2)
				],
				type: 'bar'
			}
		]
	};

	$: acharporcentagens(municipio).then((Response) => {
		dados = Response;
	});
</script>

<div class="container">
	<Chart {options} />
</div>

<style>
	@media only screen and (max-width: 768px) {
		.container {
			width: 95%;
			height: 400px;
			background-color: white;
			border-radius: 15px;
			margin-left: 2.5%;
			margin-top: 5px;
		}
	}

	@media only screen and (min-width: 768px) {
		.container {
			width: 48%;
			height: 250px;
			background-color: white;
			border-radius: 15px;
			margin-left: 1%;
			margin-right: 1%;
			margin-top: 5px;
		}
	}
	@media only screen and (min-width: 1200px) {
		.container {
			margin-top: 15px;
			width: 100%;
			height: 450px;
			padding-top: 15px;
			background-color: white;
			border-radius: 15px;
			margin-left: 5px;
			margin-right: 5px;
		}
	}
</style>
