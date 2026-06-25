import Image, { ImageProps } from 'next/image';
import styles from './SEOImage.module.css';
import { resolveBlogImage } from '@/utils/blogImageResolver';

interface SEOImageProps extends Omit<ImageProps, 'alt'> {
    alt: string;
    caption?: string;
    priority?: boolean;
}

export default function SEOImage({ alt, caption, src, priority = false, ...props }: SEOImageProps) {
    const resolvedSrc = resolveBlogImage(src as string);

    return (
        <figure className={styles.figure}>
            <div className={styles.imageWrapper}>
                <Image
                    src={resolvedSrc}
                    alt={alt}
                    fill
                    priority={priority}
                    loading={priority ? 'eager' : 'lazy'}
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 800px"
                    style={{ objectFit: 'cover' }}
                    {...props}
                />
            </div>
            {caption && (
                <figcaption className={styles.caption}>
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
