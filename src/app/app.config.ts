import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBNyiIRHjGWdOWW3ukJ3_fj50kVifW2IPQ',
        authDomain: 'foodflow-2431b.firebaseapp.com',
        projectId: 'foodflow-2431b',
        storageBucket: 'foodflow-2431b.firebasestorage.app',
        messagingSenderId: '589949512553',
        appId: '1:589949512553:web:a61bebe4c1acdd89ee6bf8',
        measurementId: 'G-HYN0S9CQEB',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
