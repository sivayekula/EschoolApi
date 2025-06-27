import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './template.schema';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel('SmsTemplate') private readonly smsTemplateModel: Model<Template>
  ) {}
    
  async create(createSmsTemplateDto) {
    try {
      const createdSmsTemplate = await this.smsTemplateModel.create(createSmsTemplateDto);
      return createdSmsTemplate;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.smsTemplateModel.find();
    } catch (error) {
      throw error;
    }
  }

  async findTemplate(id?: string, name?: string, type?: string) {
    try {
      if (id) {
        return await this.smsTemplateModel.findById(id);
      }
      if (name) {
        return await this.smsTemplateModel.findOne({name: name, type: type, status: 'active'});
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSmsTemplateDto) {
    try {
      return await this.smsTemplateModel.findByIdAndUpdate(id, updateSmsTemplateDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.smsTemplateModel.findOneAndUpdate({ _id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
    
}