// export class User {
//   public name: string;
//   public age: number;
//   private inn: string;

//   public save(): boolean {
//     const dbm: string = this.toDataBaseModel();
//     console.log(this.inn);
//     return true;
//   }

//   private toDataBaseModel() {
//     return '';
//   }
// }

export interface User {
  name: string;
  age: number;
  save: () => boolean;
}

abstract class Person {
  name: string;
  age: number;

  abstract save(): boolean;

  toDo() {
    console.log('Hello');
  }
}

class Boss extends Person {
  save(): boolean {
    return true
  }
}

class SescondUser implements User {
  name: string;
  age: number;
  save(): boolean {
    return true;
  }
}







// class MainUser implements User {
//   name: '';
// }


