interface ValidationErrorsProps {
    errors: string[] | null;
}

export const ValidationErrors = ({ errors }: ValidationErrorsProps) => {
    if (!errors) return null;
    
    return (
        <div className="text-red-500">
            {errors.map((error, index) => (
                <pre key={index} className="text-sm font-sans whitespace-pre-line">{error}</pre>
            ))}
        </div>
    );
};
