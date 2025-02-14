import axios from "axios";

export interface ValidationError {
    error: string;
    details: Array<{
        path: string;
        message: string;
    }>;
}

export const handleApiError = (error: unknown): ValidationError => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
        return error.response.data;
    }
    return {
        error: "An unexpected error occurred",
        details: []
    };
};
