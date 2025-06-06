import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hangman-landing',
  imports: [],
  templateUrl: './hangman-landing-component.html',
  styleUrl: './hangman-landing-component.scss'
})
export class HangmanLandingComponent {
  @Output() modeSelected = new EventEmitter<string>();

  selectMode(mode: 'single' | 'multiplayer'): void {
    this.modeSelected.emit(mode);
  }
}