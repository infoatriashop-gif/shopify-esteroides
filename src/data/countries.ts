/**
 * Countries supported by Dropi with their administrative divisions
 * and phone validation rules.
 */

export type PhoneValidation = {
  regex: RegExp;
  length: number[];
  placeholder: string;
};

export type AdminDivision = {
  name: string;
  children?: AdminDivision[];
};

export type CountryConfig = {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  phonePrefix: string;
  phoneValidation: PhoneValidation;
  divisionLabels: string[]; // e.g. ["Departamento", "Ciudad"]
  divisions: AdminDivision[];
  dropiApiBase?: string; // Dropi API base URL for this country
};

// Phone validation patterns per country
const PHONE_VALIDATIONS: Record<string, PhoneValidation> = {
  CO: { regex: /^3\d{9}$/, length: [10], placeholder: "300 123 4567" },
  MX: { regex: /^\d{10}$/, length: [10], placeholder: "55 1234 5678" },
  PA: { regex: /^\d{7,8}$/, length: [7, 8], placeholder: "6000 1234" },
  EC: { regex: /^0?\d{9,10}$/, length: [9, 10], placeholder: "09 1234 5678" },
  PE: { regex: /^\d{9}$/, length: [9], placeholder: "912 345 678" },
  CL: { regex: /^\d{9}$/, length: [9], placeholder: "9 1234 5678" },
  PY: { regex: /^\d{9,10}$/, length: [9, 10], placeholder: "981 123 456" },
  VE: { regex: /^\d{10}$/, length: [10], placeholder: "412 123 4567" },
  AR: { regex: /^\d{10,11}$/, length: [10, 11], placeholder: "11 1234 5678" },
  GT: { regex: /^\d{8}$/, length: [8], placeholder: "5123 4567" },
  ES: { regex: /^\d{9}$/, length: [9], placeholder: "612 345 678" },
  PT: { regex: /^\d{9}$/, length: [9], placeholder: "912 345 678" },
  CR: { regex: /^\d{8}$/, length: [8], placeholder: "8312 3456" },
  DO: { regex: /^\d{10}$/, length: [10], placeholder: "809 123 4567" },
};

// Colombia divisions
const CO_DIVISIONS: AdminDivision[] = [
  { name: "AMAZONAS", children: [{ name: "LETICIA" }, { name: "PUERTO NARIÑO" }] },
  { name: "ANTIOQUIA", children: [{ name: "MEDELLIN" }, { name: "BELLO" }, { name: "ITAGUI" }, { name: "ENVIGADO" }, { name: "SABANETA" }, { name: "RIONEGRO" }, { name: "APARTADO" }, { name: "TURBO" }, { name: "CAUCASIA" }] },
  { name: "ARAUCA", children: [{ name: "ARAUCA" }, { name: "TAME" }, { name: "SARAVENA" }] },
  { name: "ATLANTICO", children: [{ name: "BARRANQUILLA" }, { name: "SOLEDAD" }, { name: "MALAMBO" }, { name: "SABANALARGA" }] },
  { name: "BOLIVAR", children: [{ name: "CARTAGENA" }, { name: "MAGANGUE" }, { name: "TURBACO" }, { name: "ARJONA" }] },
  { name: "BOYACA", children: [{ name: "TUNJA" }, { name: "DUITAMA" }, { name: "SOGAMOSO" }, { name: "CHIQUINQUIRA" }] },
  { name: "CALDAS", children: [{ name: "MANIZALES" }, { name: "VILLAMARIA" }, { name: "LA DORADA" }, { name: "CHINCHINA" }] },
  { name: "CAQUETA", children: [{ name: "FLORENCIA" }, { name: "SAN VICENTE DEL CAGUAN" }] },
  { name: "CASANARE", children: [{ name: "YOPAL" }, { name: "AGUAZUL" }, { name: "VILLANUEVA" }] },
  { name: "CAUCA", children: [{ name: "POPAYAN" }, { name: "SANTANDER DE QUILICHAO" }, { name: "PUERTO TEJADA" }] },
  { name: "CESAR", children: [{ name: "VALLEDUPAR" }, { name: "AGUACHICA" }, { name: "CODAZZI" }] },
  { name: "CHOCO", children: [{ name: "QUIBDO" }, { name: "ISTMINA" }] },
  { name: "CORDOBA", children: [{ name: "MONTERIA" }, { name: "LORICA" }, { name: "CERETE" }, { name: "SAHAGUN" }] },
  { name: "CUNDINAMARCA", children: [{ name: "BOGOTA" }, { name: "SOACHA" }, { name: "FACATATIVA" }, { name: "ZIPAQUIRA" }, { name: "CHIA" }, { name: "FUSAGASUGA" }, { name: "GIRARDOT" }, { name: "MOSQUERA" }, { name: "MADRID" }, { name: "FUNZA" }] },
  { name: "GUAINIA", children: [{ name: "INIRIDA" }] },
  { name: "GUAVIARE", children: [{ name: "SAN JOSE DEL GUAVIARE" }] },
  { name: "HUILA", children: [{ name: "NEIVA" }, { name: "PITALITO" }, { name: "GARZON" }] },
  { name: "LA GUAJIRA", children: [{ name: "RIOHACHA" }, { name: "MAICAO" }, { name: "URIBIA" }] },
  { name: "MAGDALENA", children: [{ name: "SANTA MARTA" }, { name: "CIENAGA" }, { name: "FUNDACION" }] },
  { name: "META", children: [{ name: "VILLAVICENCIO" }, { name: "ACACIAS" }, { name: "GRANADA" }] },
  { name: "NARIÑO", children: [{ name: "PASTO" }, { name: "TUMACO" }, { name: "IPIALES" }] },
  { name: "NORTE DE SANTANDER", children: [{ name: "CUCUTA" }, { name: "OCAÑA" }, { name: "PAMPLONA" }] },
  { name: "PUTUMAYO", children: [{ name: "MOCOA" }, { name: "PUERTO ASIS" }] },
  { name: "QUINDIO", children: [{ name: "ARMENIA" }, { name: "CALARCA" }, { name: "MONTENEGRO" }] },
  { name: "RISARALDA", children: [{ name: "PEREIRA" }, { name: "DOSQUEBRADAS" }, { name: "SANTA ROSA DE CABAL" }] },
  { name: "SAN ANDRES", children: [{ name: "SAN ANDRES" }, { name: "PROVIDENCIA" }] },
  { name: "SANTANDER", children: [{ name: "BUCARAMANGA" }, { name: "FLORIDABLANCA" }, { name: "GIRON" }, { name: "PIEDECUESTA" }, { name: "BARRANCABERMEJA" }] },
  { name: "SUCRE", children: [{ name: "SINCELEJO" }, { name: "COROZAL" }] },
  { name: "TOLIMA", children: [{ name: "IBAGUE" }, { name: "ESPINAL" }, { name: "MELGAR" }] },
  { name: "VALLE DEL CAUCA", children: [{ name: "CALI" }, { name: "BUENAVENTURA" }, { name: "PALMIRA" }, { name: "TULUA" }, { name: "BUGA" }, { name: "CARTAGO" }, { name: "JAMUNDI" }] },
  { name: "VAUPES", children: [{ name: "MITU" }] },
  { name: "VICHADA", children: [{ name: "PUERTO CARREÑO" }] },
];

// Mexico divisions
const MX_DIVISIONS: AdminDivision[] = [
  { name: "AGUASCALIENTES", children: [{ name: "AGUASCALIENTES" }] },
  { name: "BAJA CALIFORNIA", children: [{ name: "TIJUANA" }, { name: "MEXICALI" }, { name: "ENSENADA" }] },
  { name: "BAJA CALIFORNIA SUR", children: [{ name: "LA PAZ" }, { name: "LOS CABOS" }] },
  { name: "CAMPECHE", children: [{ name: "CAMPECHE" }] },
  { name: "CHIAPAS", children: [{ name: "TUXTLA GUTIERREZ" }, { name: "SAN CRISTOBAL DE LAS CASAS" }] },
  { name: "CHIHUAHUA", children: [{ name: "CHIHUAHUA" }, { name: "CIUDAD JUAREZ" }] },
  { name: "CIUDAD DE MEXICO", children: [{ name: "CIUDAD DE MEXICO" }] },
  { name: "COAHUILA", children: [{ name: "SALTILLO" }, { name: "TORREON" }, { name: "MONCLOVA" }] },
  { name: "COLIMA", children: [{ name: "COLIMA" }, { name: "MANZANILLO" }] },
  { name: "DURANGO", children: [{ name: "DURANGO" }] },
  { name: "GUANAJUATO", children: [{ name: "LEON" }, { name: "GUANAJUATO" }, { name: "IRAPUATO" }, { name: "CELAYA" }] },
  { name: "GUERRERO", children: [{ name: "ACAPULCO" }, { name: "CHILPANCINGO" }] },
  { name: "HIDALGO", children: [{ name: "PACHUCA" }] },
  { name: "JALISCO", children: [{ name: "GUADALAJARA" }, { name: "ZAPOPAN" }, { name: "PUERTO VALLARTA" }] },
  { name: "MEXICO", children: [{ name: "TOLUCA" }, { name: "ECATEPEC" }, { name: "NAUCALPAN" }, { name: "NEZAHUALCOYOTL" }] },
  { name: "MICHOACAN", children: [{ name: "MORELIA" }, { name: "URUAPAN" }] },
  { name: "MORELOS", children: [{ name: "CUERNAVACA" }] },
  { name: "NAYARIT", children: [{ name: "TEPIC" }] },
  { name: "NUEVO LEON", children: [{ name: "MONTERREY" }, { name: "SAN PEDRO GARZA GARCIA" }, { name: "GUADALUPE" }, { name: "APODACA" }] },
  { name: "OAXACA", children: [{ name: "OAXACA" }] },
  { name: "PUEBLA", children: [{ name: "PUEBLA" }, { name: "TEHUACAN" }] },
  { name: "QUERETARO", children: [{ name: "QUERETARO" }] },
  { name: "QUINTANA ROO", children: [{ name: "CANCUN" }, { name: "PLAYA DEL CARMEN" }, { name: "CHETUMAL" }] },
  { name: "SAN LUIS POTOSI", children: [{ name: "SAN LUIS POTOSI" }] },
  { name: "SINALOA", children: [{ name: "CULIACAN" }, { name: "MAZATLAN" }] },
  { name: "SONORA", children: [{ name: "HERMOSILLO" }, { name: "CIUDAD OBREGON" }, { name: "NOGALES" }] },
  { name: "TABASCO", children: [{ name: "VILLAHERMOSA" }] },
  { name: "TAMAULIPAS", children: [{ name: "REYNOSA" }, { name: "TAMPICO" }, { name: "MATAMOROS" }, { name: "NUEVO LAREDO" }] },
  { name: "TLAXCALA", children: [{ name: "TLAXCALA" }] },
  { name: "VERACRUZ", children: [{ name: "VERACRUZ" }, { name: "XALAPA" }, { name: "COATZACOALCOS" }] },
  { name: "YUCATAN", children: [{ name: "MERIDA" }, { name: "VALLADOLID" }] },
  { name: "ZACATECAS", children: [{ name: "ZACATECAS" }] },
];

// Panama divisions
const PA_DIVISIONS: AdminDivision[] = [
  { name: "BOCAS DEL TORO", children: [{ name: "BOCAS DEL TORO" }] },
  { name: "CHIRIQUI", children: [{ name: "DAVID" }, { name: "BOQUETE" }] },
  { name: "COCLE", children: [{ name: "PENONOME" }, { name: "AGUADULCE" }] },
  { name: "COLON", children: [{ name: "COLON" }] },
  { name: "DARIEN", children: [{ name: "LA PALMA" }] },
  { name: "HERRERA", children: [{ name: "CHITRE" }] },
  { name: "LOS SANTOS", children: [{ name: "LAS TABLAS" }] },
  { name: "PANAMA", children: [{ name: "PANAMA" }, { name: "SAN MIGUELITO" }] },
  { name: "PANAMA OESTE", children: [{ name: "LA CHORRERA" }, { name: "ARRAIJAN" }] },
  { name: "VERAGUAS", children: [{ name: "SANTIAGO" }] },
];

// Ecuador divisions
const EC_DIVISIONS: AdminDivision[] = [
  { name: "AZUAY", children: [{ name: "CUENCA" }] },
  { name: "BOLIVAR", children: [{ name: "GUARANDA" }] },
  { name: "CAÑAR", children: [{ name: "AZOGUES" }] },
  { name: "CARCHI", children: [{ name: "TULCAN" }] },
  { name: "CHIMBORAZO", children: [{ name: "RIOBAMBA" }] },
  { name: "COTOPAXI", children: [{ name: "LATACUNGA" }] },
  { name: "EL ORO", children: [{ name: "MACHALA" }] },
  { name: "ESMERALDAS", children: [{ name: "ESMERALDAS" }] },
  { name: "GUAYAS", children: [{ name: "GUAYAQUIL" }, { name: "DURAN" }, { name: "SAMBORONDON" }] },
  { name: "IMBABURA", children: [{ name: "IBARRA" }, { name: "OTAVALO" }] },
  { name: "LOJA", children: [{ name: "LOJA" }] },
  { name: "LOS RIOS", children: [{ name: "BABAHOYO" }, { name: "QUEVEDO" }] },
  { name: "MANABI", children: [{ name: "PORTOVIEJO" }, { name: "MANTA" }] },
  { name: "MORONA SANTIAGO", children: [{ name: "MACAS" }] },
  { name: "NAPO", children: [{ name: "TENA" }] },
  { name: "ORELLANA", children: [{ name: "COCA" }] },
  { name: "PASTAZA", children: [{ name: "PUYO" }] },
  { name: "PICHINCHA", children: [{ name: "QUITO" }, { name: "SANGOLQUI" }] },
  { name: "SANTA ELENA", children: [{ name: "SANTA ELENA" }, { name: "SALINAS" }] },
  { name: "SANTO DOMINGO", children: [{ name: "SANTO DOMINGO" }] },
  { name: "SUCUMBIOS", children: [{ name: "NUEVA LOJA" }] },
  { name: "TUNGURAHUA", children: [{ name: "AMBATO" }] },
  { name: "ZAMORA CHINCHIPE", children: [{ name: "ZAMORA" }] },
];

// Peru divisions
const PE_DIVISIONS: AdminDivision[] = [
  { name: "AMAZONAS", children: [{ name: "CHACHAPOYAS" }] },
  { name: "ANCASH", children: [{ name: "HUARAZ" }, { name: "CHIMBOTE" }] },
  { name: "APURIMAC", children: [{ name: "ABANCAY" }] },
  { name: "AREQUIPA", children: [{ name: "AREQUIPA" }] },
  { name: "AYACUCHO", children: [{ name: "AYACUCHO" }] },
  { name: "CAJAMARCA", children: [{ name: "CAJAMARCA" }] },
  { name: "CALLAO", children: [{ name: "CALLAO" }] },
  { name: "CUSCO", children: [{ name: "CUSCO" }] },
  { name: "HUANCAVELICA", children: [{ name: "HUANCAVELICA" }] },
  { name: "HUANUCO", children: [{ name: "HUANUCO" }] },
  { name: "ICA", children: [{ name: "ICA" }] },
  { name: "JUNIN", children: [{ name: "HUANCAYO" }] },
  { name: "LA LIBERTAD", children: [{ name: "TRUJILLO" }] },
  { name: "LAMBAYEQUE", children: [{ name: "CHICLAYO" }, { name: "LAMBAYEQUE" }] },
  { name: "LIMA", children: [{ name: "LIMA" }, { name: "MIRAFLORES" }, { name: "SAN ISIDRO" }, { name: "SURCO" }] },
  { name: "LORETO", children: [{ name: "IQUITOS" }] },
  { name: "MADRE DE DIOS", children: [{ name: "PUERTO MALDONADO" }] },
  { name: "MOQUEGUA", children: [{ name: "MOQUEGUA" }] },
  { name: "PASCO", children: [{ name: "CERRO DE PASCO" }] },
  { name: "PIURA", children: [{ name: "PIURA" }] },
  { name: "PUNO", children: [{ name: "PUNO" }, { name: "JULIACA" }] },
  { name: "SAN MARTIN", children: [{ name: "TARAPOTO" }, { name: "MOYOBAMBA" }] },
  { name: "TACNA", children: [{ name: "TACNA" }] },
  { name: "TUMBES", children: [{ name: "TUMBES" }] },
  { name: "UCAYALI", children: [{ name: "PUCALLPA" }] },
];

// Chile divisions
const CL_DIVISIONS: AdminDivision[] = [
  { name: "ARICA Y PARINACOTA", children: [{ name: "ARICA" }] },
  { name: "TARAPACA", children: [{ name: "IQUIQUE" }] },
  { name: "ANTOFAGASTA", children: [{ name: "ANTOFAGASTA" }, { name: "CALAMA" }] },
  { name: "ATACAMA", children: [{ name: "COPIAPO" }] },
  { name: "COQUIMBO", children: [{ name: "LA SERENA" }, { name: "COQUIMBO" }] },
  { name: "VALPARAISO", children: [{ name: "VALPARAISO" }, { name: "VIÑA DEL MAR" }] },
  { name: "METROPOLITANA", children: [{ name: "SANTIAGO" }, { name: "PUENTE ALTO" }, { name: "MAIPU" }, { name: "LAS CONDES" }, { name: "PROVIDENCIA" }] },
  { name: "O'HIGGINS", children: [{ name: "RANCAGUA" }] },
  { name: "MAULE", children: [{ name: "TALCA" }] },
  { name: "ÑUBLE", children: [{ name: "CHILLAN" }] },
  { name: "BIOBIO", children: [{ name: "CONCEPCION" }, { name: "LOS ANGELES" }] },
  { name: "ARAUCANIA", children: [{ name: "TEMUCO" }] },
  { name: "LOS RIOS", children: [{ name: "VALDIVIA" }] },
  { name: "LOS LAGOS", children: [{ name: "PUERTO MONTT" }, { name: "OSORNO" }] },
  { name: "AYSEN", children: [{ name: "COYHAIQUE" }] },
  { name: "MAGALLANES", children: [{ name: "PUNTA ARENAS" }] },
];

// Simplified divisions for other countries
const PY_DIVISIONS: AdminDivision[] = [
  { name: "CENTRAL", children: [{ name: "ASUNCION" }, { name: "LAMBARE" }, { name: "SAN LORENZO" }] },
  { name: "ALTO PARANA", children: [{ name: "CIUDAD DEL ESTE" }] },
  { name: "ITAPUA", children: [{ name: "ENCARNACION" }] },
  { name: "CAAGUAZU", children: [{ name: "CORONEL OVIEDO" }] },
];

const VE_DIVISIONS: AdminDivision[] = [
  { name: "DISTRITO CAPITAL", children: [{ name: "CARACAS" }] },
  { name: "MIRANDA", children: [{ name: "LOS TEQUES" }, { name: "GUARENAS" }] },
  { name: "ZULIA", children: [{ name: "MARACAIBO" }] },
  { name: "CARABOBO", children: [{ name: "VALENCIA" }] },
  { name: "LARA", children: [{ name: "BARQUISIMETO" }] },
  { name: "ARAGUA", children: [{ name: "MARACAY" }] },
  { name: "BOLIVAR", children: [{ name: "CIUDAD BOLIVAR" }, { name: "CIUDAD GUAYANA" }] },
];

const AR_DIVISIONS: AdminDivision[] = [
  { name: "BUENOS AIRES", children: [{ name: "BUENOS AIRES" }, { name: "LA PLATA" }, { name: "MAR DEL PLATA" }] },
  { name: "CABA", children: [{ name: "CIUDAD AUTONOMA DE BUENOS AIRES" }] },
  { name: "CORDOBA", children: [{ name: "CORDOBA" }] },
  { name: "SANTA FE", children: [{ name: "ROSARIO" }, { name: "SANTA FE" }] },
  { name: "MENDOZA", children: [{ name: "MENDOZA" }] },
  { name: "TUCUMAN", children: [{ name: "SAN MIGUEL DE TUCUMAN" }] },
];

const GT_DIVISIONS: AdminDivision[] = [
  { name: "GUATEMALA", children: [{ name: "CIUDAD DE GUATEMALA" }, { name: "MIXCO" }, { name: "VILLA NUEVA" }] },
  { name: "QUETZALTENANGO", children: [{ name: "QUETZALTENANGO" }] },
  { name: "ESCUINTLA", children: [{ name: "ESCUINTLA" }] },
  { name: "SACATEPEQUEZ", children: [{ name: "ANTIGUA GUATEMALA" }] },
];

const ES_DIVISIONS: AdminDivision[] = [
  { name: "MADRID", children: [{ name: "MADRID" }, { name: "ALCALA DE HENARES" }, { name: "GETAFE" }] },
  { name: "CATALUÑA", children: [{ name: "BARCELONA" }, { name: "TARRAGONA" }, { name: "GIRONA" }] },
  { name: "ANDALUCIA", children: [{ name: "SEVILLA" }, { name: "MALAGA" }, { name: "GRANADA" }, { name: "CORDOBA" }] },
  { name: "COMUNIDAD VALENCIANA", children: [{ name: "VALENCIA" }, { name: "ALICANTE" }] },
  { name: "PAIS VASCO", children: [{ name: "BILBAO" }, { name: "SAN SEBASTIAN" }, { name: "VITORIA" }] },
  { name: "GALICIA", children: [{ name: "SANTIAGO DE COMPOSTELA" }, { name: "VIGO" }, { name: "A CORUÑA" }] },
];

const PT_DIVISIONS: AdminDivision[] = [
  { name: "LISBOA", children: [{ name: "LISBOA" }, { name: "AMADORA" }, { name: "SINTRA" }] },
  { name: "PORTO", children: [{ name: "PORTO" }, { name: "VILA NOVA DE GAIA" }, { name: "MATOSINHOS" }] },
  { name: "BRAGA", children: [{ name: "BRAGA" }, { name: "GUIMARAES" }] },
  { name: "FARO", children: [{ name: "FARO" }, { name: "PORTIMAO" }] },
  { name: "COIMBRA", children: [{ name: "COIMBRA" }] },
];

const CR_DIVISIONS: AdminDivision[] = [
  { name: "SAN JOSE", children: [{ name: "SAN JOSE" }] },
  { name: "ALAJUELA", children: [{ name: "ALAJUELA" }] },
  { name: "CARTAGO", children: [{ name: "CARTAGO" }] },
  { name: "HEREDIA", children: [{ name: "HEREDIA" }] },
  { name: "GUANACASTE", children: [{ name: "LIBERIA" }] },
  { name: "PUNTARENAS", children: [{ name: "PUNTARENAS" }] },
  { name: "LIMON", children: [{ name: "LIMON" }] },
];

const DO_DIVISIONS: AdminDivision[] = [
  { name: "DISTRITO NACIONAL", children: [{ name: "SANTO DOMINGO" }] },
  { name: "SANTO DOMINGO", children: [{ name: "SANTO DOMINGO ESTE" }, { name: "SANTO DOMINGO NORTE" }] },
  { name: "SANTIAGO", children: [{ name: "SANTIAGO DE LOS CABALLEROS" }] },
  { name: "LA ALTAGRACIA", children: [{ name: "HIGUEY" }, { name: "PUNTA CANA" }] },
  { name: "PUERTO PLATA", children: [{ name: "PUERTO PLATA" }] },
];

// All supported countries
export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  {
    code: "CO", name: "Colombia", currency: "COP", currencySymbol: "$",
    phonePrefix: "+57", phoneValidation: PHONE_VALIDATIONS.CO,
    divisionLabels: ["Departamento", "Ciudad"], divisions: CO_DIVISIONS,
    dropiApiBase: "https://api.dropi.co",
  },
  {
    code: "MX", name: "México", currency: "MXN", currencySymbol: "$",
    phonePrefix: "+52", phoneValidation: PHONE_VALIDATIONS.MX,
    divisionLabels: ["Estado", "Ciudad"], divisions: MX_DIVISIONS,
    dropiApiBase: "https://api.dropi.mx",
  },
  {
    code: "PA", name: "Panamá", currency: "PAB", currencySymbol: "B/.",
    phonePrefix: "+507", phoneValidation: PHONE_VALIDATIONS.PA,
    divisionLabels: ["Provincia", "Ciudad"], divisions: PA_DIVISIONS,
    dropiApiBase: "https://api.dropi.pa",
  },
  {
    code: "EC", name: "Ecuador", currency: "USD", currencySymbol: "$",
    phonePrefix: "+593", phoneValidation: PHONE_VALIDATIONS.EC,
    divisionLabels: ["Provincia", "Ciudad"], divisions: EC_DIVISIONS,
    dropiApiBase: "https://api.dropi.ec",
  },
  {
    code: "PE", name: "Perú", currency: "PEN", currencySymbol: "S/",
    phonePrefix: "+51", phoneValidation: PHONE_VALIDATIONS.PE,
    divisionLabels: ["Departamento", "Ciudad"], divisions: PE_DIVISIONS,
    dropiApiBase: "https://api.dropi.pe",
  },
  {
    code: "CL", name: "Chile", currency: "CLP", currencySymbol: "$",
    phonePrefix: "+56", phoneValidation: PHONE_VALIDATIONS.CL,
    divisionLabels: ["Región", "Comuna"], divisions: CL_DIVISIONS,
    dropiApiBase: "https://api.dropi.cl",
  },
  {
    code: "PY", name: "Paraguay", currency: "PYG", currencySymbol: "₲",
    phonePrefix: "+595", phoneValidation: PHONE_VALIDATIONS.PY,
    divisionLabels: ["Departamento", "Ciudad"], divisions: PY_DIVISIONS,
    dropiApiBase: "https://api.dropi.com.py",
  },
  {
    code: "VE", name: "Venezuela", currency: "VES", currencySymbol: "Bs.",
    phonePrefix: "+58", phoneValidation: PHONE_VALIDATIONS.VE,
    divisionLabels: ["Estado", "Ciudad"], divisions: VE_DIVISIONS,
  },
  {
    code: "AR", name: "Argentina", currency: "ARS", currencySymbol: "$",
    phonePrefix: "+54", phoneValidation: PHONE_VALIDATIONS.AR,
    divisionLabels: ["Provincia", "Ciudad"], divisions: AR_DIVISIONS,
    dropiApiBase: "https://api.dropi.ar",
  },
  {
    code: "GT", name: "Guatemala", currency: "GTQ", currencySymbol: "Q",
    phonePrefix: "+502", phoneValidation: PHONE_VALIDATIONS.GT,
    divisionLabels: ["Departamento", "Ciudad"], divisions: GT_DIVISIONS,
    dropiApiBase: "https://api.dropi.gt",
  },
  {
    code: "ES", name: "España", currency: "EUR", currencySymbol: "€",
    phonePrefix: "+34", phoneValidation: PHONE_VALIDATIONS.ES,
    divisionLabels: ["Comunidad", "Ciudad"], divisions: ES_DIVISIONS,
  },
  {
    code: "PT", name: "Portugal", currency: "EUR", currencySymbol: "€",
    phonePrefix: "+351", phoneValidation: PHONE_VALIDATIONS.PT,
    divisionLabels: ["Distrito", "Ciudad"], divisions: PT_DIVISIONS,
  },
  {
    code: "CR", name: "Costa Rica", currency: "CRC", currencySymbol: "₡",
    phonePrefix: "+506", phoneValidation: PHONE_VALIDATIONS.CR,
    divisionLabels: ["Provincia", "Ciudad"], divisions: CR_DIVISIONS,
    dropiApiBase: "https://api.dropi.cr",
  },
  {
    code: "DO", name: "República Dominicana", currency: "DOP", currencySymbol: "RD$",
    phonePrefix: "+1", phoneValidation: PHONE_VALIDATIONS.DO,
    divisionLabels: ["Provincia", "Ciudad"], divisions: DO_DIVISIONS,
  },
];

/**
 * Get country config by code
 */
export function getCountryByCode(code: string): CountryConfig | undefined {
  return SUPPORTED_COUNTRIES.find((c) => c.code === code);
}

/**
 * Get divisions (departments/states) for a country
 */
export function getDivisions(countryCode: string): string[] {
  const country = getCountryByCode(countryCode);
  if (!country) return [];
  return country.divisions.map((d) => d.name);
}

/**
 * Get cities/children for a division in a country
 */
export function getCities(countryCode: string, divisionName: string): string[] {
  const country = getCountryByCode(countryCode);
  if (!country) return [];
  const division = country.divisions.find((d) => d.name === divisionName);
  return division?.children?.map((c) => c.name) || [];
}

/**
 * Validate phone number for a specific country
 */
export function validatePhone(phone: string, countryCode: string): boolean {
  const country = getCountryByCode(countryCode);
  if (!country) return false;
  const cleaned = phone.replace(/[\s\-\(\)\.+]/g, "");
  // Remove country prefix if present
  const prefixDigits = country.phonePrefix.replace("+", "");
  const numberOnly = cleaned.startsWith(prefixDigits)
    ? cleaned.slice(prefixDigits.length)
    : cleaned;
  return country.phoneValidation.regex.test(numberOnly);
}
