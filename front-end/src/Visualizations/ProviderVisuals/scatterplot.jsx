import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = () => {
    const ref = useRef();

    useEffect(() => {
        // Ensure the URL is correct and secured if necessary
        fetch('https://api.foster-hope.com/counties/all_counties')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    drawScatterPlot(data.data);
                }
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const drawScatterPlot = (data) => {
        const svg = d3.select(ref.current);
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // Remove newline characters and convert to numbers
        data.forEach(d => {
            d.population = +d.population.replace(/\n/g, '');
            d.number_of_homes = +d.number_of_homes;
        });

        // Set up the scales
        const x = d3.scaleLinear()
            .rangeRound([0, width])
            .domain([0, d3.max(data, d => d.population)]);
        const y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data, d => d.number_of_homes)]);

        // Set up the axes
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("fill", "#000")
            .attr("x", width)
            .attr("y", -6)
            .attr("text-anchor", "end")
            .text("Population");

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Number of Homes");

        // Plot each data point
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.population))
            .attr("cy", d => y(d.number_of_homes))
            .attr("r", 5)
            .style("fill", "#69b3a2");
    };

    return (
        <svg ref={ref} width={960} height={600} />
    );
};

export default ScatterPlot;
