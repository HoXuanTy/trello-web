import { UniqueIdentifier } from "@dnd-kit/core";

function mapOrder<T>(originalArray: T[], orderArray: UniqueIdentifier[], key: keyof T) {
    const clonedArray = [...originalArray];
    return clonedArray.sort((a, b) => orderArray.indexOf(a[key] as string) - orderArray.indexOf(b[key] as string));
}

export default mapOrder