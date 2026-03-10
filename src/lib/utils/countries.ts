export const COLOMBIA_DEPARTMENTS = [
  "AMAZONAS", "ANTIOQUIA", "ARAUCA", "ATLANTICO", "BOLIVAR",
  "BOYACA", "CALDAS", "CAQUETA", "CASANARE", "CAUCA",
  "CESAR", "CHOCO", "CORDOBA", "CUNDINAMARCA", "GUAINIA",
  "GUAVIARE", "HUILA", "LA GUAJIRA", "MAGDALENA", "META",
  "NARIÑO", "NORTE DE SANTANDER", "PUTUMAYO", "QUINDIO",
  "RISARALDA", "SAN ANDRES", "SANTANDER", "SUCRE",
  "TOLIMA", "VALLE DEL CAUCA", "VAUPES", "VICHADA",
] as const;

export type ColombiaDepartment = (typeof COLOMBIA_DEPARTMENTS)[number];

export const COUNTRY_CONFIG = {
  CO: {
    code: "CO",
    name: "Colombia",
    currency: "COP",
    phonePrefix: "+57",
    phonePlaceholder: "300 123 4567",
    phoneLength: 10,
  },
} as const;

/**
 * Format department name for Dropi (UPPERCASE)
 */
export function formatDepartmentForDropi(department: string): string {
  return department.toUpperCase();
}

/**
 * Format city name for Dropi (UPPERCASE)
 */
export function formatCityForDropi(city: string): string {
  return city.toUpperCase();
}
