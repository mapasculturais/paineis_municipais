import { areaDeAtuacao } from "../PuxarDados";
import { MESO } from "./MESO";

const MAPAMESOS = new Map()

let MAPAESTADO = {
    agente: new Map(),
    espaco: new Map()
}

function totalParaPeso(pesos : number[]) {
    const soma = pesos.reduce((acc, value) => acc + value, 0);
    const final = pesos.map(value => value / soma);
    return final;
  }

  

  //CORRIGIR, tem algo errado
  function juntaMapas(mapas: any[] | Map<any, any>, pesos: any[]) {
    const resultadoAgente = new Map();
    const resultadoEspaco = new Map();
  
    let index = 0;
    for (const [key, value] of mapas.entries()) {
      for (const [mapKey, mapValue] of value.agente.entries()) {
        if (resultadoAgente.has(mapKey)) {
          resultadoAgente.set(mapKey, resultadoAgente.get(mapKey) + mapValue * pesos[index]);
        } else {
          resultadoAgente.set(mapKey, mapValue * pesos[index]);
        }
      }
  
      for (const [mapKey, mapValue] of value.espaco.entries()) {
        if (resultadoEspaco.has(mapKey)) {
          resultadoEspaco.set(mapKey, resultadoEspaco.get(mapKey) + mapValue * pesos[index]);
        } else {
          resultadoEspaco.set(mapKey, mapValue * pesos[index]);
        }
      }
  
      index++;
    }
  
    for (const [key, value] of resultadoAgente.entries()) {
      resultadoAgente.set(key, value / pesos.reduce((a, b) => a + b, 0));
    }
  
    for (const [key, value] of resultadoEspaco.entries()) {
      resultadoEspaco.set(key, value / pesos.reduce((a, b) => a + b, 0));
    }
  
    return { agente: resultadoAgente, espaco: resultadoEspaco };
  }

async function atualizarMapasAtuacao() {
		const mesos = new Set<string>(Array.from(MESO.values()));
        let total =  Array(mesos.size).fill(0)
        let atual = 0
		for (const meso of mesos) {
            const tipos = ['agent', 'space']
            const mapa = new Map()
            const mapaAgente = new Map()
            const mapaEspaco = new Map()
                for(const tipo of tipos){
			        const resultado = await areaDeAtuacao(meso, tipo, mapa);
			        const mapaAtual = resultado[0];
			        total[atual] = resultado[1];
                    const dados = Array.from(mapaAtual, ([name, value]) => ({ name, value }));
	                dados.sort((a, b) => b.value - a.value);
                    dados.forEach((dado)=>{
                        if(dado.name!=='Outros'){
                            if(tipo == "agent"){
                                mapaAgente.set(dado.name,(dado.value*100)/total[atual])
                            }else if(tipo == "space"){
                                mapaEspaco.set(dado.name,(dado.value*100)/total[atual])
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
        total = totalParaPeso(total)
        MAPAESTADO = juntaMapas(MAPAMESOS,total)
    }

    export {
        atualizarMapasAtuacao,
        MAPAESTADO,
        MAPAMESOS
        }