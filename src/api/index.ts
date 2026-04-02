// src/api/index.ts

export const sendContactEmail = async (formState: any) => {
    const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error?.message || 'Something went wrong. Please try again.');
    }

    return data;
};
