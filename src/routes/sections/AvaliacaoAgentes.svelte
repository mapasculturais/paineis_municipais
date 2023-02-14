<script>
// @ts-nocheck

	import { Chart } from "svelte-echarts";
import { avaliarAgentesMuni } from "./scripts/PuxarDados";


/**
	 * @type {string}
	 */
 export let municipio
let ativo = false
let dados = {
    agentesOuro: 0,
    agentesPrata: 0,
    agentesBronze: 0,
}
$: avaliarAgentesMuni(municipio).then((Response)=>{

    dados = Response
    ativo = true
})

$: options = {
    color: ['#ffd700', '#c0c0c0', '#cd7f32'],
  title: {
    text: 'Tipos de Agente',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
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
	    <p>
		    Usando-se de dados como presença e tamanho de descrição, disponibilização de dados públicos e a participação na aba oportunidades todos os agentes do municipio são classificados entre Agentes Ouro, Agentes Prata e Agentes Bronze.
	    </p>
    </div>
    <div class="container">
        {#if ativo}
            <div class="chartContainer">
                <Chart {options}/>
            </div>
            <p>o municipio {municipio} possui {dados.agentesOuro} agentes classificados como ouro, {dados.agentesPrata} agentes classificados como prata e {dados.agentesBronze} agentes classificados como bronze</p>
        {:else}
            <p>Calculando</p>
        {/if}
    </div>
<style>
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
			width: fit-content;
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