import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HangmanLandingComponent } from './hangman-landing-component/hangman-landing-component';
import { HangmanComponent } from './hangman-component/hangman-component';
import { HangmanMultiplayerComponent } from './hangman-multiplayer-component/hangman-multiplayer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HangmanLandingComponent, 
    HangmanComponent,
    HangmanMultiplayerComponent
  ],
  template: `
    <div class="app-container">
      @switch (currentMode) {
        @case ('landing') {
          <app-hangman-landing (modeSelected)="onModeSelected($event)"></app-hangman-landing>
        }
        @case ('single') {
          <div class="game-wrapper">
            <button class="back-btn" (click)="goBackToLanding()">
              ← Back to Menu
            </button>
            <app-hangman-component></app-hangman-component>
          </div>
        }
        @case ('multiplayer') {
          <div class="game-wrapper">
            <button class="back-btn" (click)="goBackToLanding()">
              ← Back to Menu
            </button>
            <div class="coming-soon">
              <h2>🚧 Multiplayer Mode</h2>
              <p>This feature is coming soon!</p>
              <p>Create your <code>hangman-multiplayer-component</code> and it will appear here.</p>
              <button class="temp-back-btn" (click)="goBackToLanding()">
                Return to Landing Page
              </button>
            </div>
            <!-- Uncomment this when you create the multiplayer component -->
            <!-- <app-hangman-multiplayer></app-hangman-multiplayer> -->
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
    
    .game-wrapper {
      position: relative;
      min-height: 100vh;
    }
    
    .back-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1000;
      padding: 0.75rem 1.5rem;
      background: rgba(0,0,0,0.7);
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      
      &:hover {
        background: rgba(0,0,0,0.9);
        transform: translateX(-3px);
      }
    }
    
    .coming-soon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 2rem;
      
      h2 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      
      p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        max-width: 600px;
        
        code {
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }
      }
      
      .temp-back-btn {
        margin-top: 2rem;
        padding: 1rem 2rem;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 2px solid white;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: bold;
        transition: all 0.3s ease;
        
        &:hover {
          background: white;
          color: #667eea;
        }
      }
    }
    
    @media (max-width: 768px) {
      .back-btn {
        top: 10px;
        left: 10px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class AppComponent {
  currentMode: 'landing' | 'single' | 'multiplayer' = 'landing';
  
  onModeSelected(mode: string): void {
    if (mode === 'single' || mode === 'multiplayer') {
      this.currentMode = mode;
    }
  }
  
  goBackToLanding(): void {
    this.currentMode = 'landing';
  }
}