import axios from "axios"
import { MESO } from "./CONSTANTS/MESO"
import { MUNICIPIOS } from "./CONSTANTS/MUNICIPIOS"







async function numeroDadosMuni(lugar : string){
    //concidera que recebe ou um municipio ou uma mesoregiao
    //locais/agentes coletivos/agentes individuais
    const final: number[] = []
        const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMunicipio' : 'EQ('+lugar+')',
        '_type' : 'EQ(1)'
        }})

        const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMunicipio' : 'EQ('+lugar+')',
        '_type' : 'EQ(2)'
        }})

        const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
        '@select' : 'id',
        'geoMunicipio' : 'EQ('+lugar+')',
        }})
        
    
    const dataTotal = await Promise.all([p1,p2,p3])
    dataTotal.forEach(data => {
        final.push(data?.data.length)
    });

    return final
}

async function interessesMuni(municipio:string, tipo : string, mapaGeral?:Map <string,number>) {
    let p1
    if(mapaGeral===undefined){
        p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/'+tipo+'/find', {params:{
            '@select' : 'terms',
            'geoMunicipio' : 'EQ('+municipio+')'
        }})
    }else{
        p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/'+tipo+'/find', {params:{
            '@select' : 'terms',
            'geoMesorregiao' : 'EQ('+municipio+')'
        }})
    }
    
    const dados = await p1
    let mapaInteresses = new Map <string,number>() 
    if(mapaGeral!==undefined){
        mapaInteresses = mapaGeral
    }
    const total = dados.data.length
    dados.data.forEach((dado: any) =>{
        const atual = dado.terms.area
        atual.forEach((interesseAtual: string) =>{
            let valor : number
            if(mapaInteresses.get(interesseAtual)!==undefined){
                valor = mapaInteresses.get(interesseAtual)!
                mapaInteresses.set(interesseAtual, valor+1)
            }else{
                mapaInteresses.set(interesseAtual,1)
            }
        })
    })
    return [mapaInteresses,total]
}
async function tratarDadosInteresse(lugar :string, tipo: string) {
    let mapa = new Map <string,number>()
    let total : number
    if(MUNICIPIOS.has(lugar)){
        const resultado = await interessesMuni(lugar,tipo)
        mapa = resultado[0]
        total = resultado[1]
    }else if (lugar=="ESTADO"){
        total = 0
        //depois tenho que ver como vou fazer o request pra estado, os testes estão dando errado
        const mesos = new Set<string>()
        for(const [key, value] of MESO){
            mesos.add(value)
        }
        for(const meso of mesos){
            const resultado = await interessesMuni(meso,tipo,mapa)
            mapa = resultado[0]
            total = total + resultado[1]
        }
    }
    const dados = Array.from(mapa, ([name, value]) => ({ name, value}));
    dados.sort((a,b)=>b.value-a.value)
    
    const destaquesNomes: string[] = []
    const destaquesValores: string[] = []
    const outros: { name: string; value: string }[] = []
    let index = 0
    dados.forEach((dado)=>{
        index = index+1
        const individual = {
            name: dado.name,
            value: ((dado.value/total)*100).toFixed(2)
        }
        if(individual.name==="Outros"){
            index=index-1
        }
        else if(index<10){
            destaquesNomes.push(individual.name)
            destaquesValores.push(individual.value)
        }else{
            outros.push(individual)
        }
    })
    
    

    return [[destaquesNomes,destaquesValores], outros]

}
async function numerosDadosEstado(){
    const final : number[] = []
        const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id',
            '_type' : 'EQ(1)'
        }})

        const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id',
            '_type' : 'EQ(2)'
        }})

        const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
        '@select' : 'id'
        }})

        const dataTotal = await Promise.all([p1,p2,p3])
        dataTotal.forEach(data => {
            final.push(data?.data.length)
        });

    return final

}

async function numeroDadosMeso(lugar : string) {
    const final: number[] = []
        const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMesorregiao' : 'EQ('+lugar+')',
        '_type' : 'EQ(1)'
        }})

        const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMesorregiao' : 'EQ('+lugar+')',
        '_type' : 'EQ(2)'
        }})

        const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
        '@select' : 'id',
        'geoMesorregiao' : 'EQ('+lugar+')',
        }})
        
    
    const dataTotal = await Promise.all([p1,p2,p3])
    dataTotal.forEach(data => {
        final.push(data?.data.length)
    });

    return final
}


async function numerosSemelhantes(listaMunis :string[]) {
    const listaP = []
    for (const muni of listaMunis) {
        listaP.push(numeroDadosMuni(muni))
    }
    const dadosGerais = await Promise.all(listaP)
    return dadosGerais
}

async function dadosBrutosEstado() {
    //vai chamar todos os dados da api, ordenar por numero de agetes individuis e devolver um array no formato [[array municipios na ordem],[array agentes individuais],[array agente coletivos],[arrays espacos]]
    //lista de elementos [nome, agentInd,agenteConj,]
    const listaPersonalizada: {lugar : string , agentesInd : number , agentesColet : number , espacos : number} []  = []
    MUNICIPIOS.forEach((muni)=>{
        const ind = {lugar : muni, agentesInd : 0, agentesColet: 0, espacos: 0}
        listaPersonalizada.push(ind)
    })

    const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id,geoMunicipio',
            '_type' : 'EQ(1)',
            'geoMunicipio' : '!NULL()'
        }})
    const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id,geoMunicipio',
            '_type' : 'EQ(2)',
            'geoMunicipio' : '!NULL()'
        }})
    const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
            '@select' : 'id,geoMunicipio',
            'geoMunicipio' : '!NULL()'
            }})
    const dataTotal = await Promise.all([p1,p2,p3])
    dataTotal[0].data.forEach((element: {id : number , geoMunicipio : string}) => {
        const index = acharIndexElemento(listaPersonalizada, element.geoMunicipio)
        listaPersonalizada[index].agentesInd+=1
    });
    dataTotal[1].data.forEach((element: {id : number , geoMunicipio : string}) => {
        const index = acharIndexElemento(listaPersonalizada, element.geoMunicipio)
        listaPersonalizada[index].agentesColet+=1
    });
    dataTotal[2].data.forEach((element: {id : number , geoMunicipio : string}) => {
        const index = acharIndexElemento(listaPersonalizada, element.geoMunicipio)
        listaPersonalizada[index].espacos+=1
    });
    listaPersonalizada.sort(function(a, b){
        return b.agentesInd - a.agentesInd 
    })
    const listaA: string[] = []
    const listaB: number[] = []
    const listaC: number[] = []
    const listaD: number[] = []
    listaPersonalizada.forEach(element =>{
        listaA.push(element.lugar)
        listaB.push(element.agentesInd)
        listaC.push(element.agentesColet)
        listaD.push(element.espacos)
    })
    const listaFinal = []
    listaFinal.push(listaA)
    listaFinal.push(listaB)
    listaFinal.push(listaC)
    listaFinal.push(listaD)

    return listaFinal;
}

function acharIndexElemento(lista: {lugar : string , agentesInd : number , agentesColet : number , espacos : number} [] , alvo : string){
    for(let i = 0; i<lista.length;i++){
        if(lista[i].lugar === alvo)
        return i;
    }
    return 0
}

async function todosDadosEstado() {
    const p1 = numerosDadosEstado()
    const p2 = dadosBrutosEstado()
    const resultado = await Promise.all([p1,p2])
    return resultado
}
export {tratarDadosInteresse , interessesMuni, numeroDadosMuni,numeroDadosMeso,numerosSemelhantes, numerosDadosEstado, dadosBrutosEstado, todosDadosEstado}