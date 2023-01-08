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
    let tamanhos = [22,20]
    if(window.innerWidth<=600){
      tamanhos=[20,12]
    }
    $: options = {
  title: {
    text: 'Áreas de destaques dos membros',
    left: 'center',
    textStyle : {
      fontSize:tamanhos[0],
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
      fontSize : tamanhos[1]
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
      type: 'bar'
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
      fontSize:tamanhos[0],
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
      fontSize: tamanhos[1]
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
      type: 'bar'
    }
  ],
  grid: {
    containLabel: true
  }
};
let torelance = 12


</script>
<div class="descricao">
  <h1>Perfil e vocação do Municipio</h1>
  <p>A ferramenta levanta os dados de Aréas de atuação dos agentes e espaços cadastrados de modo a apresentar um mapa dos interesses de destaque da região</p>
</div>
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
        <Chart options = {options}/>
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
        <Chart options = {optionEspaco}/>
      </div>
      {/if}
    </div>
</div>
<style>
  .descricao{
    text-align: center;
  }
  
  ul{
    padding: 0px;
    margin-bottom: 0px;
    }
    li span{
    float: right;
  }
  .container p{
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
  .reserva{
    height: 100%;
    width: 100%;
  }
  @media only screen and (max-width: 600px) {
    h2{
    text-align: center;
    font-size: 20px;
    margin: 0px;
    padding-bottom: 10px;
  }
  li {
    padding-left: 2.5%;
    padding-right: 2.5%;
  }
  ul {
    font-size: 18;
  }
    .container {
        background-color: white;
        margin-left: 2.5%;
        margin-bottom: 5px;
        border-radius: 10px;
        width: 95%;
        height: 800px;
    }
    .chartContainer {
      height: 40%;
      width: 100%;
    }
	}
    
  @media only screen and (min-width: 600px) {
    h2{
    text-align: center;
    font-size: 28px;
    margin: 0px;
    padding-bottom: 10px;
  }
  
  
  
  
  
    .chartContainer {
      padding-top: 0.5%;
      height: 100%;
      width: 40%;
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
	}
  
</style>