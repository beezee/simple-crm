import { ValidationError } from "../utils/error";

interface ValidationErrorsProps {
    errors: ValidationError | null;
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
    if (!errors) return null;
    
    return (
        <div className="text-red-500">
            <p>{errors.error}</p>
            {errors.details.map((detail, index) => (
                <p key={index} className="text-sm">
                    {detail.path}: {detail.message}
                </p>
            ))}
        </div>
    );
};
