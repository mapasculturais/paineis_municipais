//estimativa IBGE 2021

const POPULACAO = new Map()

POPULACAO.set('BELA CRUZ',32851);
POPULACAO.set('CANINDÉ',77484);
POPULACAO.set('GENERAL SAMPAIO',7767);
POPULACAO.set('IBIAPINA',25165);
POPULACAO.set('BAIXIO',6318);
POPULACAO.set('MIRAÍMA',13965);
POPULACAO.set('HIDROLÂNDIA',20126);
POPULACAO.set('BARREIRA',22715);
POPULACAO.set('PIQUET CARNEIRO',17210);
POPULACAO.set('SÃO JOÃO DO JAGUARIBE',7557);
POPULACAO.set('HORIZONTE',69688);
POPULACAO.set('PEREIRO',16356);
POPULACAO.set('MARANGUAPE',131677);
POPULACAO.set('SANTANA DO ACARAÚ',32851);
POPULACAO.set('FRECHEIRINHA',14195);
POPULACAO.set('GRANJEIRO',4784);
POPULACAO.set('PENTECOSTE',38045);
POPULACAO.set('CEDRO',25612);
POPULACAO.set('IPU',42148);
POPULACAO.set('PARAMOTI',12276);
POPULACAO.set('VARJOTA',18520);
POPULACAO.set('SÃO LUÍS DO CURU',13086);
POPULACAO.set('ASSARÉ',23537);
POPULACAO.set('VÁRZEA ALEGRE',41078);
POPULACAO.set('RERIUTABA',18279);
POPULACAO.set('CHORÓ',13608);
POPULACAO.set('PORANGA',12358);
POPULACAO.set('TEJUÇUOCA',19551);
POPULACAO.set('FARIAS BRITO',19330);
POPULACAO.set('PORTEIRAS',14920);
POPULACAO.set('MORAÚJO',8833);
POPULACAO.set('ERERÉ',7254);
POPULACAO.set('TAUÁ',59259);
POPULACAO.set('CASCAVEL',72706);
POPULACAO.set('ITAIÇABA',7904);
POPULACAO.set('LIMOEIRO DO NORTE',60232);
POPULACAO.set('MORRINHOS',22830);
POPULACAO.set('URUOCA',13988);
POPULACAO.set('IRAUÇUBA',24450);
POPULACAO.set('SANTANA DO CARIRI',17726);
POPULACAO.set('TIANGUÁ',77111);
POPULACAO.set('TRAIRI',56653);
POPULACAO.set('CARIDADE',23011);
POPULACAO.set('JAGUARETAMA',18133);
POPULACAO.set('ORÓS',21342);
POPULACAO.set('SANTA QUITÉRIA',43719);
POPULACAO.set('PACUJÁ',6565);
POPULACAO.set('BEBERIBE',54315);
POPULACAO.set('MOMBAÇA',43917);
POPULACAO.set('JUCÁS',24949);
POPULACAO.set('UBAJARA',35295);
POPULACAO.set('PINDORETAMA',20964);
POPULACAO.set('ARACOIABA',26600);
POPULACAO.set('FORTALEZA',2703391);
POPULACAO.set('BANABUIÚ',18313);
POPULACAO.set('MONSENHOR TABOSA',17264);
POPULACAO.set('GRANJA',55170);
POPULACAO.set('CAMPOS SALES',27513);
POPULACAO.set('MULUNGU',11056);
POPULACAO.set('CRUZ',25121);
POPULACAO.set('ABAIARA',11965);
POPULACAO.set('COREAÚ',23340);
POPULACAO.set('QUITERIANÓPOLIS',21246);
POPULACAO.set('ITAITINGA',38661);
POPULACAO.set('APUIARÉS',14742);
POPULACAO.set('MISSÃO VELHA',35566);
POPULACAO.set('ITAPAJÉ',53448);
POPULACAO.set('URUBURETAMA',22223);
POPULACAO.set('ALTANEIRA',7712);
POPULACAO.set('MAURITI',48370);
POPULACAO.set('POTIRETAMA',6455);
POPULACAO.set('PACAJUS',74145);
POPULACAO.set('PEDRA BRANCA',43359);
POPULACAO.set('PENAFORTE',9207);
POPULACAO.set('NOVA OLINDA',15798);
POPULACAO.set('IBARETAMA',13385);
POPULACAO.set('PALHANO',9458);
POPULACAO.set('SÃO BENEDITO',48354);
POPULACAO.set('GUARAMIRANGA',5073);
POPULACAO.set('PARACURU',35526);
POPULACAO.set('JIJOCA DE JERICOACOARA',20351);
POPULACAO.set('ITATIRA',22018);
POPULACAO.set('PACOTI',12313);
POPULACAO.set('GROAÍRAS',11219);
POPULACAO.set('BOA VIAGEM',54680);
POPULACAO.set('PIRES FERREIRA',11052);
POPULACAO.set('CHAVAL',13112);
POPULACAO.set('MARCO',27822);
POPULACAO.set('UMARI',7740);
POPULACAO.set('ACARAÚ',63556);
POPULACAO.set('PALMÁCIA',13553);
POPULACAO.set('CRATEÚS',75241);
POPULACAO.set('CATUNDA',10410);
POPULACAO.set('NOVO ORIENTE',28737);
POPULACAO.set('CRATO',133913);
POPULACAO.set('ARARIPE',21707);
POPULACAO.set('CATARINA',21041);
POPULACAO.set('CARIÚS',18700);
POPULACAO.set('POTENGI',11165);
POPULACAO.set('CARIRÉ',18470);
POPULACAO.set('GUARACIABA DO NORTE',40921);
POPULACAO.set('JAGUARUANA',33960);
POPULACAO.set('SENADOR POMPEU',25418);
POPULACAO.set('ALCÂNTARAS',11846);
POPULACAO.set('ITAPIPOCA',131687);
POPULACAO.set('ITAPIÚNA',20653);
POPULACAO.set('TABULEIRO DO NORTE',32079);
POPULACAO.set('ARNEIROZ',7848);
POPULACAO.set('IGUATU',103633);
POPULACAO.set('ACOPIARA',54687);
POPULACAO.set('TAMBORIL',26199);
POPULACAO.set('JARDIM',27187);
POPULACAO.set('MADALENA',20031);
POPULACAO.set('MUCAMBO',14561);
POPULACAO.set('FORQUILHA',24680);
POPULACAO.set('ARACATI',75392);
POPULACAO.set('RUSSAS',79550);
POPULACAO.set('AMONTADA',44195);
POPULACAO.set('MERUOCA',15309);
POPULACAO.set('QUIXERÉ',22432);
POPULACAO.set('GRAÇA',14415);
POPULACAO.set('BARBALHA',61662);
POPULACAO.set('IPAPORANGA',11597);
POPULACAO.set('JAGUARIBE',34592);
POPULACAO.set('OCARA',25958);
POPULACAO.set('EUSÉBIO',55035);
POPULACAO.set('INDEPENDÊNCIA',26196);
POPULACAO.set('CAMOCIM',64147);
POPULACAO.set('DEPUTADO IRAPUAN PINHEIRO',9698);
POPULACAO.set('SOLONÓPOLE',18389);
POPULACAO.set('ARATUBA',11759);
POPULACAO.set('CAPISTRANO',17830);
POPULACAO.set('MILAGRES',27413);
POPULACAO.set('ALTO SANTO',16077);
POPULACAO.set('BARRO',22834);
POPULACAO.set('IPUEIRAS',38064);
POPULACAO.set('MARTINÓPOLE',11407);
POPULACAO.set('ANTONINA DO NORTE',7402);
POPULACAO.set('JUAZEIRO DO NORTE',278264);
POPULACAO.set('AQUIRAZ',81581);
POPULACAO.set('PARAIPABA',33232);
POPULACAO.set('MARACANAÚ',230986);
POPULACAO.set('SALITRE',16714);
POPULACAO.set('LAVRAS DA MANGABEIRA',31476);
POPULACAO.set('ACARAPE',15140);
POPULACAO.set('BATURITÉ',36127);
POPULACAO.set('ICAPUÍ',20183);
POPULACAO.set('NOVA RUSSAS',32487);
POPULACAO.set('ITAREMA',42595);
POPULACAO.set('CHOROZINHO',20286);
POPULACAO.set('QUIXELÔ',16116);
POPULACAO.set('BREJO SANTO',50195);
POPULACAO.set('SOBRAL',212437);
POPULACAO.set('BARROQUINHA',15069);
POPULACAO.set('JATI',8150);
POPULACAO.set('UMIRIM',19976);
POPULACAO.set('VIÇOSA DO CEARÁ',61916);
POPULACAO.set('CROATÁ',18201);
POPULACAO.set('CAUCAIA',368918);
POPULACAO.set('QUIXADÁ',88899);
POPULACAO.set('FORTIM',16776);
POPULACAO.set('GUAIÚBA',26508);
POPULACAO.set('IPAUMIRIM',12507);
POPULACAO.set('AURORA',24567);
POPULACAO.set('SÃO GONÇALO DO AMARANTE',49306);
POPULACAO.set('TARRAFAS',8555);
POPULACAO.set('AIUABA',17584);
POPULACAO.set('MASSAPÊ',39341);
POPULACAO.set('JAGUARIBARA',11580);
POPULACAO.set('CARIRIAÇU',27008);
POPULACAO.set('IRACEMA',14351);
POPULACAO.set('PACATUBA',85647);
POPULACAO.set('SABOEIRO',15757);
POPULACAO.set('TURURU',16588);
POPULACAO.set('ARARENDÁ',10983);
POPULACAO.set('IBICUITINGA',12730);
POPULACAO.set('REDENÇÃO',29238);
POPULACAO.set('MILHÃ',13129);
POPULACAO.set('CARNAUBAL',17763);
POPULACAO.set('SENADOR SÁ',7758);
POPULACAO.set('ICÓ',68303);
POPULACAO.set('QUIXERAMOBIM',82455);
POPULACAO.set('MORADA NOVA',61590);
POPULACAO.set('PARAMBU',31391);

export{POPULACAO}