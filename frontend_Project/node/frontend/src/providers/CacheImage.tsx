import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CacheImageContextType = {
    getImage: (ISBN: number) => string;
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
            
        }
    };
}