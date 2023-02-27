import { ReactNode } from 'react';
import { ImageLayout } from '@Layouts';
import { Box } from '@mui/material';
const ipfsHttpGatewayLink = `.ipfs.w3s.link/`; //.ipfs.ipfs.joaoleitao.org

//should take an array prop
interface ImagePreviewContainerProps {
  images: Object[];
  mode?: 'bacalhau' | 'nft';
  children?: ReactNode;
}

export const ImagePreviewContainer = ({
  images,
  mode, //= bacalhau or nfts
  children,
  ...rest
}: ImagePreviewContainerProps) => {
  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      {images.map((item: any, x: number) => {
        let link, linkArr;
        if (mode === 'bacalhau') {
          console.log('parsing bac image', item);
          linkArr = item.properties.origins.ipfs.split('/');
          link = `https://${linkArr[2]}${ipfsHttpGatewayLink}`;
          console.log('baclink', link);
        } else {
          console.log('parsing image', item);
          linkArr = item.image.split('/');
          link = `https://${linkArr[2]}${ipfsHttpGatewayLink}${linkArr[3]}`;
          console.log('link', link);
        }
        return (
          <Box
            key={x}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ImageLayout src={link} alt={item.name} data={item} />
            {children}
          </Box>
        );
      })}
    </Box>
  );
};
