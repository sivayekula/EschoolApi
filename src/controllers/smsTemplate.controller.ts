import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common';
import { SmsTemplateService } from '../services/smsTemplate.service';

@Controller('smsTemplate')
export class SmsTemplateController {
    constructor(private readonly smsTemplateService: SmsTemplateService) {}

    @Post()
    async create(@Body() createSmsTemplateDto, @Res() res) {
        try {
            const createdSmsTemplate = await this.smsTemplateService.create(createSmsTemplateDto);
            res.status(HttpStatus.CREATED).json({message: 'Sms template created successfully', data: createdSmsTemplate});
        } catch (error) {
            throw error;
        }
    }

    @Get()
    async findAll(@Req() req, @Res() res) {
        try {
            const smsTemplates = await this.smsTemplateService.findAll();
            return res.status(HttpStatus.OK).json({ message: 'Sms templates fetched successfully', data: smsTemplates });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res) {
        try {
            const smsTemplate = await this.smsTemplateService.findTemplate(id);
            return res.status(HttpStatus.OK).json({ message: 'Sms template fetched successfully', data: smsTemplate });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSmsTemplateDto, @Res() res) {
        try {
            const smsTemplate = await this.smsTemplateService.update(id, updateSmsTemplateDto);
            return res.status(HttpStatus.OK).json({ message: 'Sms template updated successfully', data: smsTemplate });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res) {
        try {
            await this.smsTemplateService.remove(id);
            return res.status(HttpStatus.OK).json({ message: 'Sms template deleted successfully' });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
    
}