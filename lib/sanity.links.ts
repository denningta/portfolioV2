export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/projects/${slug}` : undefined
    case 'employment':
      return slug ? `/employment/${slug}` : undefined
    case 'externalLink':
      return slug ? slug : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
