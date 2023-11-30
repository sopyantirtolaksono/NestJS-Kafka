import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
