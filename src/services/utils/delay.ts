// Utility function for simulating API delays
export const delay = (ms?: number): Promise<void> => {
    const randomDelay = ms || 500 + Math.random() * 700; // 500-1200ms
    return new Promise(resolve => setTimeout(resolve, randomDelay));
};
