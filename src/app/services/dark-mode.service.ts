import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  // Dark mode'un durumunu izlemek için BehaviorSubject kullanıyoruz
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  // Dark mode durumunu yayınlayan bir observable
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {}

  // Dark mode'u açıp kapatma fonksiyonu
  toggleDarkMode(isDark: boolean) {
    this.darkModeSubject.next(isDark);
  }

  // Şu anki dark mode durumunu alma fonksiyonu
  isDarkModeActive(): boolean {
    return this.darkModeSubject.value;
  }
}
