import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getBookImage } from '../functions/getBookImage'

export type CacheImageContextType = {
    getImageWithCache: any;
};

const CacheImageContext = createContext<CacheImageContextType>({} as CacheImageContextType);

export const useCacheImageContext = (): CacheImageContextType => {
    return useContext<CacheImageContextType>(CacheImageContext);
};

type Props = {
    children: ReactNode;
};

export const CacheImageProvider = (props: Props) => {
    const [imageList, setImageList] = useState<{
        ISBN: string;
        image: string;
    }[]>([]);

    const getImageWithCache = async (ISBN: string) => {
        const cache = imageList.filter(value=>value.ISBN===ISBN);
        if(cache.length>0){
            return cache[0].image;
        }else{
            const res = await getBookImage(ISBN);
            setImageList((prev) => {
                return [...prev, {
                    ISBN: ISBN,
                    image: res,
                }]
            });
            return res;
        }
    };

    const value: CacheImageContextType = { getImageWithCache };
    return (
        <CacheImageContext.Provider value={value}>
            {props.children}
        </CacheImageContext.Provider>
    );
}