export interface AdminVariantDto {
    variantId: string;
    variantTitle: string;
    fragrance?: string;
    weightGrams?: number;
    sizeLabel?: string;
    durationHours?: number;
    price: number;
    mrp?: number;
    isActive: boolean;
    isDefault: boolean;
}

export interface AdminProductAttributeDto {
    attributeId: string;
    valueText?: string;
    valueNumber?: number;
    valueBoolean?: boolean;
    enumValueId?: string;
}

export interface AdminProductImageDto {
    productImageId: string;
    imageUrl: string;
    altText?: string;
    position: number;
    isPrimary: boolean;
}

export interface AdminProductEditDto {
    productId: string;
    productName: string;
    slug: string;
    skuBase?: string;

    shortDescription?: string;
    productDescription?: string;
    brand?: string;
    searchKeywords?: string;

    isActive: boolean;
    isFeatured: boolean;
    isManualBestseller: boolean;

    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;

    categoryId: string;
    productTypeId: string;

    variants: AdminVariantDto[];
    attributes: AdminProductAttributeDto[];
    images: AdminProductImageDto[];
}
