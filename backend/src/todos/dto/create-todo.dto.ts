import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsInt()
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value))
  priority: number;
}
