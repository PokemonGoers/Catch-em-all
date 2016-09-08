export class PokemonIcon {

  pokemonId: number;

  icon: {
    data: string;
    contenttype: string;
  };

  static fromObject(object: Object): Object {
    let instance = Object.create(PokemonIcon.prototype);
    return Object.assign(instance, object);
  }
}
