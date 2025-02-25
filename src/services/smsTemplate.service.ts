import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SmsTemplateService {
    constructor(
        @InjectModel('SmsTemplate') private readonly smsTemplateModel
    ) {}
    
    async create(createSmsTemplateDto) {
        const createdSmsTemplate = new this.smsTemplateModel(createSmsTemplateDto);
        return createdSmsTemplate.save();
    }

    async findAll() {
        return this.smsTemplateModel.find().exec();
    }

    async findOne(id: string) {
        return this.smsTemplateModel.findById(id).exec();
    }

    async update(id: string, updateSmsTemplateDto) {
        return this.smsTemplateModel.findByIdAndUpdate(id, updateSmsTemplateDto, { new: true }).exec();
    }

    async remove(id: string) {
        return this.smsTemplateModel.findByIdAndRemove(id).exec();
    }
    
}