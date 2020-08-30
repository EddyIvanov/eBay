export function updateItemInArray(array: any[], itemId: string, field: any) {
    const updatedItems = array.map(item => {
        if (item.id !== itemId) {
            // Since we only want to update one item, preserve all others
            return item
        }

        return {
            ...item,
            ...field
        }
    })

    return updatedItems
}