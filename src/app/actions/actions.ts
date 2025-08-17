'use server';

import type { Card } from '@/app/types';
import { createCSVContent } from '@/utils/fileDownloadUtils';

export async function generateCSVAction(data: Card[]) {
  try {
    const csvContent = createCSVContent(data);

    return { success: true, csvContent };
  } catch (error) {
    return { success: false, error: error };
  }
}
