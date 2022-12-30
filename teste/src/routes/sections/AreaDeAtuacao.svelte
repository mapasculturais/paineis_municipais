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
    let restanteAgentes = []

    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let nomesLocais
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let valoresLocais
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
    text: 'destaques',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  yAxis: {
    type: 'category',
    data: nomesAgentes,
    inverse: true
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
    text: 'destaques',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  yAxis: {
    type: 'category',
    data: nomesLocais,
    inverse : true
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
let torelance = 26
</script>
<div class="segurarAmbos">
    <div class="container">
      <div class = "chartContainer">
        <Chart {options}/>
      </div>
      <div>
        <h2>Demais Áreas de Atuação</h2>
        <ul>
          {#each restanteAgentes as atual,i}
            {#if i<torelance}
              <li>{atual.name} <br/>({atual.value}%)</li>
            {/if}
          {/each}
          <li>...</li>
        </ul>
      </div>
    </div>
    <div class="container" id="segundo" >
      <div class="chartContainer">
        <Chart options={optionEspaco}/>
      </div>
      <div>
        <h2>Demais Áreas de Atuação</h2>
        <ul>
          {#each restanteLocais as atual,i}
          {#if i<torelance}
            <li>{atual.name} <br/>({atual.value}%)</li>
          {/if}
          {/each}
          <li>...</li>
        </ul>
      </div>
    </div>
</div>
<style>
  ul{
    -moz-column-count: 3;
    -moz-column-gap: 10%;
    -webkit-column-count: 3;
    -webkit-column-gap: 10%;
    column-count: 3;
    column-gap: 10%;
    height: 100%;
    width: 70%;
  }
  li {
    font-size: 16px;
  }
    .chartContainer {
      height: 100%;
      width: 30%;
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