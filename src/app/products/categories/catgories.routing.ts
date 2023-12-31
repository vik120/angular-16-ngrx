import { Routes } from "@angular/router";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { CategoryComponent } from "./categories.component";

export const categoriesRouting: Routes = [
    {
        path: '',
        component: CategoryComponent,
        children: [
            {
                path: '',
                component: CategoriesListComponent
            }
        ]
    }
]