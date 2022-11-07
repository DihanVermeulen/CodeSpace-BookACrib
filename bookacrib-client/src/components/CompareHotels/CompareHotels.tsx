import { useSearchParams } from "react-router-dom";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { api } from "../../axios";

interface IHotel {
    hotel_name: string,
    rate: number,
    rating: number,
    image: string
}

export const CompareHotels: React.FC = (): any => {
    const [searchParams] = useSearchParams();
    const [hotel, setHotel] = useState<any>([]);

    useEffect(() => {
        let hotelIndex: any = searchParams.get('hotel');
        api.get('/hotels')
            .then((response): any => {
                let selectedHotel = response.data[hotelIndex];
                setHotel(selectedHotel);
            });
    }, [])

    if (hotel) {
        return (
            <section className="home-page--main-section--card">
                <div>{hotel.hotel_name}</div>
            </section>
        )
    }
}