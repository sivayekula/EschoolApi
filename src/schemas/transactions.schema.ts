import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: String, required: true })
  transactionId: string;

  @Prop({ type: String, required: true })
  transactionType: string;

  @Prop({ type: String, required: false })
  transactionBank: string;  // bank name if transaction type is online

  @Prop({ type: Date, required: true })
  transactionDate: Date;

  @Prop({ type: String, required: true })
  transactionAmount: string;

  @Prop({ type: String, required: true })
  transactionStatus: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}