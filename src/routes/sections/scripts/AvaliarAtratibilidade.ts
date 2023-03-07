import { PIB } from "./CONSTANTS/PIB";
import { POPULACAO } from "./CONSTANTS/POPULACAO";

function avaliar(tiposdeAgentes: { agentesOuro: number; agentesPrata: number; agentesBronze: number }, muncipio : string){
    let score =0
    const pesos = [3,2,1]
    score += (tiposdeAgentes.agentesOuro*pesos[0])
    score += (tiposdeAgentes.agentesPrata*pesos[1])
    score += (tiposdeAgentes.agentesBronze*pesos[2])
    let atratibilidade
    atratibilidade = score*(PIB.get(muncipio)!)
    atratibilidade = atratibilidade/(POPULACAO.get(muncipio)!)

    return atratibilidade
}

export default avaliar