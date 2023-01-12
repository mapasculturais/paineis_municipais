<script>
// @ts-nocheck

	import { Chart } from "svelte-echarts";
import { element } from "svelte/internal";
	import { dadosBrutosEstado, todosDadosEstado } from "./scripts/PuxarDados";

    
    /**
	 * @type {number[]}
	 */
    let dadosTitulos = []
    let munis = []
    let inds = []
    let colets = []
    let espacos = []
    todosDadosEstado().then((Response)=>{
        dadosTitulos = Response[0]
        munis = Response[1][0]
        inds = Response[1][1]
        colets = Response[1][2]
        espacos = Response[1][3]
    })
    let options
    $: options = {
        legend: {
    show: true,
    top: "25px"
  },
    title: {
    text: 'visão geral do estado',
    left: 'center'
    },
    toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    bottom: 90
  },
  dataZoom: [
    {
      type: 'inside'
    },
    {
      type: 'slider'
    }
  ],
  xAxis: {
    data: munis
  },
  yAxis: {
    splitArea: {
      show: false
    }
  },
  series: [
    {
      name: "agentes individuais",
      data: inds,
      type: 'bar',
      large: true
    },
    {
      name: "agentes coletivos",
      data: colets,
      type: 'bar',
      large: true
    },
    {
      name: "espaços",
      data: espacos,
      type:'bar',
      large: true
    }
  ]
};
</script>
<div class="descricao">
  <h1>Analise estadual</h1>
  <p>Aqui está a análise dos números brutos de agentes individuais e coletivos inscritos, também como o número de espaços cadastrados, tais dados quando acossiados a um municipio são apresentados no gráfico abaixo ordenados de maior número de agentes individuais para menor( dado mais número do mapas)</p>
</div>

<div class="organize-info">
    <div class="info">
        <h1>número de agentes individuais</h1>
        <h3>{dadosTitulos[0]}</h3>
    </div>
    <div class="info">
        <h1>número de agentes coletivos</h1>
        <h3>{dadosTitulos[1]}</h3>
    </div>
    <div class="info">
        <h1>número de Espacos</h1>
        <h3>{dadosTitulos[2]}</h3>
    </div>
</div>

<div class="container">
  <Chart {options}/>
</div>




<style>
  .descricao {
    text-align: center;
  }
.info h1{
        margin: 0px;
        font-weight: 300;
        text-align: center;
    }
.info h3{
        margin: 0px;
        text-align: center;
        font-size: 60px;
        font-weight: 200;
}
@media only screen and (max-width: 768px) {
  .organize-info{
        display: flex;
        flex-direction: column;
        margin: 5px;
        align-items: center;
        
    }
    .info{
        width: 95%;
        background-color: white;
        padding: 5px;
        margin: 5px 5px 0px 5px;
        border-radius: 15px;
    }
    .container {
    align-self: center;
    padding: 0;
    margin-top: 5px;
	  width: 95%;
	  height: 300px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;

	}
} 

@media only screen and (min-width: 768px) {
  .container {
    align-self: center;
    padding: 0;
    margin-top: 5px;
	  width: 98%;
	  height: 450px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;

	}

  .info{
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
    
    .organize-info{
        display: flex;
        flex-direction: row;
        
    }

    
}

    
</style>