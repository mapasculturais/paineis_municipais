<script>
	// @ts-nocheck

	import { Chart } from 'svelte-echarts';
	import { tratarDadosInteresse } from './scripts/PuxarDados';
	/**
	 * @type {string}
	 */
	export let municipio;

	/**
	 * @type {String[] | { name: String; value: string; }}
	 */
	let nomesAgentes = [];
	/**
	 * @type {String[] | { name: String; value: string; }}
	 */
	let valoresAgentes;
	/**
	 * @type {string | any[]}
	 */
	let restanteAgentes = [];

	/**
	 * @type {String[] | { name: String; value: string; }}
	 */
	let nomesLocais = [];
	/**
	 * @type {String[] | { name: String; value: string; }}
	 */
	let valoresLocais;
	/**
	 * @type {string | any[]}
	 */
	let restanteLocais = [];
	let verificar = municipio != 'ESTADO';

	let carregando;
	$: if (municipio != '') {
		carregando = [true, true];
	}
	$: tratarDadosInteresse(municipio, 'agent').then((Response) => {
		// @ts-ignore
		nomesAgentes = Response[0][0];
		// @ts-ignore
		valoresAgentes = Response[0][1];
		restanteAgentes = Response[1];
		carregando[0] = false;
	});
	$: tratarDadosInteresse(municipio, 'space').then((Response) => {
		// @ts-ignore
		nomesLocais = Response[0][0];
		// @ts-ignore
		valoresLocais = Response[0][1];
		restanteLocais = Response[1];
		carregando[1] = false;
	});
	let tamanhos = [12, 20];
	if (window.innerWidth <= 1200) {
		tamanhos = [16, 20];
	} else if (window.innerWidth <= 992) {
		tamanhos = [20, 12];
	}
	$: options = {
		title: {
			text: 'Áreas de destaques dos membros',
			left: 'center',
			textStyle: {
				fontSize: tamanhos[0],
				fontWeight: 'bolder'
			}
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			show: verificar,
			top: '30px',
			textStyle: {
				fontSize: tamanhos[2]
			}
		},
		yAxis: {
			type: 'category',
			data: nomesAgentes,
			inverse: true,
			fontSize: tamanhos[1]
		},
		xAxis: {
			type: 'value',
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			}
		},
		series: valoresAgentes,
		grid: {
			containLabel: true
		}
	};

	$: optionEspaco = {
		title: {
			text: 'Áreas de destaques dos Espaços',
			left: 'center',
			textStyle: {
				fontSize: tamanhos[0],
				fontWeight: 'bolder'
			}
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			show: verificar,
			top: '30px',
			textStyle: {
				fontSize: tamanhos[2]
			}
		},
		yAxis: {
			type: 'category',
			data: nomesLocais,
			inverse: true,
			fontSize: tamanhos[1]
		},
		xAxis: {
			type: 'value',
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			}
		},
		series: valoresLocais,
		grid: {
			containLabel: true
		}
	};
	let torelance = 12;
</script>

<div class="descricao">
	<h1>Perfil e vocação do município</h1>
</div>
<div class="segurarAmbos">
	{#if nomesAgentes.length > 0}
		<div class="container">
			{#if restanteAgentes.length > 0}
				<div class="chartContainer">
					<Chart {options} />
				</div>
				<div>
					<h2>Demais Áreas de Atuação</h2>
					<ul>
						{#each restanteAgentes as atual, i}
							{#if i < torelance}
								<li>{atual.name} &emsp &emsp<span>({atual.value}%)</span></li>
							{/if}
						{/each}
					</ul>
					<p>...</p>
				</div>
			{:else}
				<div class="reserva">
					<Chart {options} />
				</div>
			{/if}
		</div>
	{:else}
		<div class="sem-resultado">
			{#if municipio == 'ESTADO' || carregando[0]}
				<p>calculando</p>
			{:else}
				<p>Ainda não existem Agentes com áreas de atual cadastrados em {municipio}</p>
			{/if}
		</div>
	{/if}
	{#if nomesLocais.length > 0}
		<div class="container" id="segundo">
			{#if restanteLocais.length > 0}
				<div class="chartContainer">
					<Chart options={optionEspaco} />
				</div>
				<div>
					<h2>Demais Áreas de Atuação</h2>
					<ul>
						{#each restanteLocais as atual, i}
							{#if i < torelance}
								<li>{atual.name} &emsp &emsp<span>({atual.value}%)</span></li>
							{/if}
						{/each}
					</ul>
					<p>...</p>
				</div>
			{:else}
				<div class="reserva">
					<Chart options={optionEspaco} />
				</div>
			{/if}
		</div>
	{:else}
		<div class="sem-resultado">
			{#if municipio == 'ESTADO' || carregando[1]}
				<p>calculando</p>
			{:else}
				<p>Ainda não existem Espaços com áreas de atual cadastrados em {municipio}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.descricao {
		text-align: center;
	}

	ul {
		padding: 0px;
		margin-bottom: 0px;
	}
	li span {
		float: right;
	}
	.container p {
		text-align: center;
		margin: 0px;
		font-size: 24px;
		font-weight: bold;
	}
	li {
		margin-bottom: 3px;
		text-align: left;
		list-style-type: none;
	}

	@media only screen and (max-width: 768px) {
		.sem-resultado {
			display: none;
		}
		h2 {
			text-align: center;
			font-size: 20px;
			margin: 0px;
			padding-bottom: 10px;
		}
		li {
			padding-left: 2.5%;
			padding-right: 2.5%;
			font-size: 16px;
		}

		.container {
			padding-top: 5px;
			background-color: white;
			margin-left: 2.5%;
			margin-bottom: 5px;
			border-radius: 10px;
			width: 95%;
			height: auto;
			padding-bottom: 10px;
		}
		.chartContainer {
			height: 320px;
			width: 100%;
		}
		.reserva {
			width: 95%;
			height: 400px;
		}
	}

	@media only screen and (min-width: 768px) {
		h2 {
			text-align: center;
			font-size: 20px;
			margin: 0px;
			padding-bottom: 10px;
		}
		li {
			padding-left: 2.5%;
			padding-right: 2.5%;
			font-size: 18px;
		}
		.segurarAmbos {
			display: flex;
		}
		.container {
			padding-top: 5px;
			background-color: white;
			margin-left: 1%;
			margin-bottom: 5px;
			border-radius: 10px;
			width: 48%;
			height: 770px;
			padding-bottom: 10px;
		}
		.sem-resultado {
			padding-top: 5px;
			background-color: white;
			margin-left: 1%;
			margin-bottom: 5px;
			border-radius: 10px;
			width: 48%;
			height: 770px;
			padding-bottom: 10px;
		}
		.sem-resultado p {
			margin-top: 40vh;
			font-size: 30px;
			font-weight: bolder;
		}
		.chartContainer {
			height: 320px;
			width: 100%;
		}
		.reserva {
			width: 95%;
			height: 770px;
		}
		@media only screen and (min-width: 1200px) {
			h2 {
				text-align: center;
				font-size: 20px;
				margin: 0px;
				padding-bottom: 10px;
			}

			.reserva {
				height: 100%;
				width: 100%;
			}

			li {
				padding-left: 0px;
				padding-right: 0px;
				font-size: 16px;
			}

			.chartContainer {
				padding-top: 0.5%;
				height: 100%;
				width: 65%;
			}
			.segurarAmbos {
				display: flex;
				width: 98%;
				margin-left: 15px;
				margin-right: 15px;
				justify-content: space-between;
			}
			.container {
				display: flex;
				margin-left: 0px;
				justify-content: space-evenly;
				background-color: white;
				margin-bottom: 20px;
				padding-left: 0px;
				padding-bottom: 0px;
				border-radius: 10px;
				width: 49.5%;
				height: 500px;
			}
			.sem-resultado {
				height: 505px;
				width: 49.5%;
				padding: 0px;
			}
			.sem-resultado p {
				margin-top: 20vh;
				margin-left: 5px;
			}
		}
	}
</style>
