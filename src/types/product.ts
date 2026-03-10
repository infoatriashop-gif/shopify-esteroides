export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  stock: number;
  isActive: boolean;
  imageUrl: string | null;
  images: string[];
  sellingPoints: string[];
  category: string;
  country?: string; // CountryCode — "CO" | "PE" | "MX" | etc. Default: "CO"
  quantityOffers: QuantityOffer[];
  upsells: UpsellConfig[];
  downsells: UpsellConfig[];
  formConfig: FormConfig;
  createdAt: string;
  updatedAt: string;
};

export type QuantityOffer = {
  id: number;
  productId: number;
  quantity: number;
  discountType: "percent" | "fixed";
  discountValue: number;
  label: string;
  badgeText: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type UpsellConfig = {
  id: number;
  name: string;
  price: number;
  discountPercent: number;
  type: "pre" | "post";
  isActive: boolean;
};

export type FormConfig = {
  showNotes: boolean;
  showEmail: boolean;
  urgencyMinutes: number;
  showSocialProof: boolean;
  showTrustBadges: boolean;
  showSavingsBadge: boolean;
  ctaText: string;
  ctaColor: string;
  headerColor: string;
};

export const DEFAULT_FORM_CONFIG: FormConfig = {
  showNotes: true,
  showEmail: false,
  urgencyMinutes: 15,
  showSocialProof: true,
  showTrustBadges: true,
  showSavingsBadge: true,
  ctaText: "Confirmar Pedido COD",
  ctaColor: "green",
  headerColor: "gradient",
};

export const DEFAULT_QUANTITY_OFFERS: QuantityOffer[] = [
  { id: 1, productId: 0, quantity: 1, discountType: "percent", discountValue: 0, label: "1 unidad", badgeText: null, sortOrder: 0, isActive: true },
  { id: 2, productId: 0, quantity: 2, discountType: "percent", discountValue: 10, label: "2 unidades", badgeText: "Mas Popular", sortOrder: 1, isActive: true },
  { id: 3, productId: 0, quantity: 3, discountType: "percent", discountValue: 20, label: "3 unidades", badgeText: "Mejor Precio", sortOrder: 2, isActive: true },
];

export type Order = {
  id: number;
  orderNumber: string;
  productId: number;
  productName: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  department: string;
  city: string;
  address: string;
  notes: string;
  subtotal: number;
  shipping: number;
  codFee: number;
  total: number;
  paymentStatus: string;
  shipmentStatus: string;
  dropiStatus: string | null;
  dropiGuideNumber: string | null;
  createdAt: string;
};
