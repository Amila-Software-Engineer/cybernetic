// export class Course {
//   public id !: number;
//     public title !: string;
//     public description !: string;
  
//     constructor( title:string, description:string) {
   
//       this.title=title;
//       this.description= description;
//     }
  
//   }
  export class Course {
    public id?: number;
    public title: string;
    public description: string;
  
    constructor(title: string, description: string, id?: number) {
      this.title = title;
      this.description = description;
      if (id !== undefined) {
        this.id = id;
      }
    }
  }