import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hangman-multiplayer-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hangman-multiplayer-component.html',
  styleUrl: './hangman-multiplayer-component.scss'
})
export class HangmanMultiplayerComponent {
  // Game phases: 'setup' -> 'word-entry' -> 'playing' -> 'result'
  gamePhase: 'setup' | 'word-entry' | 'playing' | 'result' = 'setup';
  
  // Players
  player1Name = '';
  player2Name = '';
  currentPlayer = 1; // 1 for player1, 2 for player2
  
  // Word setup
  customWord = '';
  wordHint = '';
  word = '';
  category = '';
  
  // Game state
  guesses: string[] = [];
  incorrect = 0;
  maxIncorrect = 6;
  
  // Game statistics
  player1Wins = 0;
  player2Wins = 0;
  gamesPlayed = 0;
  
  get currentPlayerName(): string {
    return this.currentPlayer === 1 ? this.player1Name : this.player2Name;
  }
  
  get guessingPlayerName(): string {
    return this.currentPlayer === 1 ? this.player2Name : this.player1Name;
  }
  
  get maskedWord(): string {
    return this.word.split('').map(c => {
      if (c === ' ') return ' ';
      return this.guesses.includes(c.toLowerCase()) ? c : '_';
    }).join(' ');
  }
  
  get isWin(): boolean {
    return this.word.toLowerCase().split('').every(c => 
      c === ' ' || this.guesses.includes(c.toLowerCase())
    );
  }
  
  get isLose(): boolean {
    return this.incorrect >= this.maxIncorrect;
  }
  
  get correctGuesses(): string[] {
    return this.guesses.filter(g => this.word.toLowerCase().includes(g));
  }
  
  get incorrectGuesses(): string[] {
    return this.guesses.filter(g => !this.word.toLowerCase().includes(g));
  }
  
  get hangmanStage(): string {
    const stages = [
      '',
      '😵',
      '😵\n |',
      '😵\n/|',
      '😵\n/|\\',
      '😵\n/|\\\n |',
      '😵\n/|\\\n/ \\'
    ];
    return stages[this.incorrect] || stages[stages.length - 1];
  }
  
  get progress(): number {
    const uniqueLetters = new Set(this.word.toLowerCase().replace(/\s/g, '').split(''));
    const guessedLetters = this.correctGuesses.length;
    return Math.round((guessedLetters / uniqueLetters.size) * 100);
  }
  
  startGame(): void {
    if (this.player1Name.trim() && this.player2Name.trim()) {
      this.gamePhase = 'word-entry';
    }
  }
  
  submitWord(): void {
    if (this.customWord.trim().length >= 3) {
      this.word = this.customWord.trim();
      this.category = this.wordHint.trim() || 'Custom Word';
      this.gamePhase = 'playing';
      this.guesses = [];
      this.incorrect = 0;
    }
  }
  
  handleGuess(letter: string): void {
    if (this.guesses.includes(letter) || this.isWin || this.isLose) return;
    
    this.guesses.push(letter);
    if (!this.word.toLowerCase().includes(letter)) {
      this.incorrect++;
    }
    
    // Check for win/loss after each guess
    if (this.isWin) {
      this.handleWin();
    } else if (this.isLose) {
      this.handleLoss();
    }
  }
  
  private handleWin(): void {
    if (this.currentPlayer === 1) {
      this.player2Wins++; // Player 2 guessed correctly
    } else {
      this.player1Wins++; // Player 1 guessed correctly
    }
    this.gamesPlayed++;
    this.gamePhase = 'result';
  }
  
  private handleLoss(): void {
    if (this.currentPlayer === 1) {
      this.player1Wins++; // Player 1's word wasn't guessed
    } else {
      this.player2Wins++; // Player 2's word wasn't guessed
    }
    this.gamesPlayed++;
    this.gamePhase = 'result';
  }
  
  playAgain(): void {
    // Switch roles
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.customWord = '';
    this.wordHint = '';
    this.word = '';
    this.category = '';
    this.guesses = [];
    this.incorrect = 0;
    this.gamePhase = 'word-entry';
  }
  
  newGame(): void {
    this.gamePhase = 'setup';
    this.player1Name = '';
    this.player2Name = '';
    this.currentPlayer = 1;
    this.customWord = '';
    this.wordHint = '';
    this.word = '';
    this.category = '';
    this.guesses = [];
    this.incorrect = 0;
    this.player1Wins = 0;
    this.player2Wins = 0;
    this.gamesPlayed = 0;
  }
  
  // Validation methods
  isValidWord(): boolean {
    const word = this.customWord.trim();
    return word.length >= 3 && word.length <= 20 && /^[a-zA-Z\s]+$/.test(word);
  }
  
  canStartGame(): boolean {
    return this.player1Name.trim().length > 0 && this.player2Name.trim().length > 0;
  }
}