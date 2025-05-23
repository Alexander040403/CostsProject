/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty } from 'class-validator';

export class UpdateCostDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly date: Date;
}
