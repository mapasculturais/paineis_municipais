//estimativa IBGE 2019
const PIB = new Map<string, number>();

PIB.set('BELA CRUZ', 268201);
PIB.set('CANINDÉ', 888695);
PIB.set('GENERAL SAMPAIO', 69856);
PIB.set('IBIAPINA', 312453);
PIB.set('BAIXIO', 55438);
PIB.set('MIRAÍMA', 91793);
PIB.set('HIDROLÂNDIA', 153225);
PIB.set('BARREIRA', 183383);
PIB.set('PIQUET CARNEIRO', 135230);
PIB.set('SÃO JOÃO DO JAGUARIBE', 94721);
PIB.set('HORIZONTE', 1699470);
PIB.set('PEREIRO', 371530);
PIB.set('MARANGUAPE', 1534564);
PIB.set('SANTANA DO ACARAÚ', 230045);
PIB.set('FRECHEIRINHA', 268413);
PIB.set('GRANJEIRO', 45092);
PIB.set('PENTECOSTE', 494744);
PIB.set('CEDRO', 205708);
PIB.set('IPU', 446105);
PIB.set('PARAMOTI', 107579);
PIB.set('VARJOTA', 335951);
PIB.set('SÃO LUÍS DO CURU', 110185);
PIB.set('ASSARÉ', 196620);
PIB.set('VÁRZEA ALEGRE', 397791);
PIB.set('RERIUTABA', 176308);
PIB.set('CHORÓ', 124592);
PIB.set('PORANGA', 89223);
PIB.set('TEJUÇUOCA', 132703);
PIB.set('FARIAS BRITO', 188461);
PIB.set('PORTEIRAS', 155560);
PIB.set('MORAÚJO', 68691);
PIB.set('ERERÉ', 57683);
PIB.set('TAUÁ', 661894);
PIB.set('CASCAVEL', 919514);
PIB.set('ITAIÇABA', 68530);
PIB.set('LIMOEIRO DO NORTE', 1046116);
PIB.set('MORRINHOS', 162086);
PIB.set('URUOCA', 177288);
PIB.set('IRAUÇUBA', 188549);
PIB.set('SANTANA DO CARIRI', 134319);
PIB.set('TIANGUÁ', 1463955);
PIB.set('TRAIRI', 784875);
PIB.set('CARIDADE', 154557);
PIB.set('JAGUARETAMA', 170424);
PIB.set('ORÓS', 185020);
PIB.set('SANTA QUITÉRIA', 502581);
PIB.set('PACUJÁ', 51039);
PIB.set('BEBERIBE', 872924);
PIB.set('MOMBAÇA', 342751);
PIB.set('JUCÁS', 244456);
PIB.set('UBAJARA', 580855);
PIB.set('PINDORETAMA', 246160);
PIB.set('ARACOIABA', 229964);
PIB.set('FORTALEZA', 67412733);
PIB.set('BANABUIÚ', 183573);
PIB.set('MONSENHOR TABOSA', 141228);
PIB.set('GRANJA', 395075);
PIB.set('CAMPOS SALES', 267529);
PIB.set('MULUNGU', 106688);
PIB.set('CRUZ', 285860);
PIB.set('ABAIARA', 94505);
PIB.set('COREAÚ', 175963);
PIB.set('QUITERIANÓPOLIS', 162633);
PIB.set('ITAITINGA', 723023);
PIB.set('APUIARÉS', 113911);
PIB.set('MISSÃO VELHA', 471630);
PIB.set('ITAPAJÉ', 640102);
PIB.set('URUBURETAMA', 295583);
PIB.set('ALTANEIRA', 58442);
PIB.set('MAURITI', 420990);
PIB.set('POTIRETAMA', 64371);
PIB.set('PACAJUS', 1146881);
PIB.set('PEDRA BRANCA', 333026);
PIB.set('PENAFORTE', 112813);
PIB.set('NOVA OLINDA', 145587);
PIB.set('IBARETAMA', 108690);
PIB.set('PALHANO', 89685);
PIB.set('SÃO BENEDITO', 543714);
PIB.set('GUARAMIRANGA', 75259);
PIB.set('PARACURU', 505811);
PIB.set('JIJOCA DE JERICOACOARA', 493905);
PIB.set('ITATIRA', 136893);
PIB.set('PACOTI', 126788);
PIB.set('GROAÍRAS', 87585);
PIB.set('BOA VIAGEM', 469745);
PIB.set('PIRES FERREIRA', 66442);
PIB.set('CHAVAL', 95572);
PIB.set('MARCO', 333543);
PIB.set('UMARI', 56732);
PIB.set('ACARAÚ', 709694);
PIB.set('PALMÁCIA', 93908);
PIB.set('CRATEÚS', 851554);
PIB.set('CATUNDA', 113119);
PIB.set('NOVO ORIENTE', 240510);
PIB.set('CRATO', 1759303);
PIB.set('ARARIPE', 170102);
PIB.set('CATARINA', 119006);
PIB.set('CARIÚS', 144572);
PIB.set('POTENGI', 85165);
PIB.set('CARIRÉ', 163470);
PIB.set('GUARACIABA DO NORTE', 558863);
PIB.set('JAGUARUANA', 474572);
PIB.set('SENADOR POMPEU', 315194);
PIB.set('ALCÂNTARAS', 81717);
PIB.set('ITAPIPOCA', 1677743);
PIB.set('ITAPIÚNA', 145852);
PIB.set('TABULEIRO DO NORTE', 368274);
PIB.set('ARNEIROZ', 58806);
PIB.set('IGUATU', 1697613);
PIB.set('ACOPIARA', 462784);
PIB.set('TAMBORIL', 239925);
PIB.set('JARDIM', 230924);
PIB.set('MADALENA', 141471);
PIB.set('MUCAMBO', 107449);
PIB.set('FORQUILHA', 226164);
PIB.set('ARACATI', 1402880);
PIB.set('RUSSAS', 1100878);
PIB.set('AMONTADA', 517558);
PIB.set('MERUOCA', 110636);
PIB.set('QUIXERÉ', 401031);
PIB.set('GRAÇA', 105976);
PIB.set('BARBALHA', 1054405);
PIB.set('IPAPORANGA', 87949);
PIB.set('JAGUARIBE', 510829);
PIB.set('OCARA', 190844);
PIB.set('EUSÉBIO', 3199867);
PIB.set('INDEPENDÊNCIA', 248160);
PIB.set('CAMOCIM', 719804);
PIB.set('DEPUTADO IRAPUAN PINHEIRO', 73571);
PIB.set('SOLONÓPOLE', 219037);
PIB.set('ARATUBA', 125502);
PIB.set('CAPISTRANO', 154961);
PIB.set('MILAGRES', 240866);
PIB.set('ALTO SANTO', 183085);
PIB.set('BARRO', 194469);
PIB.set('IPUEIRAS', 279729);
PIB.set('MARTINÓPOLE', 80285);
PIB.set('ANTONINA DO NORTE', 64425);
PIB.set('JUAZEIRO DO NORTE', 4873357);
PIB.set('AQUIRAZ', 2632276);
PIB.set('PARAIPABA', 440566);
PIB.set('MARACANAÚ', 9748585);
PIB.set('SALITRE', 127204);
PIB.set('LAVRAS DA MANGABEIRA', 272570);
PIB.set('ACARAPE', 142487);
PIB.set('BATURITÉ', 390699);
PIB.set('ICAPUÍ', 358659);
PIB.set('NOVA RUSSAS', 299164);
PIB.set('ITAREMA', 615586);
PIB.set('CHOROZINHO', 287728);
PIB.set('QUIXELÔ', 142613);
PIB.set('BREJO SANTO', 675862);
PIB.set('SOBRAL', 4579749);
PIB.set('BARROQUINHA', 110406);
PIB.set('JATI', 112662);
PIB.set('UMIRIM', 158147);
PIB.set('VIÇOSA DO CEARÁ', 482347);
PIB.set('CROATÁ', 179332);
PIB.set('CAUCAIA', 6919758);
PIB.set('QUIXADÁ', 1005661);
PIB.set('FORTIM', 205235);
PIB.set('GUAIÚBA', 203710);
PIB.set('IPAUMIRIM', 124316);
PIB.set('AURORA', 209653);
PIB.set('SÃO GONÇALO DO AMARANTE', 3759451);
PIB.set('TARRAFAS', 68794);
PIB.set('AIUABA', 129418);
PIB.set('MASSAPÊ', 295164);
PIB.set('JAGUARIBARA', 126778);
PIB.set('CARIRIAÇU', 210028);
PIB.set('IRACEMA', 149407);
PIB.set('PACATUBA', 1024602);
PIB.set('SABOEIRO', 128724);
PIB.set('TURURU', 115987);
PIB.set('ARARENDÁ', 84741);
PIB.set('IBICUITINGA', 101032);
PIB.set('REDENÇÃO', 342538);
PIB.set('MILHÃ', 140550);
PIB.set('CARNAUBAL', 131338);
PIB.set('SENADOR SÁ', 52153);
PIB.set('ICÓ', 613466);
PIB.set('QUIXERAMOBIM', 1228231);
PIB.set('MORADA NOVA', 1009596);
PIB.set('PARAMBU', 240114);

export { PIB };
