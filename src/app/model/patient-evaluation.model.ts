export interface PatientEvaluation {
    id: number;
    weight: number;
    intake: string;
    symptoms: string;
    ecog: string;
    review: string;
    patient: number;
    evaluated: boolean;
}