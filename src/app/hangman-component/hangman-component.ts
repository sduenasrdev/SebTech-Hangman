import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman-component',
  imports: [],
  templateUrl: './hangman-component.html',
  styleUrl: './hangman-component.scss'
})
export class HangmanComponent {
  wordCategories = {
    'Programming': ['angular', 'typescript', 'javascript', 'component', 'service', 'framework', 'module', 'directive'],
    'Animals': ['elephant', 'giraffe', 'penguin', 'dolphin', 'butterfly', 'kangaroo', 'rhinoceros'],
    'Countries': ['australia', 'switzerland', 'madagascar', 'argentina', 'netherlands', 'philippines'],
    'Foods': ['pizza', 'hamburger', 'spaghetti', 'chocolate', 'strawberry', 'sandwich', 'avocado']
  };
  
  selectedCategory = 'Programming';
  word = this.pickWord();
  currentCategory = this.selectedCategory;
  guesses: string[] = [];
  incorrect = 0;
  maxIncorrect = 6;
  
  // Game statistics
  wins = 0;
  losses = 0;
  gamesPlayed = 0;
  streak = 0;
  bestStreak = 0;
  
  // Hints and difficulty
  hintsUsed = 0;
  maxHints = 2;
  difficulty = 'normal'; // easy, normal, hard
  
  pickWord(): string {
    const words = this.wordCategories[this.selectedCategory as keyof typeof this.wordCategories];
    return words[Math.floor(Math.random() * words.length)];
  }
  
  get categories(): string[] {
    return Object.keys(this.wordCategories);
  }
  
  get maskedWord(): string {
    return this.word.split('').map(c => this.guesses.includes(c) ? c : '_').join(' ');
  }
  
  get isWin(): boolean {
    return this.word.split('').every(c => this.guesses.includes(c));
  }
  
  get isLose(): boolean {
    return this.incorrect >= this.maxIncorrect;
  }
  
  get correctGuesses(): string[] {
    return this.guesses.filter(g => this.word.includes(g));
  }
  
  get incorrectGuesses(): string[] {
    return this.guesses.filter(g => !this.word.includes(g));
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
    const totalLetters = new Set(this.word.split('')).size;
    const guessedLetters = this.correctGuesses.length;
    return Math.round((guessedLetters / totalLetters) * 100);
  }
  
  get winRate(): number {
    return this.gamesPlayed > 0 ? Math.round((this.wins / this.gamesPlayed) * 100) : 0;
  }
  
  handleGuess(letter: string): void {
    if (this.guesses.includes(letter) || this.isWin || this.isLose) return;
    
    this.guesses.push(letter);
    if (!this.word.includes(letter)) {
      this.incorrect++;
    }
    
    // Check for win/loss after each guess
    if (this.isWin) {
      this.handleWin();
    } else if (this.isLose) {
      this.handleLoss();
    }
  }
  
  useHint(): void {
    if (this.hintsUsed >= this.maxHints || this.isWin || this.isLose) return;
    
    // Find a letter that hasn't been guessed yet and is in the word
    const unguessedLetters = this.word.split('')
      .filter(letter => !this.guesses.includes(letter));
    
    if (unguessedLetters.length > 0) {
      const hintLetter = unguessedLetters[0];
      this.handleGuess(hintLetter);
      this.hintsUsed++;
    }
  }
  
  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.reset();
  }
  
  changeDifficulty(level: string): void {
    this.difficulty = level;
    switch (level) {
      case 'easy':
        this.maxIncorrect = 8;
        this.maxHints = 3;
        break;
      case 'normal':
        this.maxIncorrect = 6;
        this.maxHints = 2;
        break;
      case 'hard':
        this.maxIncorrect = 4;
        this.maxHints = 1;
        break;
    }
    this.reset();
  }
  
  private handleWin(): void {
    this.wins++;
    this.gamesPlayed++;
    this.streak++;
    if (this.streak > this.bestStreak) {
      this.bestStreak = this.streak;
    }
  }
  
  private handleLoss(): void {
    this.losses++;
    this.gamesPlayed++;
    this.streak = 0;
  }
  
  reset(): void {
    this.word = this.pickWord();
    this.currentCategory = this.selectedCategory;
    this.guesses = [];
    this.incorrect = 0;
    this.hintsUsed = 0;
  }
  
  resetStats(): void {
    this.wins = 0;
    this.losses = 0;
    this.gamesPlayed = 0;
    this.streak = 0;
    this.bestStreak = 0;
  }
}