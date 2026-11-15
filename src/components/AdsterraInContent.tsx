"use client";

import PartnerBanner from "./PartnerBanner";
import type { AdsterraSize } from "./AdsterraBanner";

interface AdsterraInContentProps {
    preferredSize?: AdsterraSize;
    className?: string;
}

export default function AdsterraInContent({ className }: AdsterraInContentProps) {
    return <PartnerBanner slot="inContent" className={className} />;
}
