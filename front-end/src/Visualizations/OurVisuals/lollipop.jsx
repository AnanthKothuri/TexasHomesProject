import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LollipopChart = () => {
    const ref = useRef();

    useEffect(() => {
        fetch("http://api.texashomesproject.me/shelters/")
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    drawLollipopChart(processData(data));
                }
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const processData = (data) => {
        const counts = data.reduce((acc, curr) => {
            const zip = curr.zip_code;
            if (zip) {
                acc[zip] = (acc[zip] || 0) + 1;
            }
            return acc;
        }, {});

        return Object.keys(counts).map(zip => ({
            zip,
            count: counts[zip]
        })).sort((a, b) => b.count - a.count);
    };

    const drawLollipopChart = (data) => {
        const margin = { top: 20, right: 20, bottom: 40, left: 100 },
              width = 960 - margin.left - margin.right;
        let height = data.length * 30; 
        height = Math.max(height, 400);  

        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        svg.selectAll("*").remove(); 

        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(d => d.zip))
            .padding(0.1);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([0, width]);

        chart.selectAll("myline")
          .data(data)
          .enter()
          .append("line")
            .attr("x1", x(0))
            .attr("x2", d => x(d.count))
            .attr("y1", d => y(d.zip))
            .attr("y2", d => y(d.zip))
            .attr("stroke", "grey");

        chart.selectAll("mycircle")
          .data(data)
          .enter()
          .append("circle")
            .attr("cx", d => x(d.count))
            .attr("cy", d => y(d.zip))
            .attr("r", "7")
            .style("fill", "#69b3a2")
            .attr("stroke", "black");

        chart.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        chart.append("g")
            .call(d3.axisLeft(y));
    };

    return (
        <svg ref={ref}></svg>
    );
};

export default LollipopChart;
