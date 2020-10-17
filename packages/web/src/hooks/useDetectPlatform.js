export default function useDetectPlatform() {
  const platform = window.navigator.platform.toLowerCase()

  const appleDevices = [
    'ipad',
    'iphone',
    'ipod',
    'mac68k',
    'macppc',
    'macintel'
  ]

  const regExp = new RegExp('/(' + appleDevices.join('|') + ')/i')

  return regExp.test(platform) ? 'Apple' : 'Android'
}
