export const getPreviewText = (desc) => {
    if (!desc) return
    if (desc.length > 25) 
        return `${desc.substring(0,25)}...`
    return desc
}