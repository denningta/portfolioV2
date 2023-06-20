import { urlForImage } from "lib/sanity.image";
import Image from "next/image"

interface Props {
  image?: { asset?: any }
}

const InlineImage = ({
  image,
}: Props) => {
  const width = image?.asset.metadata.dimensions.width;
  const height = image?.asset.metadata.dimensions.height;

  return (
    <>
      <div className="relative w-full">
        {image &&
          <Image
            src={urlForImage(image)?.width(width).height(height).url() ?? ''}
            alt={'Inline photo'}
            width={width}
            height={height}
          />
        }
      </div>
    </>
  );
};

export default InlineImage;
