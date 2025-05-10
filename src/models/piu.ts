// src/models/piu.ts
/**
 * Model que representa um piu (tweet) no sistema PiuPiuwer
 */
class Piu {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;

  constructor(id: string, userId: string, text: string) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.likes = 0;
  }
}

export default Piu;