import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarGraph = () => {
    const ref = useRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            // Replace this URL with your actual endpoint
            const response = await fetch('https://api.foster-hope.com/orgs/all_orgs');
            const json = await response.json();
            setData(json.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            drawBarGraph(data);
        }
    }, [data]);

    const drawBarGraph = (data) => {
        const typeCounts = {};
        data.forEach(item => {
            const types = JSON.parse(item.type.replace(/\\/g, ''));
            types.forEach(type => {
                typeCounts[type] = (typeCounts[type] || 0) + 1;
            });
        });

        // Sort types by frequency and pick the top 10
        const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
        
        const svg = d3.select(ref.current);
        const margin = { top: 20, right: 30, bottom: 40, left: 90 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Clear SVG in case of redraw
        svg.selectAll("*").remove();

        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, d3.max(sortedTypes, d => d[1])])
            .range([0, width]);

        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(5));

        const y = d3.scaleBand()
            .range([0, height])
            .domain(sortedTypes.map(d => d[0]))
            .padding(0.1);

        chart.append('g')
            .call(d3.axisLeft(y));

        chart.selectAll(".bar")
            .data(sortedTypes)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d[0]))
            .attr("width", d => x(d[1]))
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");
    };

    return <svg ref={ref} width={800} height={600}></svg>;
};

export default BarGraph;
