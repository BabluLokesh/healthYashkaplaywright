import fs from 'fs';
import path from 'path';

export function readJSON<T>(relativePath: string): T {
    const filePath = path.resolve(process.cwd(), relativePath);

    if (!fs.existsSync(filePath)) {
        throw new Error(`JSON file not found at path: ${filePath}`);
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent) as T;
    } catch (error) {
        throw new Error(
            `Failed to read or parse JSON file at ${filePath}: ${(error as Error).message}`
        );
    }
}
