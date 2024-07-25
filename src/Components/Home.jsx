import React, { useState, useEffect } from 'react'
import Loading from './Loading';

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
            const data = await response.json();
            setItems(data.slice(0, 1));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);
    return (
        <>
            <section className='section'>
                <div className='row container'>
                    <div className='box'>
                        {
                            loading ? (<Loading/>) : (
                                <>
                                    {
                                        items && items.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <img src={item.image} alt={item.title} className='banner-image'/>
                                                    <h6 className='heading'>
                                                        {item.title}
                                                    </h6>
                                                    <p className='para'>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home