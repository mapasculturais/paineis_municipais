<script>
	

// @ts-nocheck


   
    import { Chart } from 'svelte-echarts'
	import { numeroDadosMuni } from './scripts/PuxarDados';
  import { numerosSemelhantes } from './scripts/PuxarDados';
     export let dadosMunicipio
     export let municipio
     export let semelhantes
    let valoresIndividuais = new Array(semelhantes.length-1).fill(0)
    let ValoresColetivos = new Array(semelhantes.length-1).fill(0)
    let ValoresLocais = new Array(semelhantes.length-1).fill(0)
    //console.log(values)
    //console.log(datas)
    //console.log(valuesLocais)
    let options
    $: numerosSemelhantes(semelhantes.slice(0,-1)).then((Response)=>{
      let i = 0
      for(const resposta of Response){
        valoresIndividuais[i]=resposta[0]
        ValoresColetivos[i]=resposta[1]
        ValoresLocais[i]=resposta[2]
        i = i+1;
      }
    })
    let titulos
    $:titulos = [...semelhantes.slice(0,-1),municipio]
    //tamanhos padrões das fontes de opções
    let tamanhos = [15,8,12]

    if(window.innerWidth>=768){
      tamanhos = [30,12,20]
    }
    

    
    
    $: options = {
  title: {
    text: "comparativo municipios semelhantes",
    left: "center",
    textStyle: {
      fontSize: tamanhos[0],
    },
    padding: [2, 0,15, 0]
  },
  xAxis: {
    type: 'category',
    inverse: true,
    data: titulos,
    color: 'black',
    fontSize: tamanhos[1],
    axisLabel : {
      interval: 0,
      
    }
  },
  yAxis: {
    type: 'value'
  },
  legend: {
    show: true,
    top: "30px",
    textStyle: {
      fontSize: tamanhos[2],
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  series: [
    {
      name: "agentes individuais",
      data: [...valoresIndividuais,{
        value: dadosMunicipio[0],
        itemStyle: {
            color: '#005eaa'
          }
      }],
      type: 'bar'
    },
    {
      name: "agentes coletivos",
      data: [...ValoresColetivos,{
        value:dadosMunicipio[1],
        itemStyle: {
            color: '#2b821d'
          }
        
      }],
      type: 'bar'
    },
    {
      name: "espaços",
      data: [...ValoresLocais,{
        value:dadosMunicipio[2],
        itemStyle: {
            color: '#e6b600'
          }
      }],
      type:'bar'
    }
  ]
};

</script>
<div class="container">
  <Chart {options} />
</div>



<style>
  @media only screen and (max-width: 768px) {
    .container {
    padding: 0;
    margin-top: 5px;
		width: 95%;
    margin-left: 2.5%;
		height: 450px;
    background-color: white;
    border-radius: 15px;
	}
  }
  @media only screen and (min-width: 768px) {
    .container {
    padding: 0;
    margin-top: 5px;
		width: 98%;
    margin-left: 1%;
		height: 450px;
    background-color: white;
    border-radius: 15px;
    }
  }
  @media only screen and (min-width: 1200px) {
    .container {
    padding: 0;
    margin-top: 5px;
		width: 99%;
		height: 575px;
    padding-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;
    padding-bottom: 5px;
	}
  } 
	
</style>