function mapOrder<T>(originalArray: T[], orderArray: string[], key: keyof T) {
    const clonedArray = [...originalArray];
    return clonedArray.sort((a, b) => orderArray.indexOf(a[key] as string) - orderArray.indexOf(b[key] as string));
}

export default mapOrder