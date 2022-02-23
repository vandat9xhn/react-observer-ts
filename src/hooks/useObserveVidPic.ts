import { useEffect, useState } from 'react';
//
import { observerVidPic } from '../utils/observerVidPic';

//
interface useObserveVidPicProps {
    ref_elm: React.MutableRefObject<HTMLVideoElement | HTMLImageElement | null>;
    class_hide?: string;
    class_show?: string;
}

//
export function useObserveVidPic({
    ref_elm,
    class_hide = 'vid_pic-observe opacity-0',
    class_show = 'vid_pic-observe opacity-1'
}: useObserveVidPicProps) {
    //
    const [class_vid_pic, setClassVidPic] = useState(class_hide);

    //
    useEffect(() => {
        ref_elm.current &&
            observerVidPic({
                elements: [ref_elm.current],
                callback: () => {
                    setClassVidPic(class_show);
                }
            });
    }, [ref_elm]);

    //
    return class_vid_pic;
}
