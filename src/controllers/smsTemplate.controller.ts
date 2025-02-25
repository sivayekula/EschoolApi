import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SmsTemplateService } from '../services/smsTemplate.service';

@Controller('sms-template')
export class SmsTemplateController {
    constructor(private readonly smsTemplateService: SmsTemplateService) {}

    @Post()
    async create(@Body() createSmsTemplateDto) {
        return this.smsTemplateService.create(createSmsTemplateDto);
    }

    @Get()
    async findAll() {
        return this.smsTemplateService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.smsTemplateService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSmsTemplateDto) {
        return this.smsTemplateService.update(id, updateSmsTemplateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.smsTemplateService.remove(id);
    }
    
}