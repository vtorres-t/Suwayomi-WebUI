import type { CategoryDefaultInfo, CategoryIdInfo } from '@/features/category/Category.types.ts';

export class Categories {
    static getIds(categories: CategoryIdInfo[]): number[] {
        return categories.map((category) => category.id);
    }

    static getUserCreated<Category extends CategoryDefaultInfo>(categories: Category[]): Category[] {
        return categories.filter((category) => !category.isDefaultCategory);
    }

    static getDefaults<Category extends CategoryDefaultInfo>(categories: Category[]): Category[] {
        return categories.filter((category) => category.default);
    }
}
