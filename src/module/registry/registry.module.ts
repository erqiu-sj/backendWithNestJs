import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistryService } from './registry.service';
import { Registry } from '../../entity/registry';
import { RegistryController } from './registry.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Registry])],
  controllers: [RegistryController],
  providers: [RegistryService],
})
export class RegistryModule {}
