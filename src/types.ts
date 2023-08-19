
export interface LetterGrade {
    letter: string,
    count: number,
    value: number,
}

export interface StoredData {
    currentGPA: number,
    currentCredits: number,
    targetCredits: number,
    grades: LetterGrade[]
}
