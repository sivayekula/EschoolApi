import { IsArray, IsNotEmpty, IsString } from "class-validator";

class TimeTable {
  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  readonly examDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly startTime: string;

  @IsString()
  @IsNotEmpty()
  readonly endTime: string;

  @IsString()
  @IsNotEmpty()
  readonly passMark: number;

  @IsString()
  @IsNotEmpty()
  readonly totalMark: number;

  @IsString()
  @IsNotEmpty()
  readonly syllabus: string;
}
export class ExamDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly board: string;

  @IsString()
  @IsNotEmpty()
  readonly classCategory: string;

  @IsString()
  @IsNotEmpty()
  readonly class: string;

  @IsString()
  @IsNotEmpty()
  readonly section: string;

  @IsString()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly endDate: Date;

  @IsArray()
  @IsNotEmpty()
  readonly timeTable: TimeTable[];

}