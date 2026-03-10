import { NextResponse } from "next/server";

const PRODUCT_TEMPLATES = [
  {
    category: "Salud y Bienestar",
    templates: [
      {
        name: "Crema Regeneradora Premium",
        description:
          "Crema facial con ingredientes naturales que regenera la piel en profundidad. Fórmula avanzada con ácido hialurónico y vitamina C para una piel más joven y radiante en solo semanas.",
        sellingPoints: [
          "Resultados visibles en 2 semanas",
          "Ingredientes 100% naturales",
          "Apto para todo tipo de piel",
          "Sin parabenos ni sulfatos",
          "Fórmula dermatológicamente probada",
        ],
        price: 89900,
        compareAtPrice: 149900,
      },
      {
        name: "Corrector de Postura Ergonómico",
        description:
          "Corrector de postura ajustable que alivia el dolor de espalda y hombros. Diseño invisible bajo la ropa, material transpirable y cómodo para uso durante todo el día.",
        sellingPoints: [
          "Alivia el dolor desde el primer uso",
          "Material transpirable y ligero",
          "Invisible bajo la ropa",
          "Talla única ajustable",
          "Recomendado por fisioterapeutas",
        ],
        price: 59900,
        compareAtPrice: 99900,
      },
    ],
  },
  {
    category: "Tecnología",
    templates: [
      {
        name: "Audífonos Inalámbricos Pro",
        description:
          "Audífonos bluetooth 5.3 con cancelación de ruido activa y 40 horas de batería. Sonido Hi-Fi envolvente con graves profundos. Resistentes al agua IPX5.",
        sellingPoints: [
          "40 horas de batería total",
          "Cancelación de ruido activa",
          "Resistentes al agua IPX5",
          "Conexión Bluetooth 5.3",
          "Estuche de carga magnético",
        ],
        price: 79900,
        compareAtPrice: 159900,
      },
      {
        name: "Smartwatch Deportivo Ultra",
        description:
          "Reloj inteligente con monitor de ritmo cardíaco, GPS integrado y más de 100 modos deportivos. Pantalla AMOLED de 1.9\" con batería de 7 días.",
        sellingPoints: [
          "Pantalla AMOLED 1.9 pulgadas",
          "GPS integrado de alta precisión",
          "7 días de batería",
          "Monitor de salud 24/7",
          "Resistente al agua 5ATM",
        ],
        price: 129900,
        compareAtPrice: 249900,
      },
    ],
  },
  {
    category: "Hogar",
    templates: [
      {
        name: "Organizador Multiusos 360°",
        description:
          "Organizador giratorio de 360° para baño, cocina o escritorio. Diseño modular con 3 niveles ajustables. Material resistente y fácil de limpiar.",
        sellingPoints: [
          "Gira 360° para fácil acceso",
          "3 niveles ajustables",
          "Material resistente al agua",
          "Fácil de armar sin herramientas",
          "Base antideslizante",
        ],
        price: 49900,
        compareAtPrice: 89900,
      },
    ],
  },
  {
    category: "Belleza",
    templates: [
      {
        name: "Kit de Skincare Coreano 7 Pasos",
        description:
          "Kit completo de rutina de skincare coreano con 7 productos esenciales. Incluye limpiador, tónico, sérum, esencia, mascarillas, crema hidratante y protector solar.",
        sellingPoints: [
          "7 productos premium incluidos",
          "Rutina completa paso a paso",
          "Ingredientes coreanos originales",
          "Para todo tipo de piel",
          "Guía de uso incluida",
        ],
        price: 149900,
        compareAtPrice: 299900,
      },
    ],
  },
  {
    category: "Fitness",
    templates: [
      {
        name: "Banda de Resistencia Set Pro",
        description:
          "Set de 5 bandas de resistencia con diferentes niveles de tensión. Incluye anclaje para puerta, agarres acolchados y tobilleras. Ideal para entrenamiento en casa.",
        sellingPoints: [
          "5 niveles de resistencia",
          "Incluye todos los accesorios",
          "Material de látex premium",
          "Bolsa de transporte incluida",
          "Guía de ejercicios digital",
        ],
        price: 69900,
        compareAtPrice: 129900,
      },
    ],
  },
];

export async function POST(req: Request) {
  const body = await req.json();
  const { category, customPrompt } = body;

  // Find templates matching category or pick random
  let templates = PRODUCT_TEMPLATES.flatMap((t) => t.templates.map((p) => ({ ...p, category: t.category })));

  if (category && category !== "all") {
    const filtered = PRODUCT_TEMPLATES.find(
      (t) => t.category.toLowerCase() === category.toLowerCase()
    );
    if (filtered) {
      templates = filtered.templates.map((p) => ({ ...p, category: filtered.category }));
    }
  }

  // Pick a random template
  const template = templates[Math.floor(Math.random() * templates.length)];

  // If custom prompt provided, modify the template
  let product = { ...template };
  if (customPrompt) {
    // Simple AI simulation — in production this would call an LLM
    product = {
      ...template,
      name: customPrompt.length > 5 ? customPrompt.split(" ").slice(0, 5).join(" ") : template.name,
      description: customPrompt.length > 20 ? customPrompt : template.description,
    };
  }

  // Simulate slight delay for "AI generation" feel
  await new Promise((r) => setTimeout(r, 800));

  return NextResponse.json({
    name: product.name,
    description: product.description,
    sellingPoints: product.sellingPoints,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    category: product.category,
    stock: 100,
  });
}
