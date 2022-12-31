<script>
// @ts-nocheck




	import { Chart } from "svelte-echarts";
import {tratarDadosInteresse } from "./scripts/PuxarDados";
    /**
	 * @type {string}
	 */
     export let municipio
    
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let nomesAgentes
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let valoresAgentes
    /**
	 * @type {string | any[]}
	 */
    let restanteAgentes = []

    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let nomesLocais
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let valoresLocais
    /**
	 * @type {string | any[]}
	 */
    let restanteLocais = []
    $: tratarDadosInteresse(municipio, "agent").then((Response)=>{
        // @ts-ignore
        nomesAgentes = Response[0][0]
        // @ts-ignore
        valoresAgentes = Response[0][1]
        restanteAgentes = Response[1]


    })
    $: tratarDadosInteresse(municipio, "space").then((Response)=>{
        // @ts-ignore
        nomesLocais = Response[0][0]
        // @ts-ignore
        valoresLocais = Response[0][1]
        restanteLocais = Response[1]
    })
    $: options = {
  title: {
    text: 'Áreas de destaques dos membros',
    left: 'center',
    textStyle : {
      fontSize:22,
      fontWeight: 'bolder'
    }

  },
  tooltip: {
    trigger: 'item'
  },
  yAxis: {
    type: 'category',
    data: nomesAgentes,
    inverse: true,
    axisLabel : {
      fontSize : 20
    }
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLabel : {
      show: false
    }
  },
  series: [
    {
      data: valoresAgentes,
      type: 'bar',
      colorBy: 'data'
    }
  ],
  grid: {
    containLabel: true
  }
};

$: optionEspaco = {
  title: {
    text: 'Áreas de destaques dos locais',
    left: 'center',
    textStyle : {
      fontSize:22,
      fontWeight: 'bolder'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  yAxis: {
    type: 'category',
    data: nomesLocais,
    inverse : true,
    axisLabel : {
      fontSize: 20
    }
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLabel : {
      show: false
    }
  },
  series: [
    {
      data: valoresLocais,
      type: 'bar',
      colorBy: 'data'
    }
  ],
  grid: {
    containLabel: true
  }
};
let torelance = 12


function inverterLados (opcao){
  let temp = opcao.xAxis
  opcao.xAxis = opcao.yAxis
  opcao.yAxis = temp
  return opcao
}


</script>
<div class="segurarAmbos">
    <div class="container">
      {#if restanteAgentes.length>0}
      <div class = "chartContainer">
        <Chart {options}/>
      </div>
      <div>
        <h2>Demais Áreas de Atuação</h2>
        <ul>
          {#each restanteAgentes as atual,i}
            {#if i<torelance}
              <li>{atual.name} &emsp &emsp<span>({atual.value}%)</span></li>
            {/if}
          {/each}
        </ul>
        <p>...</p>
      </div>
      {:else}
      <div class="reserva">
        <Chart options = {inverterLados(options)}/>
      </div>
      {/if}
    </div>
    <div class="container" id="segundo" >
      {#if restanteLocais.length > 0}
      <div class="chartContainer">
        <Chart options={optionEspaco}/>
      </div>
      <div>
        <h2>Demais Áreas de Atuação</h2>
        <ul>
          {#each restanteLocais as atual,i}
          {#if i<torelance}
            <li>{atual.name} &emsp &emsp<span>({atual.value}%)</span></li>
          {/if}
          {/each}
        </ul>
        <p>...</p>
      </div>
      {:else}
      <div class="reserva">
        <Chart options = {inverterLados(optionEspaco)}/>
      </div>
      {/if}
    </div>
</div>
<style>
  .reserva{
    height: 100%;
    width: 100%;
  }
  h2{
    font-size: 28px;
    margin: 0px;
    padding-bottom: 10px;
  }
  ul{
    padding: 0px;
    margin-bottom: 0px;
  }
  li span{
    float: right;
  }
  p{
    text-align: center;
    margin: 0px;
    font-size: 24px;
    font-weight: bold;
  }
  li {
    font-size: 24px;
    margin-bottom: 3px;
    text-align: left;
    list-style-type: none;
  }
    .chartContainer {
      padding-top: 0.5%;
      height: 100%;
      width: 50%;
    }
    #segundo{
        margin-left: 20px;
    }
    .segurarAmbos{
        display: flex;
    }
    .container {
        display: flex;
        justify-content: space-evenly;
        background-color: white;
        margin-left: 20px;
        margin-bottom: 20px;
        padding: 20px;
        padding-bottom: 0px;
        border-radius: 10px;
        width: 800px;
        height: 500px;
        padding-left: 35px;
    }
</style>