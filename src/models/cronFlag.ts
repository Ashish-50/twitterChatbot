import mongoose, { Model, Document, Schema, model } from 'mongoose';

export interface ICronStatus extends Document {
    status:boolean
  }
  const CronFlagSchema = new mongoose.Schema({
    status: {
      type: Schema.Types.Boolean,
      required: true,
    },
  });
  
  export const CronFlagModel: Model<ICronStatus> = model<ICronStatus>('CronFlag', CronFlagSchema);