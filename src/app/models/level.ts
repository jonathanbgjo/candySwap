export class Level{
  level_id: number;
  grid: string = "red green blue yellow green green green red blue red red blue violet blue red green blue green yellow green violet blue violet red green blue red yellow red blue violet red violet blue green blue";
  turns: number;
  scoreToBeat: number;
  dimensions: number;
  createdAt: Date;
  updatedAt: Date;
}
