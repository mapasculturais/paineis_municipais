import axios from 'axios';
import { atualizarMapasAtuacao, MAPAESTADO, MAPAMESOS } from './CONSTANTS/ATUACAO';
import { MESO } from './CONSTANTS/MESO';
import { MICRO } from './CONSTANTS/MICRO';
import { MUNICIPIOS } from './CONSTANTS/MUNICIPIOS';

//recebe um municipio e retorna o número total de agentes individuais, coletivos e locais registrados naquele municipio
async function numeroDadosMuni(lugar: string) {
	const final: number[] = [];
	const pAgentesIndividuais = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id',
			geoMunicipio: 'EQ(' + lugar + ')',
			_type: 'EQ(1)'
		}
	});

	const pAgentesColetivos = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id',
			geoMunicipio: 'EQ(' + lugar + ')',
			_type: 'EQ(2)'
		}
	});

	const pEspacos = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find', {
		params: {
			'@select': 'id',
			geoMunicipio: 'EQ(' + lugar + ')'
		}
	});

	const dataTotal = await Promise.all([pAgentesIndividuais, pAgentesColetivos, pEspacos]);
	dataTotal.forEach((data) => {
		final.push(data?.data.length);
	});

	return final;
}
//recebe um municipio ou Mesoregiao, o tipo de dado que é esperado (agent ou space) e caso o local seja uma mesoregião recebe também um mapa e retorna um mapa com as áreas de atuação do local definido para a opção definida e o número total de observado
async function areaDeAtuacao(local: string, tipo: string, mapaGeral?: Map<string, number>) {
	let p1;
	if (mapaGeral === undefined) {
		p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/' + tipo + '/find', {
			params: {
				'@select': 'terms',
				geoMunicipio: 'EQ(' + local + ')'
			}
		});
	} else {
		p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/' + tipo + '/find', {
			params: {
				'@select': 'terms',
				geoMesorregiao: 'EQ(' + local + ')'
			}
		});
	}

	const dados = await p1;
	let mapaInteresses = new Map<string, number>();
	if (mapaGeral !== undefined) {
		mapaInteresses = mapaGeral;
	}
	const total = dados.data.length;
	dados.data.forEach((dado: { terms: { area: any } }) => {
		const atual = dado.terms.area;
		atual.forEach((interesseAtual: string) => {
			let valor: number;
			if (mapaInteresses.has(interesseAtual)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				valor = mapaInteresses.get(interesseAtual)!;
				mapaInteresses.set(interesseAtual, valor + 1);
			} else {
				mapaInteresses.set(interesseAtual, 1);
			}
		});
	});
	return [mapaInteresses, total];
}

//recebe um municipio ou 'ESTADO', dependendo do caso utiliza a função de área de atuação pra tratar o mapa de áreas de atuação do local e retorna um array de destaques, um array com os valores percentuais dos destaques e um array de objetos com as áreas restantes
async function tratarDadosAtuacao(lugar: string, tipo: string) {
	await atualizarMapasAtuacao();
	let mapa = new Map<string, number>();
	let total: number;
	if (MUNICIPIOS.has(lugar)) {
		const resultado = await areaDeAtuacao(lugar, tipo);
		mapa = resultado[0];
		total = resultado[1];
	} else if (lugar == 'ESTADO') {
		total = 100;
		//depois tenho que ver como vou fazer o request pra estado, os testes estão dando errado
		if (tipo == 'agent') {
			mapa = MAPAESTADO.agente;
		} else if (tipo == 'space') {
			mapa = MAPAESTADO.espaco;
		}
	}
	const dados = Array.from(mapa, ([name, value]) => ({ name, value }));
	dados.sort((a, b) => b.value - a.value);

	const destaquesNomes: string[] = [];
	const destaquesValores: string[] = [];
	const outros: { name: string; value: string }[] = [];
	let index = 0;
	dados.forEach((dado) => {
		index = index + 1;
		const individual = {
			name: dado.name,
			value: ((dado.value / total) * 100).toFixed(2)
		};
		if (individual.name === 'Outros') {
			index = index - 1;
		} else if (index < 10) {
			destaquesNomes.push(individual.name);
			destaquesValores.push(individual.value);
		} else {
			outros.push(individual);
		}
	});
	if (MUNICIPIOS.has(lugar)) {
		const destaquesMeso: any[] = [];
		const destaquesEstado: any[] = [];
		destaquesNomes.forEach((destaque) => {
			if (tipo == 'agent') {
				destaquesMeso.push(
					MAPAMESOS.get(MESO.get(MICRO.get(lugar)))
						.agente.get(destaque)
						.toFixed(2)
				);
				destaquesEstado.push(MAPAESTADO.agente.get(destaque).toFixed(2));
			} else if (tipo == 'space') {
				destaquesMeso.push(
					MAPAMESOS.get(MESO.get(MICRO.get(lugar)))
						.agente.get(destaque)
						.toFixed(2)
				);
				destaquesEstado.push(MAPAESTADO.espaco.get(destaque).toFixed(2));
			}
		});
		const series = [
			{
				name: lugar,
				data: [...destaquesValores],
				type: 'bar'
			},
			{
				name: MESO.get(MICRO.get(lugar)),
				data: [...destaquesMeso],
				type: 'bar'
			},
			{
				name: 'ESTADO',
				data: [...destaquesEstado],
				type: 'bar'
			}
		];
		return [[destaquesNomes, series], outros];
	} else {
		const series = [
			{
				name: lugar,
				data: [...destaquesValores],
				type: 'bar'
			}
		];
		return [[destaquesNomes, series], outros];
	}
}

//retorna o número bruto de agentes individuais, coletivos e espaços cadastrados no estado
async function numerosDadosEstado() {
	const final: number[] = [];
	const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id',
			_type: 'EQ(1)'
		}
	});

	const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id',
			_type: 'EQ(2)'
		}
	});

	const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find', {
		params: {
			'@select': 'id'
		}
	});

	const dataTotal = await Promise.all([p1, p2, p3]);
	dataTotal.forEach((data) => {
		final.push(data?.data.length);
	});

	return final;
}

//retorna o número de agentes coletivos, individuais e espaços cadastrados na meso regição
async function numeroDadosMeso(lugar: string) {
	const final: number[] = [];
	const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id',
			geoMesorregiao: 'EQ(' + lugar + ')',
			_type: 'EQ(1)'
		}
	});

	const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id',
			geoMesorregiao: 'EQ(' + lugar + ')',
			_type: 'EQ(2)'
		}
	});

	const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find', {
		params: {
			'@select': 'id',
			geoMesorregiao: 'EQ(' + lugar + ')'
		}
	});

	const dataTotal = await Promise.all([p1, p2, p3]);
	dataTotal.forEach((data) => {
		final.push(data?.data.length);
	});

	return final;
}

//recebe uma lista de municipios e agrupa seus dados de agentes e espaços
async function numerosSemelhantes(listaMunis: string[]) {
	const listaP = [];
	for (const muni of listaMunis) {
		listaP.push(numeroDadosMuni(muni));
	}
	const dadosGerais = await Promise.all(listaP);
	return dadosGerais;
}

//retorna todos os dados cadastrados no múnicipio de agentes e espaços e os ordena por municipio
async function dadosBrutosEstado() {
	//vai chamar todos os dados da api, ordenar por numero de agetes individuis e devolver um array no formato [[array municipios na ordem],[array agentes individuais],[array agente coletivos],[arrays espacos]]
	//lista de elementos [nome, agentInd,agenteConj,]
	const listaPersonalizada: {
		lugar: string;
		agentesInd: number;
		agentesColet: number;
		espacos: number;
	}[] = [];
	MUNICIPIOS.forEach((muni) => {
		const ind = { lugar: muni, agentesInd: 0, agentesColet: 0, espacos: 0 };
		listaPersonalizada.push(ind);
	});

	const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id,geoMunicipio',
			_type: 'EQ(1)',
			geoMunicipio: '!NULL()'
		}
	});
	const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select': 'id,geoMunicipio',
			_type: 'EQ(2)',
			geoMunicipio: '!NULL()'
		}
	});
	const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find', {
		params: {
			'@select': 'id,geoMunicipio',
			geoMunicipio: '!NULL()'
		}
	});
	const dataTotal = await Promise.all([p1, p2, p3]);
	dataTotal[0].data.forEach((element: { id: number; geoMunicipio: string }) => {
		const index = acharIndexElemento(listaPersonalizada, element.geoMunicipio);
		listaPersonalizada[index].agentesInd += 1;
	});
	dataTotal[1].data.forEach((element: { id: number; geoMunicipio: string }) => {
		const index = acharIndexElemento(listaPersonalizada, element.geoMunicipio);
		listaPersonalizada[index].agentesColet += 1;
	});
	dataTotal[2].data.forEach((element: { id: number; geoMunicipio: string }) => {
		const index = acharIndexElemento(listaPersonalizada, element.geoMunicipio);
		listaPersonalizada[index].espacos += 1;
	});
	listaPersonalizada.sort(function (a, b) {
		return b.agentesInd - a.agentesInd;
	});
	const listaA: string[] = [];
	const listaB: number[] = [];
	const listaC: number[] = [];
	const listaD: number[] = [];
	listaPersonalizada.forEach((element) => {
		listaA.push(element.lugar);
		listaB.push(element.agentesInd);
		listaC.push(element.agentesColet);
		listaD.push(element.espacos);
	});
	const listaFinal = [];
	listaFinal.push(listaA);
	listaFinal.push(listaB);
	listaFinal.push(listaC);
	listaFinal.push(listaD);

	return listaFinal;
}

//função intermediária
function acharIndexElemento(
	lista: { lugar: string; agentesInd: number; agentesColet: number; espacos: number }[],
	alvo: string
) {
	for (let i = 0; i < lista.length; i++) {
		if (lista[i].lugar === alvo) return i;
	}
	return 0;
}

//agrupa todos os dados do estado em um único retorno
async function todosDadosEstado() {
	const p1 = numerosDadosEstado();
	const p2 = dadosBrutosEstado();
	const resultado = await Promise.all([p1, p2]);
	return resultado;
}

async function compararAtuacaoMeso(muni: string, tipo: string, nomesAreas: string[]) {
	let mapa: Map<string, number> = new Map();
	const retorno = await areaDeAtuacao(MESO.get(MICRO.get(muni)), tipo, mapa);
	mapa = retorno[0];
	const total = retorno[1];
	const resultado: number[] = [];
	for (const area of nomesAreas) {
		if (mapa.get(area) !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			resultado.push(mapa.get(area)!);
		} else {
			resultado.push(0);
		}
	}
	const final: string[] = [];
	for (const resultados of resultado) {
		final.push(((resultados / total) * 100).toFixed(2));
	}
	return final;
}
async function avaliarAgentesMuni(municipio: string) {
	const retorno = {
		agentesBronze: 0,
		agentesPrata: 0,
		agentesOuro: 0
	};
	const dados = await axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find', {
		params: {
			'@select':
				'shortDescription,longDescription,emailPublico,endereco,site,facebook,twitter,instagram,linkedin,spotify,youtube,pinterest,useOpportunityTab',
			geoMunicipio: 'EQ(' + municipio + ')'
		}
	});
	const mediapequeno = {
		total: 0,
		atual: 0
	};
	const mediaGrande = {
		total: 0,
		atual: 0
	};
	dados.data.forEach(
		(agente: {
			shortDescription: string | undefined;
			longDescription: string | undefined;
			emailPublico: undefined;
			endereco: undefined;
			site: undefined;
			facebook: undefined;
			twitter: undefined;
			instagram: undefined;
			linkedin: undefined;
			spotify: undefined;
			youtube: undefined;
			pinterest: undefined;
			useOpportunityTab: undefined;
		}) => {
			let valor = 0;
			if (agente.shortDescription !== undefined) {
				valor += parseInt((agente.shortDescription.length / 200).toFixed(0));
				mediapequeno.total += agente.shortDescription.length;
				mediapequeno.atual++;
			}
			if (agente.longDescription !== undefined) {
				valor += parseInt((agente.longDescription.length / 350).toFixed(0));
				mediaGrande.total += agente.longDescription.length;
				mediaGrande.atual++;
			}
			if (agente.emailPublico !== undefined) {
				valor += 5;
			}
			if (agente.endereco !== undefined) {
				valor += 2;
			}
			if (agente.site !== undefined) {
				valor += 10;
			}
			if (agente.facebook !== undefined) {
				valor += 1;
			}
			if (agente.facebook !== undefined) {
				valor += 1;
			}
			if (agente.twitter !== undefined) {
				valor += 1;
			}
			if (agente.instagram !== undefined) {
				valor += 1;
			}
			if (agente.linkedin !== undefined) {
				valor += 1;
			}
			if (agente.spotify !== undefined) {
				valor += 1;
			}
			if (agente.youtube !== undefined) {
				valor += 1;
			}
			if (agente.pinterest !== undefined) {
				valor += 1;
			}
			if (agente.useOpportunityTab !== undefined) {
				valor += 20;
			}
			if (valor > 50) {
				retorno.agentesOuro += 1;
			} else if (valor > 45) {
				retorno.agentesPrata += 1;
			} else {
				retorno.agentesBronze += 1;
			}
		}
	);
	console.log('media pequeno + ' + mediapequeno.total / mediapequeno.atual);
	console.log('media grande + ' + mediaGrande.total / mediaGrande.atual);
	return retorno;
}
export {
	areaDeAtuacao,
	compararAtuacaoMeso,
	tratarDadosAtuacao as tratarDadosInteresse,
	areaDeAtuacao as interessesMuni,
	numeroDadosMuni,
	numeroDadosMeso,
	numerosSemelhantes,
	numerosDadosEstado,
	dadosBrutosEstado,
	todosDadosEstado,
	avaliarAgentesMuni
};
