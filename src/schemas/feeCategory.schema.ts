import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({timestamps: true})
export class FeeCategory {

    @Prop({type: String, required: true, enum: ['credit', 'debit']})
    transactionType: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true, default: 'active'})
    status: string;

    @Prop({type: String, required: false})
    value: string;

    @Prop({type: String, required: true})
    tenant: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
    branch: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
    createdBy: mongoose.Schema.Types.ObjectId;
}

export const FeeCategorySchema = SchemaFactory.createForClass(FeeCategory);
