import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
    const ref = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.foster-hope.com/resources/all_resources');
                const { data } = await response.json();
                if (data) {
                    drawPieChart(data);
                } else {
                    throw new Error("Data is empty or undefined");
                }
            } catch (error) {
                console.error('Error fetching or processing data:', error);
            }
        };

        fetchData();
    }, []);

    const drawPieChart = (data) => {
        const counts = countTypes(data);
        console.log("Type counts:", counts);
    
        const margin = 50;
        const width = 450;
        const height = 450;
        const radius = Math.min(width, height) / 2 - margin;
    
        // Clear previous contents (if any)
        d3.select(ref.current).selectAll("*").remove();
    
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
        const pie = d3.pie().value(d => d[1]);
        const data_ready = pie(Object.entries(counts));
    
        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
    
        // Build the pie chart
        svg
            .selectAll('path')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d, i) => d3.schemeTableau10[i % 10])
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', 0.7);
    
        // Add labels to the pie slices
        svg
            .selectAll('text')
            .data(data_ready)
            .enter()
            .append('text')
            .text(d => `${d.data[0]} (${d.data[1]})`)
            .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
            .style('text-anchor', 'middle')
            .style('font-size', 14);
    };

    const countTypes = (data) => {
        const counts = {};
        data.forEach(item => {
            const type = item.type;
            counts[type] = (counts[type] || 0) + 1;
        });
        return counts;
    };

    return <svg ref={ref}></svg>;
};

export default PieChart;
