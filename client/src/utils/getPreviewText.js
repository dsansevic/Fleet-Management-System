export const getPreviewText = (desc) => {
    if (!desc) return
    if (desc.length > 27) 
        return `${desc.substring(0,27)}...`
    return desc
}