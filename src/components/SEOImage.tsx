import Image, { ImageProps } from 'next/image';
import styles from './SEOImage.module.css';

interface SEOImageProps extends Omit<ImageProps, 'alt'> {
    alt: string; // Make alt mandatory
    caption?: string;
    priority?: boolean;
}

export default function SEOImage({ alt, caption, src, priority = false, ...props }: SEOImageProps) {
    if (!alt) {
        console.warn('SEOImage: "alt" attribute is missing. This hurts SEO.');
    }

    return (
        <figure className={styles.figure}>
            <div className={styles.imageWrapper}>
                <Image
                    src={src}
                    alt={alt}
                    fill // Use fill for responsive container
                    priority={priority}
                    loading={priority ? 'eager' : 'lazy'}
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 800px" // Optimization for common blog widths
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
