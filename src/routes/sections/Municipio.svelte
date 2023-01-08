<script>
    import Comparativo from "./Comparativo.svelte";
    import Percentual from "./Percentual.svelte";
	import { acharSemelhantes } from "./scripts/AcharSemelhantes";
	import { numeroDadosMuni } from "./scripts/PuxarDados";
	import AreaDeAtuacao from "./AreaDeAtuacao.svelte";
    /**
	 * @type {string}
	 */
     export let municipio


     /**
	 * @type {string []}
	 */
     let semelhantes
     /**
	 * @type {number[]}
	 */
     let dadosMuni = []
	    $: numeroDadosMuni(municipio).then((response)=>{
        dadosMuni = response
	    })

    $: semelhantes = acharSemelhantes(municipio)
    
    
    
    
</script>
<div style="display: block;">
    <div class="descricao">
        <h1>Dimencionamento do campo cultural</h1>
        <p>Segue abaixo a leitura dos dados brutos do Municipio, seu numero de Agentes Culturais registrados, tanto individuais como coletivos, também como o número de locais, é comparado a participação do municipio no mapas culturais a participação da sua macro região, e este dado é colocado lado a lado com a sua parcela da população da macro região, dados de PIB e população são utilizados para encontrar municipios semelhantes para que os dados sejam comparados</p>
    </div>
    <div class="organize">
        <div class="organize2">
            <div class="organize-info">
                <div class="info">
                    <h1>número de agentes individuais</h1>
                    <h3>{dadosMuni[0]}</h3>
                </div>
                <div class="info">
                    <h1>número de agentes coletivos</h1>
                    <h3>{dadosMuni[1]}</h3>
                </div>
                <div class="info">
                    <h1>número de locais</h1>
                    <h3>{dadosMuni[2]}</h3>
                </div>
            </div>
            <div>
                <Comparativo semelhantes = {semelhantes} municipio = {municipio} dadosMunicipio = {dadosMuni}></Comparativo>
            </div>
        </div>
        <div class="percentualESimilar">
            <Percentual {municipio}></Percentual>
            <div class="organize">
                <div class="similar">
                    <h2>municipios semelhantes para comparação <span title="aproximação feita com tolerância de {+semelhantes[semelhantes.length-1]*100}%">*</span></h2>
                    <ul>
                        {#each semelhantes as individuais,i}
                            {#if (i<semelhantes.length-1)}
                                <li>{individuais}</li>
                            {/if}  
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
    
</div>
<AreaDeAtuacao {municipio}/>
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
    
@media only screen and (max-width: 600px) {
    .info{
        width: 95%;
        background-color: white;
        margin: 5px 5px 0px 5px;
        border-radius: 15px;
    }
    .organize-info{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .similar {
        visibility: hidden;
        width: 0px;
        height: 0px;
    }
} 

@media only screen and (min-width: 600px) {
    .info{
        min-width: 350px;
        background-color: white;
        padding: 10px;
        margin: 15px 5px 5px 5px;
        border-radius: 15px;
    }
    .percentualESimilar{
        margin-left: 5px;
    }
    .organize{
        display: flex;
        flex-direction: row;
        margin-left: 5px;
    }
    .organize-info{
        display: flex;
        flex-direction: row;
        margin-left: 5px;
    }
    
    .organize2 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .similar {
        min-width: 530px;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        margin-top: 15px;
        margin-bottom: 30px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .similar h2{
        font-weight: 300;
        text-align: center;
    }
    .similar h2 span {
        color: red;
    }
    .similar ul{
        list-style-type: none;
    }
    .similar ul li{
        font-size: 16px;
        text-align: center;
        padding-bottom: 5px;
    }

}
</style>


