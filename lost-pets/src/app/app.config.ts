import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { JwtModule } from "@auth0/angular-jwt";
 
export function tokenGetter() {
  return localStorage.getItem("token");
}
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
          },
      }),
  ),
  provideHttpClient(
    withInterceptorsFromDi()
  )]
};