import { useRef, useState } from 'react';
//
import { useMounted } from 'react-commons-ts';

//
type Obj = {
    [x: string]: any;
};

//
type OtherStateObj<T> = keyof T extends never ? {} : Obj;

export type OtherStateConstraint<OtherState> = OtherState extends Obj
    ? OtherState
    : OtherStateObj<OtherState>;

//
export type useDataShowMoreProps<InitialObj, OtherState> = {
    initial_arr?: InitialObj[];
    other_state?: OtherState;
    handle_API_L: (c_count?: number) => Promise<any>;
};

//
export function useDataShowMore<InitialObj, OtherState>({
    initial_arr = [],
    other_state = {} as OtherStateConstraint<OtherState>,
    handle_API_L
}: useDataShowMoreProps<InitialObj, OtherStateConstraint<OtherState>>) {
    //
    const [data_state, setDataState] = useState({
        data_arr: initial_arr,
        count: 0,
        has_fetched: initial_arr.length > 0,
        is_fetching: false,
        ...other_state
    });

    //
    const is_max = useRef(false);
    const ref_fetching = useRef(false);
    const data_count = useRef(initial_arr.length);

    //
    const mounted = useMounted();

    //
    async function getData_API(
        data_get_api: {
            start_obj_state: Partial<typeof data_state>;
            handleWhenFinally?: () => void;
            getOtherDataStateWhenSetState?: (data: typeof data_state) => object;
        } = {
            start_obj_state: {},
            handleWhenFinally: () => {},
            getOtherDataStateWhenSetState: () => {
                return {};
            }
        }
    ) {
        if (ref_fetching.current) {
            return;
        }

        ref_fetching.current = true;

        const {
            start_obj_state = {},
            handleWhenFinally = () => {},
            getOtherDataStateWhenSetState = () => {
                return {};
            }
        } = data_get_api;

        try {
            setDataState((data_state) => ({
                ...data_state,
                is_fetching: true,
                ...start_obj_state
            }));

            const { data, count: new_count } = await handle_API_L(
                data_count.current
            );

            mounted &&
                setDataState((data_state) => {
                    const { has_fetched, data_arr, count } = data_state;
                    const total_count =
                        has_fetched && count ? count : new_count;

                    data_count.current += data.length;
                    is_max.current = data_count.current >= total_count;

                    const other_data_state =
                        getOtherDataStateWhenSetState(data_state);

                    return {
                        ...data_state,
                        data_arr: has_fetched ? [...data_arr, ...data] : data,
                        // data_arr: [...data_arr, ...data],
                        count: total_count,
                        is_fetching: false,
                        has_fetched: true,
                        ...other_data_state
                    };
                });
        } catch (e) {
            console.log(e);
        }

        handleWhenFinally();
        ref_fetching.current = false;
    }

    //
    async function refreshData_API(
        start_obj_state: Partial<typeof data_state> = {}
    ) {
        data_count.current = 0;

        await getData_API({
            start_obj_state: {
                data_arr: [],
                count: 0,
                has_fetched: false,
                ...start_obj_state
            }
        });
    }

    //
    return {
        data_state,
        setDataState,

        is_max,
        ref_fetching,
        data_count,

        getData_API,
        refreshData_API
    };
}

// //
// function _handle_API_L(c_count = 0) {
//     return new Promise((res) => {
//         return res(1);
//     });
// }

// const { data_state, refreshData_API, getData_API } = useDataShowMore({
//     other_state: { area: 'HN', name: 'A' },
//     // other_state: 1,
//     handle_API_L: _handle_API_L
// });

// data_state.area;
// data_state.count;

// refreshData_API({ area: '1', name: 'CD' });
