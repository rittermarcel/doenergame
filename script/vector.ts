namespace doenerImbiss {
  export class Vector {
    public x: number;
    public y: number;

    constructor(_x: number, _y: number) {
      this.x = _x;
      this.y = _y;
    }

    public scale(_factor: number): void {
      this.x *= _factor;
      this.y *= _factor;
    }

    public add(_addend: Vector): void {
      this.x += _addend.x;
      this.y += _addend.y;
    }

    public addCustomer(_addend: Vector): void {
      this.x += _addend.x;
    }

    public copy(): Vector {
      return new Vector(this.x, this.y);
    }
  }
}
