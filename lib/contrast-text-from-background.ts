function getTextColor(hexColor: string): string {
  const cleanHexColor = hexColor.replace("#", "");
  const red = parseInt(cleanHexColor.substring(0, 2), 16);
  const green = parseInt(cleanHexColor.substring(2, 4), 16);
  const blue = parseInt(cleanHexColor.substring(4, 6), 16);

  // Adjusted relative luminance calculation
  const relativeLuminance = getRelativeLuminance(red, green, blue)

  const contrastRatioWhiteText = (relativeLuminance + 0.05) / (1 + 0.05)
  const contrastRatioBlackText = (0 + 0.05) / (relativeLuminance + 0.05)

  const textColor = (contrastRatioWhiteText > contrastRatioBlackText) ? '#000000' : '#ffffff'

  return textColor
}

function getRelativeLuminance(R8bit: number, G8bit: number, B8bit: number) {

  var RsRGB = R8bit / 255;
  var GsRGB = G8bit / 255;
  var BsRGB = B8bit / 255;

  var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

  // For the sRGB colorspace, the relative luminance of a color is defined as: 
  var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return L;
}

export default getTextColor
