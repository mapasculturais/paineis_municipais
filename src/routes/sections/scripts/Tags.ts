import { MESO } from "./CONSTANTS/MESO"
import axios from "axios"

async function mapearTags() {
    const mesos = new Set<string>()
    for(const [key, value] of MESO){
        mesos.add(value)
    }
    const tipos = ['agent','space']
    const mapa = new Map<string,number>()
    for(const meso of mesos){
        for(const tipo of tipos){
            const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/'+tipo+'/find', {params:{
                '@select' : 'terms',
                'geoMesorregiao' : 'EQ('+meso+')'
            }})
            const dados = await p1
            
            dados.data.forEach((dado: any) =>{
                const atual = dado.terms.tag
                
                atual.forEach((interesseAtual: string) =>{
                    const recortado = interesseAtual.split(/[, ]+/)
                    let valor : number
                    for(const palavra of recortado){
                        if(mapa.get(palavra)!==undefined){
                            valor = mapa.get(palavra)!
                            mapa.set(palavra, valor+1)
                        }else{
                            mapa.set(palavra,1)
                        }
                    }
                    
                })
            })
        }
        
    }
    const mapSort1 = new Map([...mapa.entries()].sort((a, b) => b[1] - a[1]));
    return mapSort1
}

