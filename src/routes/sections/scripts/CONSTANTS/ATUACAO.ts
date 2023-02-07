import { areaDeAtuacao } from "../PuxarDados";
import { MESO } from "./MESO";

const MAPAMESOS = new Map()

let MAPAESTADO = {
    agente: new Map(),
    espaco: new Map()
}

let atualizado = false

function totalParaPeso(pesos : number[]) {
    const soma = pesos.reduce((acc, value) => acc + value, 0);
    const final = pesos.map(value => value / soma);
    return final;
  }

  

  //CORRIGIR, tem algo errado
  function juntaMapas(mapas: any[] | Map<any, any>, pesosAgente: any[],pesosEspaco: any[]) {
    const resultadoAgente = new Map();
    const resultadoEspaco = new Map();
  
    let index = 0;
    for (const [key, value] of mapas.entries()) {
      for (const [mapKey, mapValue] of value.agente.entries()) {
        if (resultadoAgente.has(mapKey)) {
          resultadoAgente.set(mapKey, resultadoAgente.get(mapKey) + mapValue * pesosAgente[index]);
        } else {
          resultadoAgente.set(mapKey, mapValue * pesosAgente[index]);
        }
      }
  
      for (const [mapKey, mapValue] of value.espaco.entries()) {
        if (resultadoEspaco.has(mapKey)) {
          resultadoEspaco.set(mapKey, resultadoEspaco.get(mapKey) + mapValue * pesosEspaco[index]);
        } else {
          resultadoEspaco.set(mapKey, mapValue * pesosEspaco[index]);
        }
      }
  
      index++;
    }
  
    for (const [key, value] of resultadoAgente.entries()) {
      resultadoAgente.set(key, value / pesosAgente.reduce((a, b) => a + b, 0));
    }
  
    for (const [key, value] of resultadoEspaco.entries()) {
      resultadoEspaco.set(key, value / pesosEspaco.reduce((a, b) => a + b, 0));
    }
  
    return { agente: resultadoAgente, espaco: resultadoEspaco };
  }

async function atualizarMapasAtuacao() {
  if(!atualizado){
    const mesos = new Set<string>(Array.from(MESO.values()));
    console.log(mesos)
        let totalAg =  Array(mesos.size).fill(0)
        let totalEs = Array(mesos.size).fill(0)
        let atual = 0
		for (const meso of mesos) {
            const tipos = ['agent', 'space']
            const mapaAgente = new Map()
            const mapaEspaco = new Map()
            for(const tipo of tipos){
              const mapa = new Map()
			        const resultado = await areaDeAtuacao(meso, tipo, mapa);
			        const mapaAtual = resultado[0];
              if(tipo == "agent"){
                totalAg[atual] = resultado[1];
              }else if(tipo == "space"){
                totalEs[atual] = resultado[1];
              }
			        
                    const dados = Array.from(mapaAtual, ([name, value]) => ({ name, value }));
	                dados.sort((a, b) => b.value - a.value);
                    dados.forEach((dado)=>{
                        if(dado.name!=='Outros'){
                            if(tipo == "agent"){
                                mapaAgente.set(dado.name,(dado.value*100)/totalAg[atual])
                            }else if(tipo == "space"){
                                mapaEspaco.set(dado.name,(dado.value*100)/totalEs[atual])
                            }
                            
                        }
                    })
		    }
            const objeto = {
                agente: mapaAgente,
                espaco: mapaEspaco
            }
            MAPAMESOS.set(meso,objeto)
            atual++
        }
        console.log(MAPAMESOS)
        totalAg = totalParaPeso(totalAg)
        totalEs = totalParaPeso(totalEs)
        MAPAESTADO = juntaMapas(MAPAMESOS,totalAg,totalEs)
        atualizado=true
  }
		
    }

    export {
        atualizarMapasAtuacao,
        MAPAESTADO,
        MAPAMESOS
        }