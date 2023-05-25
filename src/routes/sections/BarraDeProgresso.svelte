<script>
	/**
	 * @type {{ numero: number; nome: any; }}
	 */
	export let dados;
	/**
	 * @type {number}
	 */
	export let total;
	/**
	 * @type {number}
	 */
	$: percentual = (dados.numero / total) * 100;
</script>

<div class="base">
	<h1>{dados.nome}</h1>
	<div class="geral">
		<div class="percentual" style="width: {percentual}%;">{percentual.toFixed(0)}%</div>
	</div>
	<p>{dados.numero}<span>{total}</span></p>
</div>

<style>
	.base {
		height: 90px;
	}
	.geral {
		margin-left: 2.5%;
		background-color: #c12e34;
		border-radius: 5px;
		height: 20px;
	}
	.percentual {
		padding: 0px;
		background-color: #2b821d;
		height: 20px;
		border-radius: 5px;
		text-align: right;
		color: aliceblue;
	}
	p {
		margin-left: 5%;
		margin-right: 5%;
		margin-top: 5px;
	}
	h1 {
		text-align: center;
		margin: 5px;
	}
	span {
		float: right;
	}
	@media only screen and (max-width: 768px) {
		.geral {
			width: 95%;
		}
		.base {
			widows: 100%;
		}
		h1 {
			font-size: medium;
		}
	}
	@media only screen and (min-width: 768px) {
		.base {
			width: 420px;
		}
		.geral {
			width: 400px;
		}
	}
</style>
