import { PIB } from "./CONSTANTS/PIB";
import { POPULACAO } from "./CONSTANTS/POPULACAO";

/*

presença da aba oportunidades
conceitos a serem testados
usar o pib per capita como multiplicador
levar em consideração se o municipio é um destaque local ou estuadual em alguma área de atuação (5% de diferença)
levar em consideração a distribuição de agentes ouro, prata e bronze (subjetivo)
usar uma escala absoluta
comparar valor final com os municipios semelhantes

há um questionamento válido se esta aba deveria ser paralela a analise municipal e que fosse voltada para os patrocinadores em si e que fosse uma forma
de filtrar os municipio dados dados de interesse (população, pib, áreas de atuação, número de agentes, etc)

*/

function avaliar(tiposdeAgentes: { agentesOuro: number; agentesPrata: number; agentesBronze: number }, muncipio : string){
    let score =0
    const pesos = [3,2,1]
    score += (tiposdeAgentes.agentesOuro*pesos[0])
    score += (tiposdeAgentes.agentesPrata*pesos[1])
    score += (tiposdeAgentes.agentesBronze*pesos[2])
    let atratibilidade
    atratibilidade = score*(PIB.get(muncipio)!/100000)
    atratibilidade = atratibilidade/(POPULACAO.get(muncipio)!/10000)

  



    return atratibilidade
}

export default avaliar