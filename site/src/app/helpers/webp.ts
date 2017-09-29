/**
 * Check browser for webp support
 * @return {boolean} if webp is supported returns true
 */
export function determineWebPSupport(): boolean {
  const elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } else {
    // very old browser like IE 8, canvas not supported
    return false;
  }
}

/**
 * Changes file extensions to .webp
 * @param  {string} str the file path with original extension
 * @return {string}     the file path to asset
 */
export function webPFileExtension( str: string ): string {
  return str.split(/\.(?=[^.]*$)/)[0] + '.webp';  // regex: split the string on last period
}
