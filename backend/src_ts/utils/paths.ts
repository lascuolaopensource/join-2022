export const paths = {
    enroll: {
        payment: (paymentHash: string) => `/shared/payment/${paymentHash}`,
    },
    pay: {
        success: (confirmCode: string) =>
            `/shared/payment/confirm-${confirmCode}`,
        cancel: (paymentHash: string) => `/shared/payment/${paymentHash}`,
    },
};
