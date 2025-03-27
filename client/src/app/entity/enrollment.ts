export class Enrollment {

    public id !: number;
    public userId !: string;
    public courseId !: string;
    
  
    constructor(id:number,userId:string, courseId:string) {
      this.id=id;
      this.userId=userId;
      this.courseId= courseId;
    }
  
  }
  