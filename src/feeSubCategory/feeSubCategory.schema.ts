import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({timestamps: true})
export class FeeSubCategory {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true, default: 'active'})
    status: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'FeeCategory', required: true})
    category: mongoose.Schema.Types.ObjectId;

    @Prop({type: String, required: true, default: 'global'})
    tenant: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: false})
    branch: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
    createdBy: mongoose.Schema.Types.ObjectId;
}

export const FeeSubCategorySchema = SchemaFactory.createForClass(FeeSubCategory);