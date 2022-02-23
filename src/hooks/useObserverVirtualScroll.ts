import { useEffect } from 'react';
//
import { observeVirtualScroll } from '../utils/observeVirtualScroll';

//
interface useObserverVirtualScrollProps {
    ref_observer_elm: React.MutableRefObject<HTMLElement | null>;
    ref_contain_elm: React.MutableRefObject<HTMLElement | null>;
    ref_root: React.MutableRefObject<HTMLElement | null>;
    rootMargin_y: number;

    has_callback: boolean;
    callback: (height: string, display: 'block' | 'none') => void;
}

//
export function useObserverVirtualScroll({
    ref_observer_elm = { current: null },
    ref_contain_elm = { current: null },
    ref_root = { current: null },
    rootMargin_y,

    has_callback = false,
    callback = () => {}
}: useObserverVirtualScrollProps) {
    //
    useEffect(() => {
        if (ref_observer_elm.current) {
            observeVirtualScroll({
                elm: ref_observer_elm.current,
                handleIsIntersecting: handleIsIntersecting,
                options: {
                    root: ref_root.current,
                    rootMargin: `${rootMargin_y}px 0px`
                }
            });
        }
    }, []);

    //
    function handleIsIntersecting(is_intersecting = false) {
        if (!ref_observer_elm.current || !ref_contain_elm.current) {
            return;
        }

        const height = is_intersecting
            ? 'auto'
            : ref_observer_elm.current.offsetHeight + 'px';
        const display = is_intersecting ? 'block' : 'none';

        if (has_callback) {
            callback(height, display);
        } else {
            ref_observer_elm.current.style.height = height;
            ref_contain_elm.current.style.display = display;
        }
    }
}
