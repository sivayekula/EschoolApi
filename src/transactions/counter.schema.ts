// counter.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ required: true, unique: true })
  id: string; // e.g., 'receipt'

  @Prop({ required: true })
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
