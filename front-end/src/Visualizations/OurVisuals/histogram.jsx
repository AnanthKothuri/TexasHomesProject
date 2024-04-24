import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Histogram = () => {
    const ref = useRef();

    useEffect(() => {
        fetch("http://api.texashomesproject.me/counties")
            .then(response => response.json())
            .then(data => {
                drawHistogram(data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const drawHistogram = (counties) => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        const x = d3.scaleLinear()
            .domain([0, d3.max(counties, d => d.population)])
            .range([0, width]);
        chart.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));


        const y = d3.scaleLinear()
            .domain([0, d3.max(counties, d => d.housing_units)])
            .range([height, 0]);
        chart.append("g")
            .call(d3.axisLeft(y));


        chart.selectAll("rect")
            .data(counties)
            .enter()
            .append("rect")
            .attr("x", d => x(d.population))
            .attr("y", d => y(d.housing_units))
            .attr("width", 6)
            .attr("height", d => height - y(d.housing_units))
            .attr("fill", "#69b3a2");
    };

    return (
        <div>
            <svg ref={ref} width={500} height={450}></svg>
        </div>
    );
};

export default Histogram;
