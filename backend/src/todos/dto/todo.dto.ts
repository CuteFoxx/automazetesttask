import { Expose } from 'class-transformer';

export class TodoDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: boolean;

  @Expose()
  priority: number;
}
