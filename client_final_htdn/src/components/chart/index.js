import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { BookingAPI } from '../../api';
import cookies from 'js-cookie';
import jsPDF from 'jspdf';

const ChartComponent = () => {
    const [chart, setChart] = useState(null);
    const [data, setData] = useState({});
    const chartContainer = useRef(null);


    const generateReport = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const doc = new jsPDF();
        // Add content to the PDF document
        doc.text('Revenue Report', 10, 10);
        data.payments.forEach((entry, index) => {

            const monthIndex = new Date(entry.booking.bookingDate).getMonth();
            const monthName = months[monthIndex];
            const text = `${index + 1}. Date: ${monthName}, Amount: ${entry.amount}`;
            doc.text(text, 10, 20 + index * 10);
        });
        // Save or download the PDF document
        doc.save('revenue_report.pdf');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let dataCompany = JSON.parse(cookies.get('company'));
                let phone = dataCompany.phone;
                if (phone) {
                    let response = await BookingAPI.laythongtindoanhthu(phone);
                    setData(response.data);

                    const ctx = chartContainer.current.getContext('2d');
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                    // Initialize chartData object with all months
                    const chartData = months.reduce((acc, monthName) => {
                        acc[monthName] = 0;
                        return acc;
                    }, {});

                    // Fill in data for existing months
                    response.data.payments.forEach(item => {
                        const monthIndex = new Date(item.booking.bookingDate).getMonth();
                        const monthName = months[monthIndex];
                        chartData[monthName] += item.amount;
                    });

                    const labels = Object.keys(chartData);
                    const amounts = Object.values(chartData);

                    const myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Total Amount',
                                data: amounts,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    setChart(myChart);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={'flex'} style={{ height: '400px', width: '100%' }}>
            <canvas ref={chartContainer} />
            <button onClick={generateReport}>Export Report</button>
        </div>
    );
};

export default ChartComponent;
