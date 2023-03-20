<script>
	import Comparativo from './Comparativo.svelte';
	import Percentual from './Percentual.svelte';
	import { acharSemelhantes } from './scripts/AcharSemelhantes';
	import {numeroDadosMuni } from './scripts/PuxarDados';
	import AreaDeAtuacao from './AreaDeAtuacao.svelte';
	import AvaliacaoAgentes from './AvaliacaoAgentes.svelte';
	/**
	 * @type {string}
	 */
	export let municipio;

	/**
	 * @type {string []}
	 */
	let semelhantes;
	/**
	 * @type {number[]}
	 */
	let dadosMuni = [];
	$: numeroDadosMuni(municipio).then((response) => {
		dadosMuni = response;
	});

	$: semelhantes = acharSemelhantes(municipio);
</script>

<div style="display: block;">
	<div class="descricao">
		<h1>Dimencionamento do campo cultural</h1>
		<p>
			Abaixo você encontra os principais números do município: quantidade de Agentes Culturais
			registrados e espaços cadastrados; além de um comparativo com municípios com população e PIB
			semelhantes. No gráfico da esquerda é feito uma comparação entre a participação do município
			no Mapa Cultural do Ceará e a participação do município na sua macro região.
		</p>
	</div>
	<div class="organize">
		<div class="organize2">
			<div class="organize-info">
				<div class="info">
					<h1>número de agentes individuais</h1>
					<h3>{dadosMuni[0]}</h3>
				</div>
				<div class="info">
					<h1>número de agentes coletivos</h1>
					<h3>{dadosMuni[1]}</h3>
				</div>
				<div class="info">
					<h1>número de espaços</h1>
					<h3>{dadosMuni[2]}</h3>
				</div>
			</div>
			<Comparativo {semelhantes} {municipio} dadosMunicipio={dadosMuni} />
		</div>
		<div class="percentualESimilar">
			<Percentual {municipio} />
			<div class="similar">
				<h2>
					municípios semelhantes para comparação <span
						title="aproximação feita com tolerância de {+semelhantes[semelhantes.length - 1] *
							100}%">*</span
					>
				</h2>
				<ul>
					{#each semelhantes as individuais, i}
						{#if i < semelhantes.length - 1}
							<li>{individuais}</li>
						{/if}
					{/each}
				</ul>
				<footer>
					o cálculo de semelhança é feito a partir da comparação de PIB e população dos municipios.
				</footer>
			</div>
		</div>
	</div>
</div>
<AreaDeAtuacao {municipio} />
<AvaliacaoAgentes {municipio} />

<style>
	footer {
		margin: 5px;
		font-size: 10px;
	}
	.descricao {
		text-align: center;
	}
	.info h1 {
		margin: 0px;
		font-weight: 300;
		text-align: center;
	}
	.info h3 {
		margin: 0px;
		text-align: center;
		font-size: 60px;
		font-weight: 200;
	}

	@media only screen and (max-width: 768px) {
		.info {
			width: 95%;
			background-color: white;
			margin: 5px 5px 0px 5px;
			border-radius: 15px;
		}
		.organize-info {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.similar {
			visibility: hidden;
			width: 0px;
			height: 0px;
		}
	}

	@media only screen and (min-width: 768px) {
		.info {
			width: 32%;
			background-color: white;
			padding: 10px;
			margin: 15px 1% 5px 1%;
			border-radius: 15px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.info h1 {
			font-size: 30px;
		}

		.organize-info {
			display: flex;
		}
		.percentualESimilar {
			display: flex;
		}

		.similar {
			width: 48%;
			height: 250px;
			align-items: center;
			background-color: white;
			border-radius: 15px;
			margin-top: 5px;
			margin-left: 1%;
		}

		.similar h2 {
			font-weight: 300;
			text-align: center;
			margin: 0px;
			padding-top: 5px;
			font-size: 20px;
		}
		.similar h2 span {
			color: red;
		}
		.similar ul {
			list-style-type: none;
		}
		.similar ul li {
			font-size: 18px;
			text-align: center;
			padding-bottom: 8px;
		}
	}

	@media only screen and (min-width: 1200px) {
		.info {
			margin: 5px;
			width: 32%;
			background-color: white;
			padding: 10px;
			padding-top: 0px;
			margin-top: 15px;
			margin-bottom: 5px;
			border-radius: 15px;
			height: 105px;
		}
		.info h1 {
			font-size: 26px;
		}
		.info h3 {
			font-size: 50px;
		}
		.percentualESimilar {
			margin-left: 5px;
			width: 25%;
			height: 100%;
			flex-direction: column;
		}
		.organize {
			display: flex;
			flex-direction: row;
			margin-left: 5px;
			margin-right: 5px;
			width: 98.5%;
			height: 730px;
		}
		.organize-info {
			display: flex;
			width: 100%;
			flex-direction: row;
			justify-content: space-between;
		}

		.organize2 {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 75%;
			height: 100%;
		}
		.similar {
			width: 100%;
			height: 240px;
			align-items: center;
			background-color: white;
			border-radius: 15px;
			margin-top: 15px;
			margin-bottom: 20px;
			margin-left: 5px;
			margin-right: 5px;
		}

		.similar h2 {
			font-weight: 300;
			text-align: center;
		}
		.similar h2 span {
			color: red;
		}
		.similar ul {
			list-style-type: none;
		}
		.similar ul li {
			font-size: 16px;
			text-align: center;
			padding-bottom: 5px;
		}
	}
</style>
