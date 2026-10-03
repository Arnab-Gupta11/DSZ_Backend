import { Settings } from './settings.model.js';
import { Types } from 'mongoose';
const SETTINGS_ID = '000000000000000000000000';
export const SettingsService = {
  getSettings: async () => await Settings.findById(SETTINGS_ID),
  updateSettings: async (payload: any) => {
    return await Settings.findByIdAndUpdate(SETTINGS_ID, payload, { new: true, upsert: true, setDefaultsOnInsert: true });
  }
};