export function createDigitValidator(base: number): (char: string) => boolean {
  return (char: string) => {
    if (!base || char.match(/^[0-9a-zA-Z]$/)) {
      throw new Error("base must be specifed ");
    }
    return false;
  };
}
