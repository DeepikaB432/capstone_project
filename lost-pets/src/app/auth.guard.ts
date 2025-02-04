import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { PetsService } from './pets.service';

export const authGuard: CanActivateFn = (route, state) => {

  const petService:PetsService = inject(PetsService);

  if(!petService.isAuthenticated()){
    return false;
  }
  return true;
};
