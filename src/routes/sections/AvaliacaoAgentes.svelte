<script>
	// @ts-nocheck

	import { Chart } from 'svelte-echarts';
	import { avaliarAgentesMuni } from './scripts/PuxarDados';
	import BarraDeProgresso from './BarraDeProgresso.svelte';

	/**
	 * @type {string}
	 */
	export let municipio;
	let ativo = false;
	let dadosPercent;
	let total;
	let dados = {
		agentesOuro: 0,
		agentesPrata: 0,
		agentesBronze: 0
	};
	$: if (municipio != '') {
		ativo = false;
	}
	$: avaliarAgentesMuni(municipio).then((Response) => {
		dados = Response[0];
		ativo = true;
		dadosPercent = Response[1];
		total = Response[2];
	});

	$: options = {
		color: ['#ffd700', '#c0c0c0', '#cd7f32'],
		title: {
			text: 'Tipos de Agente',
			left: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {c} ({d}%)'
		},
		label: {
			formatter: '{b|{b}：}{c}  {per|{d}%}  ',
			backgroundColor: '#F6F8FC',
			borderColor: '#8C8D8E',
			borderWidth: 1,
			borderRadius: 4,
			rich: {
				b: {
					color: '#4C5058',
					fontSize: 14,
					fontWeight: 'bold',
					lineHeight: 33
				},
				per: {
					color: '#fff',
					backgroundColor: '#4C5058',
					padding: [3, 4],
					borderRadius: 4
				}
			}
		},
		series: [
			{
				type: 'pie',
				radius: '60%',
				data: [
					{ value: dados.agentesOuro, name: 'Agentes Ouro' },
					{ value: dados.agentesPrata, name: 'Agentes Prata' },
					{ value: dados.agentesBronze, name: 'Agentes Bronze' }
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
</script>

<div class="descricao">
	<h1>Analise do Nível de Agente</h1>
</div>
<div class="container">
	{#if ativo}
		<div class="chartContainer">
			<Chart {options} />
		</div>
		<div class="textoPercentual">
			<div class="percentual">
				<BarraDeProgresso dados={dadosPercent.midias} {total} />
				<BarraDeProgresso dados={dadosPercent.descricao} {total} />
				<BarraDeProgresso dados={dadosPercent.contato} {total} />
				<BarraDeProgresso dados={dadosPercent.atulizado} {total} />
			</div>
			<div>
				<p>
					o municipio {municipio} possui
					<span style="color:#ffd700; font-weight: bold;">{dados.agentesOuro}</span>
					agentes classificados como ouro,
					<span style="color: #c0c0c0;font-weight: bold;">{dados.agentesPrata}</span>
					agentes classificados como prata e
					<span style="color: #cd7f32;font-weight: bold">{dados.agentesBronze}</span> agentes classificados
					como bronze, a análise acerca do nível do usuário leva em consideração as seguintes informações:
				</p>
				<ul>
					<li>Presença de mídias dentro do perfil</li>
					<li>Presença de descrição longa e curta</li>
					<li>Presença de formas de contato</li>
					<li>Manutenção de uma conta atualizada (dentro de 1 ano)</li>
				</ul>
			</div>
		</div>
	{:else}
		<p>Calculando</p>
	{/if}
</div>

<style>
	.textoPercentual {
		display: flex;
	}
	.descricao {
		text-align: center;
	}

	.container {
		padding-top: 5px;
		background-color: white;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 5px;
		border-radius: 10px;
		width: auto;
		height: auto;
		padding-bottom: 10px;
	}
	.container p {
		margin: 3%;
	}
	@media only screen and (max-width: 768px) {
		.chartContainer {
			height: 320px;
			width: 100%;
		}
		.textoPercentual {
			display: block;
		}
	}

	@media only screen and (min-width: 768px) {
		.chartContainer {
			height: 320px;
			width: 100%;
		}
		.container p {
			font-size: 20px;
		}
	}
	@media only screen and (min-width: 1200px) {
		.chartContainer {
			padding-top: 0.5%;
			height: 400px;
			width: 600px;
		}
		.container {
			display: flex;
			align-items: center;
		}
		.container p {
			font-size: 25px;
		}
	}
</style>
