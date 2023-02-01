<script>
	// @ts-nocheck

	import Pesquisa from './sections/Pesquisa.svelte';
	import { MUNICIPIOS } from './sections/scripts/CONSTANTS/MUNICIPIOS';
	import Estado from './sections/Estado.svelte';
	import Municipio from './sections/Municipio.svelte';

	//fazer autocomplete funcionar
	/**
	 * @type {string[]}
	 */
	let municipiosFiltrados = [];



	//filtra municipios e bota em negrito o q tem em comum
	const filtrarMunicipios = () => {
		/**
		 * @type {string[]}
		 */
		let guardarDado = [];
		if (municipio) {
			MUNICIPIOS.forEach((muni) => {
				if (muni.toLowerCase().startsWith(municipio.toLowerCase())) {
					guardarDado = [...guardarDado, makeMatchBold(muni)];
				}
			});
			if ('ESTADO'.toLowerCase().startsWith(municipio.toLowerCase())) {
				guardarDado = [...guardarDado, makeMatchBold('ESTADO')];
			}
		}
		municipiosFiltrados = guardarDado;
	};

	//entrada padrão
	let municipio = '';
	let valorMuncipio = municipio;
	/**
	 * @type {number}
	 */
	let hiLitedIndex = -1;

	$: if (!municipio) {
		municipiosFiltrados = [];
		hiLitedIndex = -1;
	}

	const setInputVal = (/** @type {string} */ nomeMuni) => {
		municipio = removeBold(nomeMuni);
		municipiosFiltrados = [];
		hiLitedIndex = -1;
		// @ts-ignore
		document.querySelector('#entrada-muni').focus();
	};

	const submitValue = () => {
		if (municipio) {
			console.log('enviei ' + municipio);
			valorMuncipio = municipio;
		}
	};

	const makeMatchBold = (/** @type {string} */ str) => {
		let matched = str.substring(0, municipio.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (/** @type {string} */ str) => {
		return str.replace(/<(.)*?>/g, '');
	};

	//navegar lista e recomendacoes
	$: hiLitedMuni = municipiosFiltrados[hiLitedIndex];

	const navigateList = (/** @type {{ key: string; }} */ e) => {
		if (e.key === 'ArrowDown' && hiLitedIndex <= municipiosFiltrados.length - 1) {
			hiLitedIndex === -1 ? (hiLitedIndex = 0) : (hiLitedIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLitedIndex !== -1) {
			hiLitedIndex === 0 ? (hiLitedIndex = municipiosFiltrados.length - 1) : (hiLitedIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(municipiosFiltrados[hiLitedIndex]);
		} else {
			return;
		}
	};
	//$:acharporcentagens(municipio).then((Response)=>{
	//	console.log(Response)
	//})

	//backup
	//<input bind:value={municipio}>
	//	<button on:click={()=>{
	//		valorMuncipio = municipio
	//	}}> mudar valor </button>
</script>

<svelte:window on:keydown={navigateList} />
<div class="container" style="display: flex;">
	<div class="pesquisa">
		<div class="descricao">
			<h1>Ferramenta de análise de dados culturais municipais</h1>
			<p>
				Esta ferramenta facilita a visualização de dados da participação dos municípios dentro do <a
					href="https://mapacultural.secult.ce.gov.br/">Mapa Cultural do Ceará.</a
				>
			</p>
		</div>
		<form autocomplete="off" on:submit|preventDefault={submitValue}>
			<div class="autocomplete">
				<input
					id="entrada-muni"
					type="text"
					placeholder="digitar municipio"
					bind:value={municipio}
					on:input={filtrarMunicipios}
					on:click={(event) => event.target.select()}
				/>
			</div>
			<input type="submit" value="pesquisar" />
			{#if municipiosFiltrados.length > 0}
				<ul id="autocomplete-items-list">
					{#each municipiosFiltrados as itemMuni, i}
						<Pesquisa
							itemLabel={itemMuni}
							highlighted={i === hiLitedIndex}
							on:click={() => setInputVal(itemMuni)}
						/>
					{/each}
				</ul>
			{/if}
		</form>
	</div>
	{#if valorMuncipio === 'ESTADO'}
		<Estado />
	{:else if valorMuncipio === ''}
		<div class="loading">Digite o nome do município</div>
	{:else}
		<Municipio municipio={valorMuncipio} />
	{/if}
</div>

<style>
	.loading {
		font-size: 30px;
	}

	.loading:after {
		overflow: hidden;
		display: inline-block;
		vertical-align: bottom;
		-webkit-animation: ellipsis steps(4, end) 900ms infinite;
		animation: ellipsis steps(4, end) 900ms infinite;
		content: '\2026'; /* ascii code for the ellipsis character */
		width: 0px;
	}

	@keyframes ellipsis {
		to {
			width: 1.25em;
		}
	}

	@-webkit-keyframes ellipsis {
		to {
			width: 1.25em;
		}
	}

	.descricao {
		text-align: center;
	}

	form {
		position: relative;
	}
	input {
		margin: 10px;
		border: 1px solid transparent;
		background-color: white;
		padding: 10px;
		font-size: 20px;
		font-family: 'Times New Roman', Times, serif;
	}
	input[type='text'] {
		background-color: #f1f1f1;
		width: 100%;
	}

	input[type='submit'] {
		margin-top: 5px;
		background-color: dodgerblue;
		color: #fff;
	}
	.pesquisa {
		background-color: white;
		border-radius: 0px 0px 15px 15px;
	}
	.container {
		flex-direction: column;
	}

	@media only screen and (max-width: 768px) {
		form input {
			width: 95%;
			align-self: center;
		}
		.container {
			flex-direction: column;
		}
		div.autocomplete {
			position: relative;
			display: inline-block;
			width: 90%;
		}
		#autocomplete-items-list {
			z-index: 99;
			position: absolute;
			margin: 0;
			margin-left: 10px;
			margin-top: 10px;
			padding: 0;
			top: 45px;
			width: 95%;
			border: 1px solid #ddd;
			background-color: #ddd;
		}
	}
	@media only screen and (min-width: 768px) {
		form input {
			width: 48%;
			align-self: center;
		}
		.container {
			flex-direction: column;
		}

		div.autocomplete {
			position: relative;
			display: inline-block;
			width: 48%;
		}
		#autocomplete-items-list {
			z-index: 99;
			position: absolute;
			margin: 0;
			margin-left: 1%;
			margin-top: 10px;
			padding: 0;
			top: 45px;
			width: 50%;
			border: 1px solid #ddd;
			background-color: #ddd;
		}
	}

	@media only screen and (min-width: 1200px) {
		div.autocomplete {
			position: relative;
			display: inline-block;
			width: 576px;
			margin-left: 10px;
		}
		form input {
			width: 576px;
			align-self: center;
			margin-right: 0px;
			margin-left: 0px;
		}

		#autocomplete-items-list {
			z-index: 99;
			position: absolute;
			margin: 0;
			margin-left: 10px;
			margin-top: 10px;
			padding: 0;
			top: 45px;
			width: 596px;
			border: 1px solid #ddd;
			background-color: #ddd;
		}
	}
</style>
