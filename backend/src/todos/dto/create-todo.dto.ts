import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @Transform(({ value }: { value: string }) =>
    value === undefined ? undefined : parseInt(value),
  )
  @IsInt()
  @IsOptional()
  priority: number;
}
