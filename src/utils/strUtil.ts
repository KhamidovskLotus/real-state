
export function toTitleCase(input: string): string {
    return input
        .toLowerCase()
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' '); 
}

export function extractNumbers(inputString: string): string {
    let result = "";
    for (let char of inputString) {
        if (char >= '0' && char <= '9') {
            result += char;
        }
    }
    return result;
}