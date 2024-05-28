import React from "react";
import "./style.css"

const Search = () => {
    const categories = [
        { name: "Limousine" },
        { name: "Xe khách" },
        { name: "Xe trung chuyển" },
        { name: "Xe Vip" }
    ];

    const carCompanies = [
        { name: "Toyota" },
        { name: "Honda" },
        { name: "Mercedes" },
        { name: "BMW" }
    ];

    return (
        <>
            <section className='shop background'>
                <div className="sidebar">
                    <h2>Bộ lọc tìm kiếm</h2>
                    <div>
                        <h3>Loại xe</h3>
                        {categories.map((category, index) => (
                            <div key={index}>
                                <input type="checkbox" id={category.name} name={category.name} />
                                <label htmlFor={category.name}>{category.name}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Nhà xe</h3>
                        <select>
                            {carCompanies.map((company, index) => (
                                <option key={index} value={company.name}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3>Thời gian</h3>
                        <label htmlFor="departureTime">Giờ xuất phát</label>
                        <input type="time" id="departureTime" name="departureTime" />
                        <label htmlFor="arrivalTime">Giờ đến</label>
                        <input type="time" id="arrivalTime" name="arrivalTime" />
                    </div>
                    <div>
                        <h3>Loại ghế</h3>
                        <select>
                            <option value="standard">Standard</option>
                            <option value="vip">VIP</option>
                            <option value="luxury">Luxury</option>
                        </select>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;
