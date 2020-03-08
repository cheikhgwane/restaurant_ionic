import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: "menu",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../menu/menu.module").then(m => m.MenuPageModule)
          }
        ]
      },
      {
        path: "plats",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../plats/plats.module").then(m => m.Tab2PageModule)
          },
          {
            path: "ajouter",
            loadChildren: () =>
              import("../plats/ajouter/ajouter.module").then(
                m => m.AjouterPageModule
              )
          },
          {
            path: "modifier/:id",
            loadChildren: () =>
              import("../plats/modifier/modifier.module").then(
                m => m.ModifierPageModule
              )
          }
        ]
      },
      {
        path: "restaurants",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../restaurants/restaurants.module").then(
                m => m.RestaurantsModule
              )
          },
          {
            path: "ajouter",
            loadChildren: () =>
              import(
                "../restaurants/ajout-restaurants/ajout-restaurants.module"
              ).then(m => m.AjoutRestaurantsModule)
          }
        ]
      },
      {
        path: "compte",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../compte/compte.module").then(m => m.Tab3PageModule)
          },
          {
            path: "login",
            loadChildren: () =>
              import("../compte/login/login.module").then(
                m => m.LoginPageModule
              )
          },
          {
            path: "modifier/:id",
            loadChildren: () =>
              import("../compte/modifier/modifier.module").then(
                m => m.ModifierPageModule
              )
          }
        ]
      },
      {
        path: "register",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../register/register.module").then(
                m => m.RegisterPageModule
              )
          }
        ]
      },
      {
        path: "map",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../map/map.module").then(m => m.MapPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/menu",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/menu",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
