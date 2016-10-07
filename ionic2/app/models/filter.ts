export class Filter {
  sightingsRange: number;
  predictionsRange: number;
  selectedPokemon: number[];

  constructor(sightingsRange: number, predictionsRange: number, selectedPokemon: number[]) {
    this.sightingsRange = sightingsRange;
    this.predictionsRange = predictionsRange;
    this.selectedPokemon = selectedPokemon;
  }
}
