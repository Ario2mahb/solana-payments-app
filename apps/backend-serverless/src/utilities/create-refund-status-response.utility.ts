import { MerchantAuthToken } from '../models/merchant-auth-token.model.js';
import { RefundRecordService } from '../services/database/refund-record-service.database.service.js';
import { PrismaClient } from '@prisma/client';
import { RefundDataResponse, createRefundDataResponseFromRefundRecord } from './refund-record.utility.js';

export const createRefundStatusResponse = async (shopId: string, prisma: PrismaClient): Promise<RefundDataResponse> => {
    const refundRecordService = new RefundRecordService(prisma);
    const refundRecord = await refundRecordService.getRefundRecordWithPayment({
        shopId: shopId,
    });

    if (refundRecord == null) {
        throw new Error('Could not find refund records.');
    }

    return createRefundDataResponseFromRefundRecord(refundRecord);
};