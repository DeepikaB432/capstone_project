import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LostPetsComponent } from './lost-pets/lost-pets.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { AdoptPetComponent } from './adopt-pet/adopt-pet.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
    },
    {
        path:'home',
        component:HomeComponent,
        canActivate:[authGuard]
    },
    {
        path:'lost-pets',
        component:LostPetsComponent,
    },
    {
        path: 'lost-pets/:petType',
        component: LostPetsComponent
    },
    {
        path:'add-pet',
        component:AddPetComponent,
    },
    {
        path:'adopt-pet',
        component:AdoptPetComponent,
    },
    {
        path:'contact-us',
        component:ContactusComponent,
    },
    {
        path:'signin',
        component:SigninComponent,
    },
    {
        path:'signup',
        component:SignupComponent,
    }
];
